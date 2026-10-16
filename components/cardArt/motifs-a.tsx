import type { Motif } from "./kit";

const pill = (x: number, y: number, w: number, h: number) =>
  `M${x + h / 2} ${y} H${x + w - h / 2} A${h / 2} ${h / 2} 0 0 1 ${x + w - h / 2} ${y + h} H${x + h / 2} A${h / 2} ${h / 2} 0 0 1 ${x + h / 2} ${y} Z`;

export const motifsA: Record<string, Motif> = {
  brain: () => (
    <>
      <ellipse className="a-sf" cx="50" cy="48" rx="34" ry="26" />
      <path
        className="a-ln"
        d="M30 66 C18 64 14 50 22 42 C20 30 32 22 42 26 C46 18 60 18 64 26 C76 24 86 34 82 46 C88 56 80 68 70 66 C66 74 52 74 48 68 C42 72 32 72 30 66 Z"
      />
      <path className="a-ln thin" d="M58 72 C58 78 60 82 64 86" />
      <path className="a-ac" d="M50 24 C46 34 54 40 50 50 C47 58 50 64 49 69" />
      <path className="a-ac thin" d="M26 48 C32 42 38 50 44 44" />
      <path className="a-ac thin" d="M57 38 C63 33 68 40 75 37" />
      <path className="a-ac thin" d="M58 58 C63 53 69 59 76 54" />
      <path className="a-gd thin dash" d="M36 38 L64 48 L40 58" />
      <circle className="a-fg" cx="36" cy="38" r="2.6" />
      <circle className="a-fg" cx="64" cy="48" r="3" />
      <circle className="a-fg" cx="40" cy="58" r="2.2" />
    </>
  ),

  network: () => {
    const n: [number, number][] = [
      [16, 52],
      [36, 24],
      [38, 74],
      [58, 46],
      [80, 20],
      [84, 62],
      [64, 84],
    ];
    const e: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [3, 5],
      [2, 6],
      [5, 6],
    ];
    const fill = ["a-ln", "a-ln", "a-ln", "a-ac", "a-ln", "a-ln", "a-ln"];
    return (
      <>
        <circle className="a-sf" cx="58" cy="46" r="16" />
        {e.map(([a, b]) => (
          <path key={`${a}-${b}`} className="a-ln thin" d={`M${n[a][0]} ${n[a][1]} L${n[b][0]} ${n[b][1]}`} />
        ))}
        {n.map(([x, y], i) => (
          <g key={i}>
            <circle className="a-bg" cx={x} cy={y} r={i === 3 ? 7 : 5} />
            <circle className={fill[i]} cx={x} cy={y} r={i === 3 ? 7 : 5} />
          </g>
        ))}
        <circle className="a-fa" cx="36" cy="24" r="3" />
        <circle className="a-fa" cx="84" cy="62" r="3" />
        <circle className="a-fg" cx="58" cy="46" r="3" />
      </>
    );
  },

  chart: () => (
    <>
      <path className="a-sf" d="M18 84 L18 70 L34 58 L48 64 L64 40 L82 22 L82 84 Z" />
      <path className="a-ln thin dash" d="M18 58 H86 M18 36 H86" />
      <path className="a-ln" d="M14 12 V86 H90" />
      <path className="a-ac" d="M18 70 L34 58 L48 64 L64 40 L82 22" />
      <circle className="a-fi" cx="34" cy="58" r="2" />
      <circle className="a-fi" cx="48" cy="64" r="2" />
      <circle className="a-fi" cx="64" cy="40" r="2" />
      <circle className="a-gd thin" cx="82" cy="22" r="7" />
      <circle className="a-fg" cx="82" cy="22" r="3.4" />
    </>
  ),

  scatter: () => {
    const pts: [number, number, string][] = [
      [20, 70, "a-fi"],
      [26, 80, "a-fi"],
      [32, 62, "a-fa"],
      [40, 72, "a-fi"],
      [44, 54, "a-fi"],
      [52, 60, "a-fa"],
      [58, 42, "a-fi"],
      [64, 52, "a-fi"],
      [70, 34, "a-fa"],
      [78, 40, "a-fi"],
      [82, 24, "a-fi"],
    ];
    return (
      <>
        <ellipse className="a-sf" cx="51" cy="52" rx="40" ry="14" transform="rotate(-36 51 52)" />
        <path className="a-ln thin" d="M12 12 V88 H88" />
        <path className="a-ac" d="M16 80 L86 26" />
        {pts.map(([x, y, c]) => (
          <circle key={`${x}-${y}`} className={c} cx={x} cy={y} r="2.4" />
        ))}
        <circle className="a-fg" cx="51" cy="53" r="3.2" />
      </>
    );
  },

  target: () => (
    <>
      <circle className="a-sf" cx="44" cy="56" r="32" />
      <circle className="a-ln" cx="44" cy="56" r="32" />
      <circle className="a-ln" cx="44" cy="56" r="21" />
      <circle className="a-ac" cx="44" cy="56" r="10" />
      <circle className="a-fg" cx="44" cy="56" r="3" />
      <path className="a-ln" d="M47 53 L84 16" />
      <path className="a-ac" d="M47 53 l9 -2 M47 53 l-2 9" />
      <path className="a-gd" d="M84 16 l6 -1 M84 16 l1 -6 M79 21 l6 -1 M79 21 l1 -6" />
    </>
  ),

  layers: () => {
    const plane = (cy: number) => `M18 ${cy} L50 ${cy - 14} L82 ${cy} L50 ${cy + 14} Z`;
    return (
      <>
        <path className="a-ln thin dash" d="M18 30 V70 M82 30 V70 M50 44 V84" />
        <path className="a-bg" d={plane(70)} />
        <path className="a-ln" d={plane(70)} />
        <path className="a-bg" d={plane(50)} />
        <path className="a-si" d={plane(50)} />
        <path className="a-ln" d={plane(50)} />
        <path className="a-bg" d={plane(30)} />
        <path className="a-sf" d={plane(30)} />
        <path className="a-ac" d={plane(30)} />
        <circle className="a-fg" cx="50" cy="30" r="3" />
        <circle className="a-fa" cx="38" cy="30" r="1.8" />
        <circle className="a-fa" cx="62" cy="30" r="1.8" />
      </>
    );
  },

  hill: () => (
    <>
      <ellipse className="a-sf" cx="50" cy="70" rx="26" ry="14" />
      <path className="a-ln" d="M8 30 C24 30 28 76 50 76 C66 76 70 50 80 46 C86 44 90 47 92 48" />
      <path className="a-gd dash" d="M27 33 C36 40 38 62 48 68" />
      <path className="a-gd" d="M44 66 l4 2 l-1 -4.4" />
      <circle className="a-fa" cx="21" cy="32" r="5" />
      <circle className="a-fg" cx="50" cy="76" r="2.6" />
      <path className="a-ln thin dash" d="M30 86 H70" />
    </>
  ),

  tree: () => (
    <>
      <path className="a-ln thin" d="M50 24 L28 44 M50 24 L72 44" />
      <path className="a-ln thin" d="M28 54 L18 74 M28 54 L38 74 M72 54 L62 74 M72 54 L82 74" />
      <rect className="a-sf" x="38" y="10" width="24" height="14" rx="4" />
      <rect className="a-ac" x="38" y="10" width="24" height="14" rx="4" />
      <rect className="a-bg" x="20" y="44" width="16" height="10" rx="3" />
      <rect className="a-ln" x="20" y="44" width="16" height="10" rx="3" />
      <rect className="a-bg" x="64" y="44" width="16" height="10" rx="3" />
      <rect className="a-ln" x="64" y="44" width="16" height="10" rx="3" />
      <circle className="a-fa" cx="18" cy="79" r="5" />
      <circle className="a-ln" cx="38" cy="79" r="5" />
      <circle className="a-fg" cx="62" cy="79" r="5" />
      <circle className="a-ln" cx="82" cy="79" r="5" />
    </>
  ),

  clusters: () => {
    const groups: { cx: number; cy: number; r: number; d: [number, number][] }[] = [
      { cx: 30, cy: 34, r: 17, d: [[-9, -6], [6, -9], [-4, 8], [9, 5], [-11, 3]] },
      { cx: 72, cy: 38, r: 15, d: [[-7, -7], [7, -4], [-6, 7], [6, 8], [10, -9]] },
      { cx: 48, cy: 72, r: 16, d: [[-10, -4], [8, -6], [-5, 8], [10, 5], [0, -10]] },
    ];
    return (
      <>
        {groups.map((g) => (
          <g key={`${g.cx}-${g.cy}`}>
            <circle className="a-sf" cx={g.cx} cy={g.cy} r={g.r} />
            <circle className="a-ac thin dash" cx={g.cx} cy={g.cy} r={g.r} />
            {g.d.map(([dx, dy]) => (
              <circle key={`${dx}-${dy}`} className="a-fi" cx={g.cx + dx} cy={g.cy + dy} r="1.9" />
            ))}
            <circle className="a-fg" cx={g.cx} cy={g.cy} r="3.2" />
          </g>
        ))}
      </>
    );
  },

  tokens: () => {
    const rows: { y: number; w: number[] }[] = [
      { y: 22, w: [22, 14, 26] },
      { y: 43, w: [18, 30, 14] },
      { y: 64, w: [28, 20] },
    ];
    return (
      <>
        <rect className="a-sg" x="20" y="61" width="32" height="19" rx="6" />
        {rows.map((row, ri) => {
          const total = row.w.reduce((a, b) => a + b, 0) + (row.w.length - 1) * 5;
          let x = 50 - total / 2;
          return (
            <g key={row.y}>
              {row.w.map((w, i) => {
                const at = x;
                x += w + 5;
                const accent = ri === 1 && i === 1;
                return (
                  <rect
                    key={i}
                    className={accent ? "a-fa" : ri === 2 && i === 0 ? "a-ac" : "a-ln"}
                    x={at}
                    y={row.y}
                    width={w}
                    height="13"
                    rx="4"
                  />
                );
              })}
            </g>
          );
        })}
        <path className="a-gd" d="M86 62 V80" />
        <circle className="a-fg" cx="86" cy="58" r="2" />
      </>
    );
  },

  constellation: () => {
    const p: [number, number][] = [
      [24, 66],
      [36, 46],
      [52, 54],
      [60, 30],
      [78, 36],
      [72, 64],
    ];
    return (
      <>
        <circle className="a-sf" cx="56" cy="46" r="24" />
        <path className="a-ln thin" d="M12 88 H90 M12 88 V12" />
        <path className="a-gd thin dash" d="M12 88 L58 32" />
        <path
          className="a-ac thin"
          d={`M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]} L${p[2][0]} ${p[2][1]} L${p[3][0]} ${p[3][1]} L${p[4][0]} ${p[4][1]} L${p[5][0]} ${p[5][1]} L${p[2][0]} ${p[2][1]}`}
        />
        {p.map(([x, y], i) => (
          <circle key={i} className={i === 1 || i === 4 ? "a-fa" : "a-fi"} cx={x} cy={y} r={i === 1 || i === 4 ? 2.6 : 2} />
        ))}
        <path
          className="a-fg"
          d="M60 24 Q60 30 66 30 Q60 30 60 36 Q60 30 54 30 Q60 30 60 24 Z"
        />
      </>
    );
  },

  attention: () => {
    const cx = [17, 39, 61, 83];
    const arc = (a: number, b: number, h: number) => `M${cx[a]} 58 Q${(cx[a] + cx[b]) / 2} ${58 - h} ${cx[b]} 58`;
    return (
      <>
        <path className="a-ac" d={arc(0, 2, 46)} style={{ strokeWidth: 3 }} />
        <path className="a-ac" d={arc(1, 2, 30)} />
        <path className="a-ln thin" d={arc(0, 1, 26)} />
        <path className="a-gd" d={arc(2, 3, 28)} />
        <path className="a-ln thin dash" d={arc(1, 3, 66)} />
        {cx.map((x, i) => (
          <g key={x}>
            <path className="a-bg" d={pill(x - 10, 58, 20, 11)} />
            {i === 2 && <path className="a-sf" d={pill(x - 10, 58, 20, 11)} />}
            <path className={i === 2 ? "a-ac" : "a-ln"} d={pill(x - 10, 58, 20, 11)} />
            <path className="a-ln thin" d={`M${x - 4} 63.5 H${x + 4}`} />
          </g>
        ))}
        <circle className="a-fg" cx="61" cy="79" r="2.4" />
      </>
    );
  },

  funnel: () => (
    <>
      <path className="a-sf" d="M20 32 H80 L56 58 V72 H44 V58 Z" />
      <path className="a-ln" d="M20 32 L44 58 V72 H56 V58 L80 32" />
      <ellipse className="a-ac" cx="50" cy="32" rx="30" ry="5" />
      {[
        [30, 16, "a-fi"],
        [42, 22, "a-fa"],
        [52, 12, "a-fi"],
        [62, 20, "a-fi"],
        [72, 13, "a-fa"],
        [38, 9, "a-fi"],
        [58, 6, "a-fi"],
      ].map(([x, y, c]) => (
        <circle key={`${x}-${y}`} className={c as string} cx={x as number} cy={y as number} r="2.2" />
      ))}
      <path className="a-ln thin" d="M82 10 l5 5 M87 10 l-5 5" />
      <circle className="a-fg" cx="50" cy="81" r="2.6" />
      <circle className="a-fg" cx="50" cy="90" r="2" />
    </>
  ),

  stack: () => (
    <>
      <rect className="a-bg" x="24" y="18" width="44" height="58" rx="5" transform="rotate(-14 46 47)" />
      <rect className="a-ln thin" x="24" y="18" width="44" height="58" rx="5" transform="rotate(-14 46 47)" />
      <rect className="a-bg" x="27" y="21" width="44" height="58" rx="5" transform="rotate(-6 49 50)" />
      <rect className="a-ac thin" x="27" y="21" width="44" height="58" rx="5" transform="rotate(-6 49 50)" />
      <rect className="a-bg" x="30" y="24" width="44" height="58" rx="5" />
      <rect className="a-sf" x="30" y="24" width="44" height="58" rx="5" />
      <rect className="a-ln" x="30" y="24" width="44" height="58" rx="5" />
      <path className="a-ln thin" d="M38 44 H66 M38 52 H66 M38 60 H58 M38 68 H62" />
      <path className="a-gd" d="M38 35 H52" />
      <circle className="a-fg" cx="65" cy="35" r="3" />
    </>
  ),

  balance: () => (
    <>
      <path className="a-ln" d="M50 26 V82 M38 88 H62 M50 82 L42 88 M50 82 L58 88" />
      <path className="a-ac" d="M18 31 L82 21" />
      <path className="a-ln thin" d="M20 31 L10 56 M20 31 L30 56 M80 22 L70 46 M80 22 L90 46" />
      <path className="a-bg" d="M8 56 Q20 68 32 56 Z" />
      <path className="a-sf" d="M8 56 Q20 68 32 56 Z" />
      <path className="a-ac" d="M8 56 Q20 68 32 56 Z" />
      <path className="a-bg" d="M68 46 Q80 58 92 46 Z" />
      <path className="a-ln" d="M68 46 Q80 58 92 46 Z" />
      <rect className="a-fa" x="15" y="49" width="10" height="7" rx="1.5" />
      <circle className="a-fg" cx="80" cy="43" r="2.4" />
      <circle className="a-fg" cx="50" cy="26" r="3.2" />
    </>
  ),
};
