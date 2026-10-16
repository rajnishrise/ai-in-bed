"use client";

import { useMemo, useState } from "react";
import { Lab, Slider, gauss, rng } from "./Lab";

const truth = (x: number) => Math.sin(Math.PI * x);
const r = rng(7);
const TRAIN = Array.from({ length: 10 }, (_, i) => {
  const x = -0.95 + (1.9 * i) / 9 + (r() - 0.5) * 0.08;
  return { x, y: truth(x) + gauss(r) * 0.22 };
});
const TEST = Array.from({ length: 10 }, (_, i) => {
  const x = -0.86 + (1.72 * i) / 9;
  return { x, y: truth(x) + gauss(r) * 0.22 };
});

/** Least-squares polynomial fit via the normal equations (tiny ridge for stability). */
function fit(deg: number) {
  const n = deg + 1;
  const A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
  for (const p of TRAIN) {
    const pw = Array.from({ length: n }, (_, k) => p.x ** k);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) A[i][j] += pw[i] * pw[j];
      A[i][n] += pw[i] * p.y;
    }
  }
  for (let i = 0; i < n; i++) A[i][i] += 1e-9;
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
    [A[c], A[piv]] = [A[piv], A[c]];
    for (let i = 0; i < n; i++) {
      if (i === c) continue;
      const m = A[i][c] / A[c][c];
      for (let j = c; j <= n; j++) A[i][j] -= m * A[c][j];
    }
  }
  const w = A.map((row, i) => row[n] / row[i]);
  return (x: number) => w.reduce((s, wk, k) => s + wk * x ** k, 0);
}

const mse = (g: (x: number) => number, pts: { x: number; y: number }[]) =>
  pts.reduce((s, p) => s + (g(p.x) - p.y) ** 2, 0) / pts.length;

const sx = (x: number) => 20 + ((x + 1) / 2) * 320;
const sy = (y: number) => 85 - y * 50;

/** Slide model complexity and watch training and test error part ways. */
export default function OverfitLab() {
  const [deg, setDeg] = useState(3);
  const g = useMemo(() => fit(deg), [deg]);
  const train = mse(g, TRAIN);
  const test = mse(g, TEST);
  const verdict = deg <= 1 ? "Underfitting: too simple to follow the wave." : deg <= 5 ? "A good fit: it captures the pattern, not the noise." : "Overfitting: it threads every training dot and wiggles wildly between them.";
  const d = Array.from({ length: 161 }, (_, i) => {
    const x = -1 + (2 * i) / 160;
    const y = Math.max(-1.6, Math.min(1.6, g(x)));
    return `${i ? "L" : "M"}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`;
  }).join("");
  const bar = (v: number) => Math.min(150, v * 300);
  return (
    <Lab title="Underfit, just right, overfit" hint="Filled dots are training data the model sees. Hollow dots are new test data it has never seen. Watch the test error.">
      <svg className="fig" viewBox="0 0 360 230" role="img" aria-label={`Polynomial of degree ${deg}. ${verdict}`}>
        <defs>
          <clipPath id="of-clip">
            <rect x="10" y="0" width="340" height="170" />
          </clipPath>
        </defs>
        <line x1="20" y1="85" x2="340" y2="85" className="sline" strokeWidth="1" />
        <path d={d} fill="none" className="s1" strokeWidth="2.2" clipPath="url(#of-clip)" />
        {TRAIN.map((p, i) => (
          <circle key={`a${i}`} cx={sx(p.x)} cy={sy(p.y)} r="4.5" className="f2" />
        ))}
        {TEST.map((p, i) => (
          <circle key={`b${i}`} cx={sx(p.x)} cy={sy(p.y)} r="4" fill="none" className="s3" strokeWidth="1.8" />
        ))}
        <text x="20" y="190" className="t-xs muted">training error</text>
        <rect x="110" y="182" width={bar(train)} height="10" rx="3" className="f2" />
        <text x={116 + bar(train)} y="191" className="t-xs">{train.toFixed(3)}</text>
        <text x="20" y="214" className="t-xs muted">test error</text>
        <rect x="110" y="206" width={bar(test)} height="10" rx="3" className="f3" />
        <text x={116 + bar(test)} y="215" className="t-xs">{test > 0.5 ? `${test.toFixed(2)}+` : test.toFixed(3)}</text>
      </svg>
      <Slider label="Model complexity (polynomial degree)" value={deg} min={0} max={9} step={1} onChange={setDeg} format={(v) => String(v)} />
      <p className="lab-readout">{verdict}</p>
    </Lab>
  );
}
