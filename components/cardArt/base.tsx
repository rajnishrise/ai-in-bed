import type { Motif } from "./kit";

/** Reference motifs that set the drawing style for the rest. */
export const baseMotifs: Record<string, Motif> = {
  neuron: () => (
    <>
      {[22, 50, 78].map((y) => (
        <g key={y}>
          <path className="a-ln thin" d={`M14 ${y} L50 50`} />
          <circle className="a-bg" cx="14" cy={y} r="6" />
          <circle className="a-ln" cx="14" cy={y} r="6" />
        </g>
      ))}
      <path className="a-ac" d="M58 50 H88" />
      <path className="a-ac" d="M82 44 88 50 82 56" />
      <circle className="a-sf" cx="50" cy="50" r="15" />
      <circle className="a-ac" cx="50" cy="50" r="11" />
      <path className="a-gd" d="M44 54 Q50 40 56 46" />
    </>
  ),
  search: () => (
    <>
      <circle className="a-sf" cx="42" cy="42" r="24" />
      <circle className="a-ln" cx="42" cy="42" r="24" />
      <path className="a-gd" d="M30 34 A14 14 0 0 1 42 28" />
      <path className="a-ac" d="M60 60 L84 84" style={{ strokeWidth: 4 }} />
      <circle className="a-fg" cx="42" cy="42" r="3" />
      <circle className="a-fi" cx="33" cy="48" r="2" />
      <circle className="a-fi" cx="50" cy="38" r="2" />
    </>
  ),
  moon: () => (
    <>
      <path className="a-sg" d="M58 22 A30 30 0 1 0 80 62 A24 24 0 0 1 58 22 Z" />
      <path className="a-gd" d="M58 22 A30 30 0 1 0 80 62 A24 24 0 0 1 58 22 Z" />
      <path className="a-ln thin" d="M72 20 l0 8 M68 24 h8" />
      <circle className="a-fa" cx="84" cy="36" r="2" />
      <circle className="a-fi" cx="26" cy="20" r="1.5" />
    </>
  ),
};
