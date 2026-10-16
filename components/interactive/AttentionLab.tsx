"use client";

import { useState } from "react";
import { Lab } from "./Lab";

const BASE = ["The", "cat", "sat", "on", "the", "mat", "because", "it", "was"];

/** Hand-set attention weights for a few interesting words; others look nearby. */
function weights(i: number, ending: "tired" | "dirty"): number[] {
  const words = [...BASE, ending];
  const n = words.length;
  const set = (pairs: [number, number][]) => {
    const w = new Array(n).fill(0.02);
    pairs.forEach(([j, v]) => (w[j] = v));
    const s = w.reduce((a, b) => a + b, 0);
    return w.map((v) => v / s);
  };
  const itTarget = ending === "tired" ? 1 : 5;
  switch (words[i]) {
    case "it":
      return set([[itTarget, 0.62], [itTarget === 1 ? 5 : 1, 0.08], [7, 0.12], [9, 0.1]]);
    case "tired":
      return set([[7, 0.35], [1, 0.35], [8, 0.15]]);
    case "dirty":
      return set([[7, 0.35], [5, 0.35], [8, 0.15]]);
    case "sat":
      return set([[1, 0.45], [5, 0.25], [3, 0.12]]);
    case "mat":
      return set([[3, 0.3], [4, 0.2], [2, 0.3]]);
    default: {
      const w = words.map((_, j) => Math.exp(-Math.abs(i - j) * 1.1));
      const s = w.reduce((a, b) => a + b, 0);
      return w.map((v) => v / s);
    }
  }
}

/** Tap a word to see which other words it "looks at". */
export default function AttentionLab() {
  const [ending, setEnding] = useState<"tired" | "dirty">("tired");
  const [sel, setSel] = useState(7);
  const words = [...BASE, ending];
  const w = weights(sel, ending);
  const widths = words.map((t) => t.length * 5.6 + 10);
  const total = widths.reduce((a, b) => a + b, 0) + (words.length - 1) * 4;
  const xs = widths.map((wd, i) => (360 - total) / 2 + widths.slice(0, i).reduce((a, b) => a + b + 4, 0) + wd / 2);
  const top = w.map((v, j) => ({ v, j })).filter((o) => o.j !== sel).sort((a, b) => b.v - a.v)[0];
  return (
    <Lab title="Attention: who is “it”?" hint="Switch the last word between tired and dirty and tap “it” again. The same word attends to a different noun because the context changed.">
      <svg className="fig" viewBox="0 0 360 170" role="img" aria-label={`“${words[sel]}” attends most to “${words[top.j]}”`}>
        {w.map((v, j) => {
          if (j === sel || v < 0.04) return null;
          const x1 = xs[sel], x2 = xs[j];
          const h = Math.min(92, 16 + Math.abs(x1 - x2) * 0.42);
          return (
            <path key={j} d={`M${x1} 116 C${x1} ${116 - h * 1.33}, ${x2} ${116 - h * 1.33}, ${x2} 116`} fill="none" className="s2" strokeWidth={1 + v * 9} strokeOpacity={0.25 + v} />
          );
        })}
        {words.map((word, i) => (
          <g key={i} onClick={() => setSel(i)} style={{ cursor: "pointer" }}>
            <rect x={xs[i] - widths[i] / 2} y="118" width={widths[i]} height="22" rx="6" className={i === sel ? "f2" : "fsurf sline"} strokeWidth="1" />
            <text x={xs[i]} y="133" textAnchor="middle" className={`t-xs ${i === sel ? "on-solid bold" : ""}`}>{word}</text>
            <rect x={xs[i] - widths[i] / 2 + 3} y={160 - w[i] * 30} width={widths[i] - 6} height={w[i] * 30 + 0.5} rx="2" className="f2s" />
          </g>
        ))}
      </svg>
      <div className="lab-btns" role="group" aria-label="Last word">
        <span className="muted small">Last word:</span>
        {(["tired", "dirty"] as const).map((e) => (
          <button key={e} className={`chip-btn ${ending === e ? "on" : ""}`} aria-pressed={ending === e} onClick={() => setEnding(e)}>
            {e}
          </button>
        ))}
      </div>
      <p className="lab-readout">
        “<strong>{words[sel]}</strong>” pays most attention to “<strong>{words[top.j]}</strong>” ({Math.round(top.v * 100)}%).
        {words[sel] === "it" && (ending === "tired" ? " Cats get tired, mats don't." : " Mats get dirty; this time “it” is the mat.")}
      </p>
    </Lab>
  );
}
