# Goose Interviewer Backend (Python)

A lightweight FastAPI backend that creates video rooms via Daily's REST API and returns the room URL to the front-end.

## Features
- `POST /api/create-room` — creates (or fetches) a Daily room and returns `{ url }`
- CORS configured for Vite dev (`http://localhost:5173`)
- Loads secrets from `.env` (see `.env.example`)
- Placeholder for `POST /api/create-conversation` for Tavus integration (server-side)

## Setup

1. Create the virtual environment and install dependencies:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Create `.env` from example and fill secrets:

```bash
cp .env.example .env
# Edit .env and add:
# DAILY_API_KEY=your_daily_api_key
# DAILY_SUBDOMAIN=your-subdomain  # optional
# TAVUS_API_KEY=your_tavus_api_key  # optional (for future Tavus endpoint)
```

3. Run the server:

```bash
uvicorn app.main:app --reload --port 8000
```

4. Test locally:

```bash
curl -X POST http://localhost:8000/api/create-room
```

Expected output:

```json
{"url":"https://<your-subdomain>.daily.co/<room>"}
```

## Front-end integration
- The front-end should call `POST http://localhost:8000/api/create-room` and use the returned `url` as `conversationUrl` for the Conversation component.
- For production, consider running this backend on your hosting of choice and setting `VITE_BACKEND_URL`.

## Tavus integration (optional)
- Keep `TAVUS_API_KEY` in server-side env only.
- Implement `/api/create-conversation` to call Tavus REST, then return the underlying Daily room URL/token provided by Tavus.
- Never expose Tavus keys in the browser.
