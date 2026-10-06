"use client";

import { useEffect, useState } from "react";

type Theme = "night" | "morning";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("night");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "night");
  }, []);

  const flip = () => {
    const next: Theme = theme === "night" ? "morning" : "night";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("aib-theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      className="icon-btn"
      onClick={flip}
      aria-label={theme === "night" ? "Switch to morning (light) mode" : "Switch to night (dark) mode"}
      title={theme === "night" ? "Morning mode" : "Night mode"}
    >
      {theme === "night" ? "☀️" : "🌙"}
    </button>
  );
}
