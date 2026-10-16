"use client";

import { useState } from "react";
import { Lab } from "./Lab";

type W = { w: string; x: number; y: number; g: number };
// A hand-placed 2D "meaning map". Real embeddings have hundreds of dimensions.
const WORDS: W[] = [
  { w: "king", x: 250, y: 50, g: 1 }, { w: "queen", x: 300, y: 80, g: 1 }, { w: "prince", x: 228, y: 74, g: 1 }, { w: "princess", x: 282, y: 108, g: 1 },
  { w: "man", x: 200, y: 92, g: 1 }, { w: "woman", x: 250, y: 122, g: 1 },
  { w: "cat", x: 52, y: 50, g: 2 }, { w: "dog", x: 86, y: 40, g: 2 }, { w: "kitten", x: 40, y: 78, g: 2 }, { w: "puppy", x: 78, y: 72, g: 2 }, { w: "wolf", x: 122, y: 30, g: 2 },
  { w: "apple", x: 60, y: 170, g: 3 }, { w: "banana", x: 98, y: 190, g: 3 }, { w: "mango", x: 48, y: 206, g: 3 }, { w: "bread", x: 130, y: 160, g: 3 },
  { w: "car", x: 238, y: 186, g: 4 }, { w: "bus", x: 276, y: 204, g: 4 }, { w: "bicycle", x: 222, y: 216, g: 4 }, { w: "train", x: 300, y: 172, g: 4 },
  { w: "happy", x: 148, y: 106, g: 5 }, { w: "joyful", x: 160, y: 128, g: 5 }, { w: "sad", x: 118, y: 120, g: 5 },
];
const cls = ["", "f1", "f2", "f3", "f4", "fmuted"];
const by = (w: string) => WORDS.find((x) => x.w === w)!;

/** Words as points: similar meanings sit close together. */
export default function EmbeddingsLab() {
  const [sel, setSel] = useState("cat");
  const [analogy, setAnalogy] = useState(false);
  const s = by(sel);
  const near = WORDS.filter((w) => w.w !== sel)
    .map((w) => ({ w, d: Math.hypot(w.x - s.x, w.y - s.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map((n) => n.w.w);
  const k = by("king"), m = by("man"), wo = by("woman"), q = by("queen");
  const tx = k.x - m.x + wo.x, ty = k.y - m.y + wo.y;
  return (
    <Lab title="A map of meaning" hint="Tap any word to find its nearest neighbours. Then try the famous king − man + woman sum.">
      <svg className="fig" viewBox="0 0 360 240" role="img" aria-label={`Nearest to ${sel}: ${near.join(", ")}`}>
        <defs>
          <marker id="emb-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="f2" />
          </marker>
        </defs>
        {!analogy &&
          near.map((n) => {
            const o = by(n);
            return <line key={n} x1={s.x} y1={s.y} x2={o.x} y2={o.y} className="s2" strokeWidth="1.2" strokeDasharray="3 3" />;
          })}
        {analogy && (
          <g>
            <line x1={m.x} y1={m.y} x2={wo.x} y2={wo.y} className="s2" strokeWidth="1.6" markerEnd="url(#emb-ah)" />
            <line x1={k.x} y1={k.y} x2={tx} y2={ty} className="s2" strokeWidth="1.6" markerEnd="url(#emb-ah)" />
            <circle cx={tx} cy={ty} r="12" fill="none" className="s2" strokeWidth="1.4" strokeDasharray="2 2" />
          </g>
        )}
        {WORDS.map((w) => {
          const on = analogy ? ["king", "man", "woman", "queen"].includes(w.w) : w.w === sel || near.includes(w.w);
          return (
            <g key={w.w} onClick={() => { setSel(w.w); setAnalogy(false); }} style={{ cursor: "pointer" }} opacity={on ? 1 : 0.45}>
              <circle cx={w.x} cy={w.y} r={w.w === sel && !analogy ? 6 : 4} className={cls[w.g]} />
              <text x={w.x + 8} y={w.y + 4} className={`t-sm ${w.w === sel && !analogy ? "bold" : ""}`}>{w.w}</text>
            </g>
          );
        })}
      </svg>
      <div className="lab-btns">
        <button className={`chip-btn ${analogy ? "on" : ""}`} aria-pressed={analogy} onClick={() => setAnalogy(!analogy)}>
          king − man + woman = ?
        </button>
      </div>
      <p className="lab-readout">
        {analogy ? (
          <>The arrow from <strong>man</strong> to <strong>woman</strong>, added to <strong>king</strong>, lands right next to <strong>{q.w}</strong>. Directions in the space carry meaning.</>
        ) : (
          <>Closest to <strong>{sel}</strong>: {near.join(", ")}.</>
        )}
      </p>
    </Lab>
  );
}
