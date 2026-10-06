"use client";

import type { Level } from "@/content/types";
import { useProgress } from "./progress";

export function LevelMeter({ level }: { level: Level }) {
  const { isDone } = useProgress();
  const n = level.lessons.filter((l) => isDone(`${level.id}/${l.slug}`)).length;
  const total = level.lessons.length;
  return (
    <div className="meter" aria-label={`${n} of ${total} lessons finished`}>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${(n / total) * 100}%` }} />
      </div>
      <span className="meter-label">
        {n}/{total} done
      </span>
    </div>
  );
}
