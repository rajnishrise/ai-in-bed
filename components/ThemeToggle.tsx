"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

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

  const label = theme === "night" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button className="icon-btn" onClick={flip} aria-label={label} title={label}>
      <Icon name={theme === "night" ? "sun" : "moon"} size={18} />
    </button>
  );
}
