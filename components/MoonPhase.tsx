import type { LevelId } from "@/content/types";

/** Beginner is a crescent, intermediate a half moon, advanced a full moon. */
export function MoonPhase({ level, size = 36 }: { level: LevelId; size?: number }) {
  const lit =
    level === "beginner"
      ? "M18 4a14 14 0 1 1 0 28 9 14 0 0 0 0-28Z"
      : level === "intermediate"
        ? "M18 4a14 14 0 0 1 0 28Z"
        : "M18 4a14 14 0 1 1 0 28 14 14 0 1 1 0-28Z";
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden focusable="false" className="moon-phase">
      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d={lit} fill="currentColor" />
    </svg>
  );
}
