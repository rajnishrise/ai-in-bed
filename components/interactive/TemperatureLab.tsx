"use client";

import { useState } from "react";
import { Lab, Slider } from "./Lab";

const CANDIDATES: [string, number][] = [
  ["mat", 3.4], ["sofa", 2.6], ["floor", 2.4], ["bed", 2.1], ["roof", 1.2], ["keyboard", 0.9], ["moon", -0.2], ["spaghetti", -1],
];

function softmax(t: number) {
  const ex = CANDIDATES.map(([, l]) => Math.exp(l / t));
  const s = ex.reduce((a, b) => a + b, 0);
  return ex.map((e) => e / s);
}

/** How temperature reshapes the next-word probabilities. */
export default function TemperatureLab() {
  const [t, setT] = useState(1);
  const [samples, setSamples] = useState<string[]>([]);
  const p = softmax(t);
  const sample = () => {
    let r = Math.random();
    let i = 0;
    while (i < p.length - 1 && r > p[i]) r -= p[i++];
    setSamples((s) => [CANDIDATES[i][0], ...s].slice(0, 6));
  };
  const max = Math.max(...p);
  return (
    <Lab title="Turn up the temperature" hint="Low temperature: the model almost always picks the top word, safe and repetitive. High: rarer words get a real chance, more creative and more random.">
      <p className="lab-prompt">
        The cat sat on the <span className="lab-blank">{samples[0] ?? "…"}</span>
      </p>
      <svg className="fig" viewBox="0 0 360 196" role="img" aria-label={`At temperature ${t.toFixed(1)} “mat” has ${Math.round(p[0] * 100)}% probability`}>
        {CANDIDATES.map(([w], i) => {
          const y = 8 + i * 23;
          const len = (p[i] / max) * 220;
          return (
            <g key={w}>
              <text x="78" y={y + 12} textAnchor="end" className="t-sm">{w}</text>
              <rect x="86" y={y} width={Math.max(1.5, len)} height="16" rx="4" className={i === 0 ? "f2" : "f1s"} />
              <text x={92 + len} y={y + 12} className="t-xs muted">{(p[i] * 100).toFixed(p[i] < 0.01 ? 1 : 0)}%</text>
            </g>
          );
        })}
      </svg>
      <Slider label="Temperature" value={t} min={0.1} max={2.5} step={0.1} onChange={setT} format={(v) => v.toFixed(1)} />
      <div className="lab-btns">
        <button className="btn btn-primary btn-sm" onClick={sample}>Sample a word</button>
        {samples.length > 0 && <span className="muted small">Recent: {samples.join(", ")}</span>}
      </div>
    </Lab>
  );
}
