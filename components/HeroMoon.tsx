"use client";

import { useEffect, useState } from "react";

/** A known new moon (6 Jan 2000, 18:14 UTC) and the length of a lunar month in days. */
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
const SYNODIC = 29.530588853;

/** Where tonight sits in the lunar month: 0 is new, 0.5 is full. */
export function moonPhase(date = new Date()): number {
  const days = (date.getTime() - NEW_MOON) / 86400000;
  return (((days / SYNODIC) % 1) + 1) % 1;
}

const NAMES = [
  "New moon",
  "Waxing crescent",
  "First quarter",
  "Waxing gibbous",
  "Full moon",
  "Waning gibbous",
  "Last quarter",
  "Waning crescent",
];

export function phaseName(p: number): string {
  return NAMES[Math.round(p * 8) % 8];
}

/** SVG path for the lit part of a moon of radius r centred at (cx, cy). */
function litPath(p: number, cx: number, cy: number, r: number): string {
  const waxing = p < 0.5;
  const rx = Math.abs(Math.cos(2 * Math.PI * p)) * r;
  const gibbous = p > 0.25 && p < 0.75;
  const outer = waxing ? 1 : 0;
  // The terminator bulges toward the lit side for a crescent and away from it for a gibbous moon.
  const inner = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  return `M${cx} ${cy - r}A${r} ${r} 0 0 ${outer} ${cx} ${cy + r}A${rx.toFixed(2)} ${r} 0 0 ${inner} ${cx} ${cy - r}Z`;
}

/**
 * The home page moon shows tonight's real phase, with the brand's three-star
 * constellation beside it. Until the browser knows the date it shows the
 * logo's crescent.
 */
export function HeroMoon() {
  const [p, setP] = useState<number | null>(null);
  useEffect(() => setP(moonPhase()), []);

  const phase = p ?? 0.2;
  const lit = Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100);

  return (
    <div className="hero-art">
      <div className="hero-moon" aria-hidden>
        <svg viewBox="0 0 120 120" focusable="false">
          <circle cx="56" cy="64" r="40" fill="var(--gold)" fillOpacity="0.1" />
          <circle cx="56" cy="64" r="40" fill="none" stroke="var(--gold)" strokeOpacity="0.22" strokeWidth="0.6" />
          <path d={litPath(phase, 56, 64, 40)} fill="var(--gold)" />
          <g stroke="var(--ink)" strokeWidth="0.9" strokeLinecap="round" opacity="0.6">
            <path d="M92 18 108 12M92 18 103 30M108 12 103 30" />
          </g>
          <circle cx="92" cy="18" r="2.6" fill="var(--ink)" />
          <circle cx="108" cy="12" r="2.1" fill="var(--ink)" />
          <circle cx="103" cy="30" r="2.3" fill="var(--ink)" />
        </svg>
      </div>
      <p className="moon-note" style={{ visibility: p === null ? "hidden" : "visible" }}>
        Tonight&apos;s moon · <b>{phaseName(phase)}</b> · {lit}% lit
      </p>
    </div>
  );
}
