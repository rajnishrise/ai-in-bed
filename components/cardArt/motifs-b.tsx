import type { Motif } from "./kit";

const f = (n: number) => +n.toFixed(1);

/** Outline of a gear with `n` trapezoid teeth. */
function gearPath(cx: number, cy: number, n: number, ro: number, ri: number, phase = 0) {
  const step = (Math.PI * 2) / n;
  const pt = (r: number, a: number) => `${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`;
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = phase + i * step;
    const q = step / 4;
    d += `${i === 0 ? "M" : "L"}${pt(ri, a - q * 1.3)} L${pt(ro, a - q * 0.7)} L${pt(ro, a + q * 0.7)} L${pt(ri, a + q * 1.3)} `;
  }
  return `${d}Z`;
}

/** A clockwise arc on a circle (angles in degrees, svg orientation) ending in an arrowhead. */
function arcArrow(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (a: number) => (a * Math.PI) / 180;
  const p = (a: number) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const span = (((a1 - a0) % 360) + 360) % 360;
  // tangent pointing along the travel direction
  const tx = -Math.sin(rad(a1));
  const ty = Math.cos(rad(a1));
  const head = (deg: number) => {
    const c = Math.cos(rad(deg));
    const s = Math.sin(rad(deg));
    const bx = -tx * c + ty * s;
    const by = -tx * s - ty * c;
    return `${f(x1 + bx * 8)} ${f(y1 + by * 8)}`;
  };
  return `M${f(x0)} ${f(y0)} A${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)} M${head(35)} L${f(x1)} ${f(y1)} L${head(-35)}`;
}

export const motifsB: Record<string, Motif> = {
  chat: () => {
    const back = "M21 16 H55 A8 8 0 0 1 63 24 V40 A8 8 0 0 1 55 48 H31 L20 57 V47.5 A8 8 0 0 1 13 40 V24 A8 8 0 0 1 21 16 Z";
    const front = "M45 38 H79 A8 8 0 0 1 87 46 V64 A8 8 0 0 1 79 72 V83 L69 72 H45 A8 8 0 0 1 37 64 V46 A8 8 0 0 1 45 38 Z";
    return (
      <>
        <path className="a-ln" d={back} />
        <path className="a-ln thin" d="M22 27 H50 M22 35 H34" />
        <path className="a-bg" d={front} />
        <path className="a-sf" d={front} />
        <path className="a-ac" d={front} />
        <circle className="a-fa" cx="50" cy="55" r="2.6" />
        <circle className="a-fg" cx="62" cy="55" r="2.6" />
        <circle className="a-fa" cx="74" cy="55" r="2.6" />
      </>
    );
  },
  robot: () => (
    <>
      <path className="a-ln" d="M50 27 V17" />
      <circle className="a-sg" cx="50" cy="13" r="6" />
      <circle className="a-fg" cx="50" cy="13" r="3" />
      <rect className="a-ln" x="13" y="43" width="9" height="16" rx="3.5" />
      <rect className="a-ln" x="78" y="43" width="9" height="16" rx="3.5" />
      <rect className="a-sf" x="22" y="27" width="56" height="48" rx="15" />
      <rect className="a-ln" x="22" y="27" width="56" height="48" rx="15" />
      <circle className="a-ac" cx="38" cy="48" r="6" />
      <circle className="a-ac" cx="62" cy="48" r="6" />
      <circle className="a-fi" cx="39.5" cy="46.5" r="2" />
      <circle className="a-fi" cx="63.5" cy="46.5" r="2" />
      <path className="a-gd" d="M41 62 Q50 68 59 62" />
      <path className="a-ln thin" d="M36 84 H64" />
    </>
  ),
  eye: () => (
    <>
      <path className="a-ln" d="M10 50 Q50 14 90 50 Q50 86 10 50 Z" />
      <path className="a-ln thin" d="M50 29 V19 M32 34 L27 26 M68 34 L73 26" />
      <circle className="a-sf" cx="50" cy="50" r="16" />
      <circle className="a-ac" cx="50" cy="50" r="16" />
      <circle className="a-fi" cx="50" cy="50" r="6" />
      <path className="a-gd" d="M39 55 A12 12 0 0 1 43 41" />
      <circle className="a-fg" cx="55" cy="45" r="2.6" />
    </>
  ),
  picture: () => (
    <>
      <path className="a-ln thin" d="M40 20 L50 11 L60 20" />
      <rect className="a-sf" x="20" y="26" width="60" height="48" rx="3" />
      <rect className="a-ln" x="13" y="19" width="74" height="62" rx="6" />
      <circle className="a-sg" cx="66" cy="39" r="9" />
      <circle className="a-gd" cx="66" cy="39" r="5" />
      <path className="a-ac" d="M20 72 L38 47 L51 63 L60 54 L80 72" />
    </>
  ),
  wave: () => {
    const hs = [8, 16, 26, 38, 50, 34, 22, 14, 8];
    return (
      <>
        <ellipse className="a-sf" cx="50" cy="50" rx="40" ry="26" />
        {hs.map((h, i) => {
          const x = 18 + i * 8;
          return (
            <path
              key={x}
              className={i === 4 ? "a-gd" : i % 2 ? "a-ac" : "a-ln"}
              d={`M${x} ${50 - h / 2} V${50 + h / 2}`}
            />
          );
        })}
        <path className="a-ln thin dash" d="M8 86 H92" />
      </>
    );
  },
  document: () => {
    const page = "M30 12 H60 L76 28 V84 A4 4 0 0 1 72 88 H30 A4 4 0 0 1 26 84 V16 A4 4 0 0 1 30 12 Z";
    return (
      <>
        <path className="a-sf" d={page} />
        <path className="a-ln" d={page} />
        <path className="a-ln" d="M60 12 V24 A4 4 0 0 0 64 28 H76" />
        <path className="a-ac" d="M33 28 H50" />
        <path className="a-ln thin" d="M33 42 H68 M33 51 H68 M33 60 H56" />
        <path className="a-gd" d="M33 74 H50" />
        <circle className="a-sg" cx="65" cy="74" r="6" />
        <circle className="a-fg" cx="65" cy="74" r="2.5" />
      </>
    );
  },
  books: () => (
    <>
      <rect className="a-ln" x="17" y="36" width="15" height="48" rx="2" />
      <path className="a-ln thin" d="M17 46 H32 M17 74 H32" />
      <rect className="a-sf" x="34" y="24" width="16" height="60" rx="2" />
      <rect className="a-ac" x="34" y="24" width="16" height="60" rx="2" />
      <path className="a-gd" d="M34 36 H50 M34 40 H50" />
      <g transform="rotate(-22 70 84)">
        <rect className="a-ln" x="70" y="32" width="14" height="52" rx="2" />
        <path className="a-ac thin" d="M74 44 V72" />
      </g>
      <path className="a-ln" d="M10 84 H90" />
      <circle className="a-fg" cx="86" cy="22" r="2" />
    </>
  ),
  database: () => {
    const body = "M22 24 V76 A28 9 0 0 0 78 76 V24";
    return (
      <>
        <path className="a-sf" d="M22 24 A28 9 0 0 1 78 24 V76 A28 9 0 0 1 22 76 Z" />
        <path className="a-ln" d={body} />
        <path className="a-ln thin" d="M22 41.5 A28 9 0 0 0 78 41.5 M22 58.5 A28 9 0 0 0 78 58.5" />
        <ellipse className="a-ac" cx="50" cy="24" rx="28" ry="9" />
        <circle className="a-fg" cx="31" cy="56" r="2.2" />
        <circle className="a-fa" cx="31" cy="73" r="2.2" />
        <path className="a-gd" d="M38 22 A16 4.5 0 0 1 56 19.5" />
      </>
    );
  },
  code: () => (
    <>
      <rect className="a-sf" x="12" y="20" width="76" height="60" rx="8" />
      <rect className="a-ln" x="12" y="20" width="76" height="60" rx="8" />
      <path className="a-ln thin" d="M12 32 H88" />
      <circle className="a-fi" cx="19" cy="26" r="1.6" />
      <circle className="a-fi" cx="25" cy="26" r="1.6" />
      <circle className="a-fg" cx="31" cy="26" r="1.6" />
      <path className="a-ac" d="M38 45 L28 56 L38 67 M62 45 L72 56 L62 67" />
      <path className="a-gd" d="M55 43 L45 69" />
    </>
  ),
  gears: () => {
    const big = gearPath(38, 58, 10, 24, 18.5, 0);
    const small = gearPath(66.4, 36.7, 7, 16, 11.5, 0.25);
    return (
      <>
        <path className="a-sf" d={big} />
        <path className="a-ln" d={big} />
        <circle className="a-ln thin" cx="38" cy="58" r="11" />
        <circle className="a-fg" cx="38" cy="58" r="3.5" />
        <path className="a-ac" d={small} />
        <circle className="a-gd" cx="66.4" cy="36.7" r="4.5" />
      </>
    );
  },
  loop: () => (
    <>
      <circle className="a-sf" cx="50" cy="50" r="15" />
      <path className="a-ac" d={arcArrow(50, 50, 30, 185, 330)} />
      <path className="a-ln" d={arcArrow(50, 50, 30, 5, 150)} />
      <circle className="a-gd" cx="50" cy="50" r="6" />
      <circle className="a-fg" cx="50" cy="50" r="2" />
      <circle className="a-fi" cx="86" cy="20" r="1.5" />
    </>
  ),
  tools: () => (
    <>
      <g transform="rotate(45 50 50)">
        <path
          className="a-ln"
          d="M46 37.3 A12 12 0 0 1 46 14.7 V24 H54 V14.7 A12 12 0 0 1 54 37.3 V82 A4 4 0 0 1 46 82 Z"
        />
        <circle className="a-ln thin" cx="50" cy="78" r="1.6" />
      </g>
      <g transform="rotate(-45 50 50)">
        <path className="a-ln" d="M50 46 V78" />
        <path className="a-gd" d="M47 78 H53 L51 86 H49 Z" />
        <rect className="a-bg" x="42" y="12" width="16" height="32" rx="7" />
        <rect className="a-sf" x="42" y="12" width="16" height="32" rx="7" />
        <rect className="a-ac" x="42" y="12" width="16" height="32" rx="7" />
        <path className="a-ac thin" d="M47 20 V36 M53 20 V36" />
        <path className="a-gd" d="M45 46 H55" />
      </g>
    </>
  ),
  lightning: () => {
    const bolt = "M54 10 H70 L57 40 H72 L40 90 L49 55 H33 Z";
    return (
      <>
        <path className="a-sg" d={bolt} />
        <path className="a-gd" d={bolt} />
        <path className="a-ac" d="M12 30 H34 M8 44 H28" />
        <path className="a-ln thin" d="M14 66 H32 M66 72 H84" />
        <path className="a-ln thin" d="M84 22 v8 M80 26 h8" />
        <circle className="a-fa" cx="86" cy="48" r="2" />
      </>
    );
  },
  server: () => (
    <>
      <rect className="a-sf" x="16" y="20" width="68" height="25" rx="5" />
      <rect className="a-ac" x="16" y="20" width="68" height="25" rx="5" />
      <rect className="a-ln" x="16" y="53" width="68" height="25" rx="5" />
      <path className="a-ln thin" d="M25 28 V37 M31 28 V37 M37 28 V37 M25 61 V70 M31 61 V70 M37 61 V70" />
      <circle className="a-fa" cx="64" cy="32.5" r="2.4" />
      <circle className="a-fg" cx="73" cy="32.5" r="2.4" />
      <circle className="a-fi" cx="64" cy="65.5" r="2.4" />
      <circle className="a-fa" cx="73" cy="65.5" r="2.4" />
      <path className="a-ln thin" d="M50 78 V86 M32 86 H68" />
    </>
  ),
  chip: () => {
    const at = [35, 45, 55, 65];
    const pins = at.map((p) => `M${p} 28 V18 M${p} 72 V82 M28 ${p} H18 M72 ${p} H82`).join(" ");
    return (
      <>
        <path className="a-ln" d={pins} />
        <rect className="a-sf" x="28" y="28" width="44" height="44" rx="5" />
        <rect className="a-ac" x="28" y="28" width="44" height="44" rx="5" />
        <rect className="a-gd" x="40" y="40" width="20" height="20" rx="2" />
        <circle className="a-fg" cx="50" cy="50" r="2.5" />
        <circle className="a-fi" cx="34" cy="34" r="1.5" />
      </>
    );
  },
};
