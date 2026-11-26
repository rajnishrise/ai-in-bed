import type { Motif } from "./kit";

/** Motifs for the everyday jobs people do with AI: video, mail, slides, data, music, writing. */
export const motifsD: Record<string, Motif> = {
  film: () => (
    <>
      <rect className="a-sf" x="14" y="34" width="72" height="48" rx="5" />
      <rect className="a-ln" x="14" y="34" width="72" height="48" rx="5" />
      <path className="a-ln" d="M14 24 L84 14 L86 26 L16 36 Z" />
      <path className="a-gd" d="M30 21.7 L36 31 M48 19.2 L54 28.5 M66 16.6 L72 26" />
      <path className="a-fa" d="M44 48 L62 58 L44 68 Z" />
      <path className="a-ln thin" d="M22 76 H40" />
      <circle className="a-fi" cx="88" cy="44" r="1.5" />
    </>
  ),
  envelope: () => (
    <>
      <rect className="a-sf" x="14" y="28" width="72" height="50" rx="6" />
      <rect className="a-ln" x="14" y="28" width="72" height="50" rx="6" />
      <path className="a-ac" d="M17 32 L50 58 L83 32" />
      <path className="a-ln thin" d="M17 74 L40 52 M83 74 L60 52" />
      <circle className="a-sg" cx="78" cy="26" r="10" />
      <circle className="a-fg" cx="78" cy="26" r="4" />
      <circle className="a-fi" cx="16" cy="18" r="1.5" />
    </>
  ),
  slides: () => (
    <>
      <path className="a-ln" d="M50 16 V22 M38 86 L50 72 L62 86" />
      <rect className="a-sf" x="16" y="22" width="68" height="48" rx="4" />
      <rect className="a-ln" x="16" y="22" width="68" height="48" rx="4" />
      <path className="a-ac" d="M24 32 H52" />
      <rect className="a-sg" x="24" y="40" width="9" height="22" rx="1" />
      <rect className="a-sg" x="37" y="48" width="9" height="14" rx="1" />
      <rect className="a-fg" x="50" y="36" width="9" height="26" rx="1" />
      <path className="a-ln thin" d="M66 42 H76 M66 50 H76 M66 58 H72" />
    </>
  ),
  grid: () => (
    <>
      <rect className="a-sf" x="16" y="18" width="68" height="64" rx="5" />
      <rect className="a-ln" x="16" y="18" width="68" height="64" rx="5" />
      <path className="a-ln thin" d="M16 32 H84 M16 46 H84 M16 60 H84 M38 18 V82 M61 18 V82" />
      <rect className="a-sg" x="38" y="46" width="23" height="14" />
      <path className="a-ac" d="M42 76 L52 68 L62 72 L76 62" />
      <circle className="a-fg" cx="76" cy="62" r="3" />
      <circle className="a-fi" cx="88" cy="12" r="1.5" />
    </>
  ),
  note: () => (
    <>
      <circle className="a-sg" cx="36" cy="72" r="14" />
      <path className="a-ln" d="M44 72 V24 L80 16 V62" />
      <path className="a-ac" d="M44 32 L80 24" style={{ strokeWidth: 3 }} />
      <ellipse className="a-fa" cx="36" cy="72" rx="9" ry="7" />
      <ellipse className="a-fg" cx="72" cy="62" rx="9" ry="7" />
      <path className="a-ln thin" d="M14 40 q4 -6 8 0 t8 0" />
      <circle className="a-fi" cx="88" cy="40" r="1.5" />
    </>
  ),
  wand: () => (
    <>
      <circle className="a-sg" cx="66" cy="34" r="16" />
      <path className="a-ln" d="M18 84 L58 44" style={{ strokeWidth: 4 }} />
      <path className="a-ac" d="M50 52 L58 44" style={{ strokeWidth: 4 }} />
      <path className="a-fg" d="M66 18 Q68 32 82 34 Q68 36 66 50 Q64 36 50 34 Q64 32 66 18 Z" />
      <path className="a-fa" d="M84 54 Q85 60 91 61 Q85 62 84 68 Q83 62 77 61 Q83 60 84 54 Z" />
      <path className="a-gd thin" d="M40 18 v8 M36 22 h8" />
      <circle className="a-fi" cx="88" cy="16" r="1.5" />
      <circle className="a-fa" cx="30" cy="40" r="1.8" />
    </>
  ),
  pen: () => (
    <>
      <path className="a-sf" d="M66 14 L84 32 L42 74 L20 80 L26 58 Z" />
      <path className="a-ln" d="M66 14 L84 32 L42 74 L20 80 L26 58 Z" />
      <path className="a-ac" d="M58 22 L76 40" />
      <path className="a-ln thin" d="M26 58 L42 74" />
      <circle className="a-fg" cx="22" cy="78" r="2.5" />
      <path className="a-gd" d="M16 90 Q36 84 52 90 T84 88" />
    </>
  ),
};
