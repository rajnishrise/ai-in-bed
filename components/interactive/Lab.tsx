"use client";

import type { ReactNode } from "react";

/** Frame shared by every interactive explainer. */
export function Lab({ title, children, hint }: { title: string; children: ReactNode; hint?: string }) {
  return (
    <div className="lab">
      <div className="lab-head">
        <span className="lab-kicker">Try it</span>
        <span className="lab-title">{title}</span>
      </div>
      {children}
      {hint && <p className="lab-hint">{hint}</p>}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => v.toFixed(2),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className="lab-slider">
      <span className="lab-slider-top">
        <span>{label}</span>
        <output>{format(value)}</output>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

/** Deterministic PRNG so server and client agree. */
export function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Roughly normal noise from the PRNG (Box–Muller). */
export function gauss(r: () => number) {
  const u = Math.max(r(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}
