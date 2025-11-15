import os
import random
import string
import logging
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
#update pe lase iedhasdnasjkd asdnkjadnjksanjkdldab dkjsabnjk dajkdhkjsa dajkdnsakj
# Load environment variables from .env if present
load_dotenv()

# Basic logger for backend debug
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("goose-backend")

app = FastAPI(title="Goose Interviewer Backend", version="0.1.0")

# CORS: allow Vite dev and any other local hosts by default
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _random_room_name(length: int = 8) -> str:
    letters = string.ascii_lowercase + string.digits
    return "goose-" + "".join(random.choice(letters) for _ in range(length))


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/create-room")
async def create_room(room_name: Optional[str] = None):
    """
    Creates a Daily room via Daily REST API and returns its URL.
    Requires DAILY_API_KEY in environment (.env).
    Optionally uses DAILY_SUBDOMAIN to build URLs consistently.
    """
    daily_api_key = os.getenv("DAILY_API_KEY")
    subdomain = os.getenv("DAILY_SUBDOMAIN")  # optional

    logger.info(
        "create_room: start | room_name=%s has_daily_key=%s subdomain=%s",
        room_name,
        bool(daily_api_key),
        subdomain,
    )

    if not daily_api_key:
        logger.error("create_room: DAILY_API_KEY not configured")
        raise HTTPException(
            status_code=500, 
            detail="DAILY_API_KEY not set. Add it to backend/.env or configure TAVUS_REPLICA_ID to use Tavus."
        )

    if not room_name:
        room_name = _random_room_name()

    headers = {
        "Authorization": f"Bearer {daily_api_key}",
        "Content-Type": "application/json",
    }

    payload = {
        # public room for quick dev; tighten for production (privacy: "private", exp: ...)
        "name": room_name,
        "privacy": "public",
    }

    async with httpx.AsyncClient(timeout=15) as client:
        logger.info("create_room: POST https://api.daily.co/v1/rooms payload=%s", payload)
        resp = await client.post("https://api.daily.co/v1/rooms", headers=headers, json=payload)
        logger.info("create_room: status=%s", resp.status_code)
        if resp.status_code == 409:
            # Room exists already; fetch it
            fetch_url = f"https://api.daily.co/v1/rooms/{room_name}"
            logger.info("create_room: room exists, GET %s", fetch_url)
            get_resp = await client.get(fetch_url, headers=headers)
            logger.info("create_room: GET status=%s", get_resp.status_code)
            if get_resp.status_code != 200:
                body = get_resp.text[:1000]
                logger.error("create_room: GET failed status=%s body=%s", get_resp.status_code, body)
                raise HTTPException(status_code=500, detail=f"Daily get room failed: {get_resp.status_code} {body}")
            data = get_resp.json()
        elif resp.status_code != 200:
            body = resp.text[:1000]
            logger.error("create_room: create failed status=%s body=%s", resp.status_code, body)
            raise HTTPException(status_code=500, detail=f"Daily create room failed: {resp.status_code} {body}")
        else:
            data = resp.json()

    # Daily returns "url"; if not present, build from subdomain if provided
    url = data.get("url")
    if not url and subdomain:
        url = f"https://{subdomain}.daily.co/{room_name}"

    if not url:
        logger.error("create_room: no URL in Daily response: %s", data)
        raise HTTPException(status_code=500, detail="No room URL returned from Daily")

    return {"url": url}


# Optional: Tavus integration placeholder
@app.post("/api/create-conversation")
async def create_conversation():
    """
    Tavus conversation creation (configurable).
    - Reads TAVUS_API_KEY (required)
    - Uses TAVUS_API_BASE and TAVUS_CONVERSATION_PATH to build endpoint
    - Sends a minimal payload including TAVUS_REPLICA_ID
    - Expects a JSON response containing a room/conversation URL
    If Tavus vars are not set, falls back to creating a Daily room.
    """
    tavus_api_key = os.getenv("TAVUS_API_KEY")
    api_base = os.getenv("TAVUS_API_BASE", "https://api.tavus.ai").rstrip("/")
    path = os.getenv("TAVUS_CONVERSATION_PATH", "/v1/conversations")
    replica_id = os.getenv("TAVUS_REPLICA_ID")

    logger.info(
        "create_conversation: start | has_key=%s replica_present=%s base=%s path=%s",
        bool(tavus_api_key), bool(replica_id), api_base, path,
    )

    if not tavus_api_key or not replica_id:
        # No fallback - Tavus only jhcakjdkjasb
        logger.error(
            "create_conversation: Tavus not configured (has_key=%s, has_replica=%s)",
            bool(tavus_api_key), bool(replica_id)
        )
        raise HTTPException(
            status_code=500, 
            detail="Tavus is not configured. Please set TAVUS_API_KEY and TAVUS_REPLICA_ID in backend/.env"
        )

    url = f"{api_base}{path}"
    headers = {
        "x-api-key": tavus_api_key,
        "Content-Type": "application/json",
    }
    payload = {
        # Adjust keys to match Tavus API contract
        "persona_id": replica_id,
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            logger.info("create_conversation: POST %s payload=%s", url, payload)
            resp = await client.post(url, headers=headers, json=payload)
            logger.info("create_conversation: status=%s", resp.status_code)
            if resp.status_code >= 400:
                body = resp.text[:2000]
                logger.error("create_conversation: error status=%s body=%s", resp.status_code, body)
                raise HTTPException(status_code=resp.status_code, detail=f"Tavus error: {body}")
            data = resp.json()
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("create_conversation: unexpected exception")
        raise HTTPException(status_code=500, detail=f"Unexpected error contacting Tavus: {e}")

    # Try common keys for URL; adjust based on actual Tavus response
    convo_url = data.get("url") or data.get("room_url") or data.get("daily_room_url") or data.get("conversation_url")
    token = data.get("token") or data.get("access_token") or data.get("room_token")
    
    logger.info("create_conversation: Tavus response data: %s", data)
    
    if not convo_url:
        logger.error("create_conversation: no URL in Tavus response: %s", data)
        # If Tavus returns a room name or token, map/build here as needed
        raise HTTPException(status_code=500, detail="No URL returned from Tavus response.")

    result = {"url": convo_url}
    if token:
        result["token"] = token
    logger.info("create_conversation: success | url=%s token_present=%s", convo_url, bool(token))
    return result


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")), reload=True)
