import type { Motif } from "./kit";

const SHIELD = "M50 14 L78 24 V46 Q78 70 50 86 Q22 70 22 46 V24 Z";
const TRI = "M44 22 Q50 12 56 22 L84 74 Q88 84 77 84 H23 Q12 84 16 74 Z";
const BULB = "M39 58 Q30 50 30 39 A20 20 0 1 1 70 39 Q70 50 61 58 V66 H39 Z";
const MASK = "M24 26 Q42 18 60 26 Q64 58 42 82 Q20 58 24 26 Z";
const MOUND = "M16 82 Q50 64 84 82 Z";
const PEAK = "M10 86 L40 44 L52 58 L62 48 L90 86 Z";

export const motifsC: Record<string, Motif> = {
  shield: () => (
    <>
      <path className="a-sf" d={SHIELD} />
      <path className="a-ln" d={SHIELD} />
      <path className="a-ac thin" d="M50 22 L71 29.5 V46 Q71 65 50 78" />
      <path className="a-gd" d="M37 50 L46 59 L64 39" style={{ strokeWidth: 3 }} />
      <circle className="a-fa" cx="84" cy="16" r="2" />
      <circle className="a-fi" cx="14" cy="30" r="1.5" />
    </>
  ),
  lock: () => (
    <>
      <path className="a-ac" d="M36 46 V32 A14 14 0 0 1 64 32 V46" style={{ strokeWidth: 3 }} />
      <rect className="a-sf" x="24" y="44" width="52" height="40" rx="7" />
      <rect className="a-ln" x="24" y="44" width="52" height="40" rx="7" />
      <path className="a-gd thin" d="M30 52 H40" />
      <circle className="a-fg" cx="50" cy="61" r="4.5" />
      <path className="a-gd" d="M50 64 V74" style={{ strokeWidth: 3 }} />
      <circle className="a-fi" cx="82" cy="24" r="1.5" />
    </>
  ),
  warning: () => (
    <>
      <path className="a-sg" d={TRI} />
      <path className="a-ln" d={TRI} />
      <path className="a-ac" d="M50 38 V62" style={{ strokeWidth: 4 }} />
      <circle className="a-fa" cx="50" cy="72" r="3" />
      <path className="a-gd thin" d="M84 22 v8 M80 26 h8" />
      <circle className="a-fi" cx="16" cy="30" r="1.5" />
    </>
  ),
  compass: () => (
    <>
      <circle className="a-sf" cx="50" cy="50" r="34" />
      <circle className="a-ln" cx="50" cy="50" r="34" />
      <circle className="a-ln thin dash" cx="50" cy="50" r="26" />
      <path className="a-ln" d="M50 12 V20 M50 80 V88 M12 50 H20 M80 50 H88" />
      <path className="a-ln thin" d="M27 27 l4 4 M73 27 l-4 4 M27 73 l4 -4 M73 73 l-4 -4" />
      <path className="a-fg" d="M63 26 L54.4 52.4 L45.6 47.6 Z" />
      <path className="a-bg" d="M37 74 L54.4 52.4 L45.6 47.6 Z" />
      <path className="a-ac" d="M37 74 L54.4 52.4 L45.6 47.6 Z" />
      <circle className="a-bg" cx="50" cy="50" r="3" />
      <circle className="a-ln" cx="50" cy="50" r="3" />
    </>
  ),
  bulb: () => (
    <>
      <circle className="a-sg" cx="50" cy="40" r="24" />
      <path className="a-ln" d={BULB} />
      <path className="a-gd" d="M44 58 V50 L47 45 L50 50 L53 45 L56 50 V58" />
      <path className="a-ac" d="M40 72 H60 M43 78 H57" />
      <path className="a-ac thin" d="M47 84 H53" />
      <path className="a-gd thin" d="M50 6 V12 M22 15 l4 4 M78 15 l-4 4 M10 39 h6 M84 39 h6" />
      <path className="a-ln thin" d="M38 32 A13 13 0 0 1 46 24" />
    </>
  ),
  puzzle: () => (
    <>
      <path
        className="a-sf"
        d="M18 36 H27 A6.5 6.5 0 1 1 39 36 H48 V50 A7 7 0 1 1 48 62 V78 H18 Z"
      />
      <path
        className="a-ln"
        d="M18 36 H27 A6.5 6.5 0 1 1 39 36 H48 V50 A7 7 0 1 1 48 62 V78 H18 Z"
      />
      <path
        className="a-ac"
        d="M52 36 H61 A6.5 6.5 0 1 0 73 36 H82 V78 H52 V62 A7.5 7.5 0 1 0 52 50 Z"
      />
      <path className="a-gd thin" d="M84 16 v8 M80 20 h8" />
      <circle className="a-fg" cx="33" cy="60" r="2.5" />
      <circle className="a-fi" cx="14" cy="22" r="1.5" />
    </>
  ),
  dice: () => (
    <>
      <rect className="a-sf" x="18" y="44" width="34" height="34" rx="6" />
      <rect className="a-ln" x="18" y="44" width="34" height="34" rx="6" />
      {[
        [27, 53],
        [35, 61],
        [43, 69],
      ].map(([x, y]) => (
        <circle key={`a${x}`} className="a-fi" cx={x} cy={y} r="2.6" />
      ))}
      <g transform="rotate(20 67 38)">
        <rect className="a-bg" x="53" y="24" width="28" height="28" rx="5" />
        <rect className="a-ac" x="53" y="24" width="28" height="28" rx="5" />
        <circle className="a-fa" cx="61" cy="32" r="2.4" />
        <circle className="a-fa" cx="73" cy="44" r="2.4" />
      </g>
      <path className="a-gd thin" d="M58 72 Q70 70 76 60 M64 80 Q78 78 84 66" />
    </>
  ),
  coin: () => (
    <>
      <path className="a-sg" d="M16 50 V76 A16 5 0 0 0 48 76 V50 Z" />
      <path className="a-ln" d="M16 50 V76 A16 5 0 0 0 48 76 V50" />
      <path className="a-ln thin" d="M16 58 A16 5 0 0 0 48 58 M16 67 A16 5 0 0 0 48 67" />
      <ellipse className="a-bg" cx="32" cy="50" rx="16" ry="5" />
      <ellipse className="a-ln" cx="32" cy="50" rx="16" ry="5" />
      <circle className="a-sg" cx="68" cy="60" r="18" />
      <circle className="a-gd" cx="68" cy="60" r="18" />
      <circle className="a-gd thin" cx="68" cy="60" r="12.5" />
      <path className="a-ac" d="M72.5 55 Q68 50.5 64 54 Q62 58.5 68 60 Q74 61.5 72 66 Q68 69.5 63.5 65 M68 49 V52 M68 68 V71" />
      <circle className="a-fa" cx="84" cy="24" r="2" />
    </>
  ),
  people: () => (
    <>
      {[28, 72].map((x) => (
        <g key={x}>
          <circle className="a-ln" cx={x} cy="38" r="8" />
          <path className="a-ln" d={`M${x - 14} 76 Q${x - 14} 52 ${x} 52 Q${x + 14} 52 ${x + 14} 76`} />
        </g>
      ))}
      <path className="a-bg" d="M31 84 Q31 58 50 58 Q69 58 69 84 Z" />
      <path className="a-sf" d="M31 84 Q31 58 50 58 Q69 58 69 84 Z" />
      <path className="a-ac" d="M31 84 Q31 58 50 58 Q69 58 69 84" />
      <circle className="a-bg" cx="50" cy="42" r="10" />
      <circle className="a-sf" cx="50" cy="42" r="10" />
      <circle className="a-ac" cx="50" cy="42" r="10" />
      <path className="a-gd thin" d="M50 14 v8 M46 18 h8" />
      <path className="a-ln thin" d="M12 84 H88" />
    </>
  ),
  briefcase: () => (
    <>
      <path className="a-ln" d="M40 34 V27 Q40 22 45 22 H55 Q60 22 60 27 V34" />
      <rect className="a-sf" x="16" y="34" width="68" height="46" rx="7" />
      <rect className="a-ln" x="16" y="34" width="68" height="46" rx="7" />
      <path className="a-ac thin" d="M16 54 Q50 62 84 54" />
      <rect className="a-bg" x="44" y="51" width="12" height="10" rx="2" />
      <rect className="a-gd" x="44" y="51" width="12" height="10" rx="2" />
      <circle className="a-fg" cx="50" cy="56" r="1.6" />
      <path className="a-ac thin" d="M28 34 V80 M72 34 V80" />
    </>
  ),
  hourglass: () => (
    <>
      <path className="a-sf" d="M34 18 Q34 40 48 50 Q34 60 34 82 H66 Q66 60 52 50 Q66 40 66 18 Z" />
      <path className="a-ln" d="M34 18 Q34 40 48 50 Q34 60 34 82 M66 18 Q66 40 52 50 Q66 60 66 82" />
      <path className="a-ac" d="M24 15 H76 M24 85 H76" style={{ strokeWidth: 3 }} />
      <path className="a-ln thin" d="M27 15 V85 M73 15 V85" />
      <path className="a-fg" d="M39 32 Q50 36 61 32 Q58 42 50 47 Q42 42 39 32 Z" />
      <path className="a-gd thin" d="M50 50 V72" />
      <path className="a-fg" d="M37 82 Q38 72 50 70 Q62 72 63 82 Z" />
      <circle className="a-fi" cx="86" cy="30" r="1.5" />
    </>
  ),
  rocket: () => (
    <>
      <g transform="rotate(40 50 50)">
        <path className="a-gd dash" d="M50 76 V92" />
        <path className="a-fg" d="M44 60 Q50 80 56 60 Z" />
        <path className="a-ac" d="M39 47 L29 62 L39 60 M61 47 L71 62 L61 60" />
        <path className="a-sf" d="M50 14 Q64 28 62 60 H38 Q36 28 50 14 Z" />
        <path className="a-ln" d="M50 14 Q64 28 62 60 H38 Q36 28 50 14 Z" />
        <circle className="a-bg" cx="50" cy="37" r="6" />
        <circle className="a-ac" cx="50" cy="37" r="6" />
        <path className="a-ln thin" d="M42 52 H58" />
      </g>
      <circle className="a-fi" cx="18" cy="24" r="1.5" />
      <path className="a-gd thin" d="M84 64 v8 M80 68 h8" />
    </>
  ),
  mask: () => (
    <>
      <path className="a-ac thin dash" d={MASK} transform="translate(16 0)" />
      <path className="a-bg" d={MASK} />
      <path className="a-sf" d={MASK} />
      <path className="a-ln" d={MASK} />
      <path className="a-ln" d="M29 42 Q35 36 40 42 Q35 45 29 42 Z M44 42 Q49 36 55 42 Q49 45 44 42 Z" />
      <path className="a-gd" d="M32 58 Q42 68 52 58" />
      <path className="a-gd thin" d="M28 34 Q34 30 39 33 M45 33 Q50 30 56 34" />
      <circle className="a-fa" cx="84" cy="20" r="2" />
    </>
  ),
  sprout: () => (
    <>
      <path className="a-sg" d={MOUND} />
      <path className="a-ln" d="M16 82 Q50 64 84 82" />
      <path className="a-ac" d="M50 74 Q49 60 50 44" />
      <path className="a-sf" d="M50 56 Q30 56 24 38 Q44 34 50 56 Z" />
      <path className="a-ac" d="M50 56 Q30 56 24 38 Q44 34 50 56 Z" />
      <path className="a-sf" d="M50 46 Q56 26 78 22 Q76 44 50 46 Z" />
      <path className="a-ac" d="M50 46 Q56 26 78 22 Q76 44 50 46 Z" />
      <path className="a-ln thin" d="M46 52 Q38 46 31 41 M54 42 Q62 34 72 28" />
      <circle className="a-fg" cx="66" cy="76" r="2" />
      <path className="a-gd thin" d="M22 18 v8 M18 22 h8" />
    </>
  ),
  globe: () => (
    <>
      <circle className="a-sf" cx="50" cy="50" r="28" />
      <circle className="a-ln" cx="50" cy="50" r="28" />
      <ellipse className="a-ln thin" cx="50" cy="50" rx="12" ry="28" />
      <path className="a-ln thin" d="M50 22 V78 M23.8 40 H76.2 M23.8 60 H76.2 M22 50 H78" />
      <ellipse className="a-gd thin" cx="50" cy="50" rx="42" ry="12" transform="rotate(-20 50 50)" />
      <circle className="a-fg" cx="86" cy="38" r="3.5" />
      <circle className="a-fi" cx="16" cy="20" r="1.5" />
    </>
  ),
  hand: () => (
    <>
      <path className="a-ln thin" d="M8 86 H92" />
      <path className="a-ln" d="M14 86 V80 Q14 76 18 76 H34 Q38 76 38 80 V86" />
      <path className="a-ac" d="M26 76 L34 44 L66 38 V48" style={{ strokeWidth: 3 }} />
      {[
        [26, 76],
        [34, 44],
        [66, 38],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle className="a-bg" cx={x} cy={y} r="4.5" />
          <circle className="a-ln" cx={x} cy={y} r="4.5" />
        </g>
      ))}
      <path className="a-ln" d="M54 50 H78 M56 50 V66 L59 70 M76 50 V66 L73 70" />
      <rect className="a-sg" x="59" y="56" width="14" height="14" rx="2" />
      <rect className="a-gd" x="59" y="56" width="14" height="14" rx="2" />
      <ellipse className="a-ln thin dash" cx="66" cy="84" rx="10" ry="1.5" />
    </>
  ),
  flag: () => (
    <>
      <path className="a-sf" d={PEAK} />
      <path className="a-ln" d="M10 86 L40 44 L52 58 L62 48 L90 86" />
      <path className="a-ln thin" d="M33 54 L37 52 L40 56 L45 51" />
      <path className="a-ln" d="M40 44 V12" />
      <path className="a-sg" d="M40 14 Q50 10 58 16 Q66 22 74 18 V32 Q66 36 58 30 Q50 24 40 28 Z" />
      <path className="a-gd" d="M40 14 Q50 10 58 16 Q66 22 74 18 V32 Q66 36 58 30 Q50 24 40 28" />
      <circle className="a-fa" cx="84" cy="44" r="2" />
      <circle className="a-fi" cx="18" cy="24" r="1.5" />
    </>
  ),
};
