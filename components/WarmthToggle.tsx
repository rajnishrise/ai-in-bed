"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * Bedtime warmth gives the page a soft amber cast between 9pm and 5am, like
 * Night Shift on a phone. The layout's head script applies it before first
 * paint; this button lets a reader switch it off (or back to automatic).
 */
export function WarmthToggle() {
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    try {
      setAuto(localStorage.getItem("aib-warm") !== "off");
    } catch {
      /* storage blocked: stay on automatic */
    }
  }, []);

  const flip = () => {
    const next = !auto;
    setAuto(next);
    const h = new Date().getHours();
    const d = document.documentElement;
    if (next && (h >= 21 || h < 5)) d.dataset.warm = "on";
    else delete d.dataset.warm;
    try {
      if (next) localStorage.removeItem("aib-warm");
      else localStorage.setItem("aib-warm", "off");
    } catch {
      /* ignore */
    }
  };

  return (
    <button type="button" className="warmth-toggle" onClick={flip} aria-pressed={auto}>
      <Icon name="flame" size={14} /> Bedtime warmth after 9pm: {auto ? "on" : "off"}
    </button>
  );
}
