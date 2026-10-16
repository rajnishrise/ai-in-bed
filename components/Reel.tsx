"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const KEY = "aib-reader";
export const SLIDE_EVENT = "aib-slide";

function isReel(el: HTMLElement) {
  return getComputedStyle(el).scrollSnapType.startsWith("y");
}

/**
 * On phones a lesson is a vertical stack of full-screen cards you swipe
 * through, like reels. This shows the card counter and the swipe/scroll switch.
 */
export function ReelChrome({ total }: { total: number }) {
  const [index, setIndex] = useState(0);
  const [reel, setReel] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lesson");
    if (!root) return;
    const slides = [...root.querySelectorAll<HTMLElement>(".slide")];
    const check = () => setReel(isReel(root));
    check();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = slides.indexOf(e.target as HTMLElement);
            setIndex(i);
            window.dispatchEvent(new CustomEvent(SLIDE_EVENT, { detail: i }));
          }
        }
      },
      { root: isReel(root) ? root : null, threshold: 0.55 },
    );
    slides.forEach((s) => obs.observe(s));
    window.addEventListener("resize", check);
    return () => {
      obs.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [reel]);

  return (
    <div className="reel-chrome" aria-hidden={!reel}>
      <div className="reel-bar">
        <div style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <span className="reel-count">
        {index + 1} / {total}
      </span>
    </div>
  );
}

/** Lets phone readers switch between swiping cards and one long page. */
export function ReaderToggle() {
  const [mode, setMode] = useState<"swipe" | "scroll">("swipe");
  useEffect(() => {
    setMode(document.documentElement.dataset.reader === "scroll" ? "scroll" : "swipe");
  }, []);
  const set = (m: "swipe" | "scroll") => {
    setMode(m);
    if (m === "scroll") document.documentElement.dataset.reader = "scroll";
    else delete document.documentElement.dataset.reader;
    try {
      localStorage.setItem(KEY, m);
    } catch {
      /* ignore */
    }
    document.querySelector(".lesson")?.scrollTo({ top: 0 });
    window.dispatchEvent(new Event("resize"));
  };
  return (
    <div className="reader-toggle" role="group" aria-label="Reading mode">
      <button className={mode === "swipe" ? "on" : ""} aria-pressed={mode === "swipe"} onClick={() => set("swipe")}>
        <Icon name="layers" size={15} /> Cards
      </button>
      <button className={mode === "scroll" ? "on" : ""} aria-pressed={mode === "scroll"} onClick={() => set("scroll")}>
        <Icon name="text" size={15} /> Page
      </button>
    </div>
  );
}

export function SwipeHint() {
  return (
    <p className="swipe-hint" aria-hidden>
      <span className="swipe-chevron">
        <Icon name="arrow" size={18} />
      </span>
      Swipe up to begin
    </p>
  );
}
