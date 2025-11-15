import { useEffect, useRef, useState } from "react";

type Props = {
  question?: string | null;
  autoPlay?: boolean;
};

export default function Goose({ question, autoPlay = true }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Guard for non-browser environments
    if (typeof window === "undefined") return;
    synthRef.current = window.speechSynthesis;
    return () => {
      // cleanup: cancel any speaking
      synthRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    if (!question) return;
    speak(question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  function speak(text: string) {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    // stop any existing
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1; // speech rate
    u.pitch = 1;

    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);

    utterRef.current = u;
    synth.speak(u);
  }

  function stop() {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    synth?.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="relative flex items-center justify-center">
        <div className={`text-9xl sm:text-[7rem] ${isSpeaking ? 'animate-bounce' : ''}`}>🪿</div>
        {/* mouth indicator: a small circle that pulses when speaking */}
        <div className={`absolute bottom-6 w-8 h-4 rounded-full ${isSpeaking ? 'bg-rose-500 animate-pulse' : 'bg-gray-300'}`} />
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Ready to Practice</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-[36ch]">The goose will read the question aloud. Click the play button to hear it again.</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => question && speak(question)}
          className="inline-flex items-center px-3 py-1.5 rounded-md bg-duck-orange text-white font-medium shadow-sm hover:opacity-95"
          aria-label="Play question"
          disabled={!question}
        >
          ▶️
        </button>

        <button
          onClick={stop}
          className="inline-flex items-center px-3 py-1.5 rounded-md bg-muted text-muted-foreground font-medium shadow-sm hover:opacity-95"
          aria-label="Stop speaking"
        >
          ⏹️
        </button>
      </div>
    </div>
  );
}
