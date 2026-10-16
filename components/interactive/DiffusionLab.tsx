"use client";

import { useEffect, useState } from "react";
import { Lab, Slider, gauss, rng } from "./Lab";

const N = 20;
const STEPS = 10;
// The target picture: a crescent moon and two stars, values 0..1.
const IMAGE = Array.from({ length: N * N }, (_, k) => {
  const x = k % N, y = Math.floor(k / N);
  const inA = Math.hypot(x - 9, y - 11) < 7;
  const inB = Math.hypot(x - 12, y - 8.5) < 6;
  const star = (x === 16 && y === 4) || (x === 4 && y === 3) || (x === 17 && y === 15);
  return inA && !inB ? 1 : star ? 0.9 : 0.08;
});
const r = rng(11);
const NOISE = IMAGE.map(() => 0.5 + gauss(r) * 0.35);

/** Step from pure noise back to a picture, the way a diffusion model generates. */
export default function DiffusionLab() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT((v) => {
        if (v >= STEPS) {
          setPlaying(false);
          return v;
        }
        return v + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [playing]);

  const a = t / STEPS;
  const s = 340 / N;
  return (
    <Lab title="From noise to a picture" hint="Training adds noise to real pictures step by step. Generating runs it backwards: start from static and remove a little predicted noise at each step.">
      <svg className="fig" viewBox="0 0 360 360" role="img" aria-label={`Denoising step ${t} of ${STEPS}`}>
        {IMAGE.map((v, k) => {
          const val = Math.max(0, Math.min(1, a * v + (1 - a) * NOISE[k]));
          return <rect key={k} x={10 + (k % N) * s} y={10 + Math.floor(k / N) * s} width={s + 0.3} height={s + 0.3} className="f2" fillOpacity={val} />;
        })}
      </svg>
      <Slider label="Denoising step" value={t} min={0} max={STEPS} step={1} onChange={(v) => { setPlaying(false); setT(v); }} format={(v) => `${v} / ${STEPS}`} />
      <div className="lab-btns">
        <button className="btn btn-primary btn-sm" onClick={() => { setT(0); setPlaying(true); }} disabled={playing}>Generate</button>
        <button className="btn btn-ghost btn-sm" onClick={() => { setPlaying(false); setT(0); }}>Back to noise</button>
      </div>
      <p className="lab-readout">
        {t === 0 ? "Pure noise. Nothing to see yet." : t < STEPS ? `Step ${t}: the model has removed ${Math.round(a * 100)}% of the noise. Shapes are emerging.` : "Done: a crescent moon and stars, recovered from static."}
      </p>
    </Lab>
  );
}
