"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const TIMERS = [0, 5, 10, 20];
const RATES = [0.85, 1, 1.15];

/** Picks the most natural-sounding English voice the device offers. */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const prefer = [/natural/i, /premium|enhanced/i, /google uk english female/i, /samantha|serena|daniel|karen|moira/i, /google/i];
  for (const re of prefer) {
    const v = voices.find((x) => re.test(x.name));
    if (v) return v;
  }
  return voices.find((v) => v.default) ?? voices[0];
}

/**
 * Bedtime listening: reads the lesson aloud card by card with the device's
 * own speech engine, and can stop itself after a few minutes.
 */
export function LessonAudio({ segments }: { segments: string[] }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [seg, setSeg] = useState(0);
  const [rate, setRate] = useState(1);
  const [timer, setTimer] = useState(0);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [left, setLeft] = useState("");
  const playingRef = useRef(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
  }, []);

  const showSlide = (i: number) => {
    const slides = document.querySelectorAll<HTMLElement>(".lesson .slide");
    slides.forEach((s, k) => s.toggleAttribute("data-speaking", k === i));
    slides[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const speak = (i: number) => {
    if (i >= segments.length) {
      stop();
      return;
    }
    setSeg(i);
    showSlide(i);
    const u = new SpeechSynthesisUtterance(segments[i]);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = rate * 0.95;
    u.pitch = 0.95;
    u.onend = () => {
      if (playingRef.current) setTimeout(() => playingRef.current && speak(i + 1), 450);
    };
    speechSynthesis.speak(u);
  };

  const play = () => {
    speechSynthesis.cancel();
    playingRef.current = true;
    setPlaying(true);
    if (timer) setEndsAt(Date.now() + timer * 60_000);
    speak(seg >= segments.length - 1 ? 0 : seg);
  };

  const stop = () => {
    playingRef.current = false;
    setPlaying(false);
    setEndsAt(null);
    speechSynthesis.cancel();
    document.querySelectorAll(".lesson .slide[data-speaking]").forEach((s) => s.removeAttribute("data-speaking"));
  };

  // Sleep timer: fade out by stopping when the time is up.
  useEffect(() => {
    if (!endsAt) return setLeft("");
    const id = setInterval(() => {
      const ms = endsAt - Date.now();
      if (ms <= 0) stop();
      else setLeft(`${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  if (!supported) return null;

  return (
    <div className="audio" role="group" aria-label="Listen to this lesson">
      <button className="audio-play" onClick={playing ? stop : play} aria-label={playing ? "Pause listening" : "Listen to this lesson"}>
        <Icon name={playing ? "pause" : "play"} size={18} />
      </button>
      <span className="audio-label">
        {playing ? `Reading card ${seg + 1} of ${segments.length}` : "Listen with the lights off"}
        {left && <span className="muted"> · sleeps in {left}</span>}
      </span>
      <button className="audio-chip" onClick={() => setRate(RATES[(RATES.indexOf(rate) + 1) % RATES.length])} aria-label={`Speed ${rate}x, tap to change`} disabled={playing}>
        {rate}×
      </button>
      <button
        className="audio-chip"
        onClick={() => {
          const t = TIMERS[(TIMERS.indexOf(timer) + 1) % TIMERS.length];
          setTimer(t);
          if (playing) setEndsAt(t ? Date.now() + t * 60_000 : null);
        }}
        aria-label={timer ? `Sleep timer ${timer} minutes, tap to change` : "Sleep timer off, tap to set"}
      >
        <Icon name="moon" size={14} /> {timer ? `${timer}m` : "Off"}
      </button>
    </div>
  );
}
