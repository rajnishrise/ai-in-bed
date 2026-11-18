"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "./progress";

const W = 520;
const H = 120;

/** A small seeded random generator so each level always draws the same sky. */
function rng(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function layout(seed: string, n: number) {
  const r = rng(seed);
  const pad = 14;
  const step = (W - pad * 2) / Math.max(n - 1, 1);
  return Array.from({ length: n }, (_, i) => ({
    x: pad + i * step + (r() - 0.5) * step * 0.5,
    y: H / 2 + Math.sin(i * 0.9 + r() * 2) * (H * 0.28) + (r() - 0.5) * 16,
    size: 2.4 + r() * 1.6,
  }));
}

/**
 * Each lesson in a level is a star; finishing it lights the star, and
 * neighbouring finished lessons join into the level's constellation.
 */
export function Constellation({
  levelId,
  lessonKeys,
  current,
  note = true,
}: {
  levelId: string;
  lessonKeys: string[];
  current?: string;
  note?: boolean;
}) {
  const { isDone } = useProgress();
  const stars = layout(levelId, lessonKeys.length);
  const lit = lessonKeys.map((k) => isDone(k));
  const count = lit.filter(Boolean).length;

  // Remember whether the current lesson was already lit, so it only pops when it changes.
  const wasLit = useRef<boolean | null>(null);
  const [fresh, setFresh] = useState(false);
  const curLit = current ? isDone(current) : false;
  useEffect(() => {
    if (wasLit.current === false && curLit) setFresh(true);
    wasLit.current = curLit;
  }, [curLit]);

  return (
    <div className={`level-${levelId}`}>
      <svg
        className="constellation"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${count} of ${lessonKeys.length} lessons finished`}
      >
        {stars.slice(1).map((s, i) => (
          <line
            key={`l${i}`}
            className={`c-line ${lit[i] && lit[i + 1] ? "lit" : ""}`}
            x1={stars[i].x}
            y1={stars[i].y}
            x2={s.x}
            y2={s.y}
          />
        ))}
        {stars.map((s, i) => (
          <circle
            key={lessonKeys[i]}
            className={`c-star ${lit[i] ? "lit" : ""} ${fresh && lessonKeys[i] === current ? "c-new" : ""}`}
            cx={s.x}
            cy={s.y}
            r={lessonKeys[i] === current ? s.size + 1.6 : s.size}
          />
        ))}
      </svg>
      {note && (
        <p className="constellation-note">
          {count === 0
            ? "Each lesson you finish lights a star."
            : count === lessonKeys.length
              ? "Every star is lit. The constellation is complete."
              : `${count} of ${lessonKeys.length} stars lit`}
        </p>
      )}
    </div>
  );
}
