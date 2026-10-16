"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/content/resources";
import { Icon } from "./Icon";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const ORDER = ["Beginner", "Intermediate", "Advanced", "All levels"];

/** The Library with level and format filters plus a text filter. */
export function LibraryBrowser({ resources }: { resources: Resource[] }) {
  const [level, setLevel] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");
  const [q, setQ] = useState("");
  const formats = useMemo(() => [...new Set(resources.map((r) => r.format))].sort(), [resources]);

  const shown = resources
    .filter((r) => level === "All" || r.level === level || r.level === "All levels")
    .filter((r) => format === "All" || r.format === format)
    .filter((r) => {
      const words = q.toLowerCase().split(/\s+/).filter(Boolean);
      const hay = `${r.title} ${r.by} ${r.blurb}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level));

  return (
    <>
      <div className="filters">
        <label className="filter-search">
          <Icon name="search" size={17} />
          <input type="search" placeholder="Filter by title, author or topic" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter the library" />
        </label>
        <div className="chips" role="group" aria-label="Level">
          {["All", ...LEVELS].map((l) => (
            <button key={l} className={`chip-btn ${level === l ? "on" : ""}`} aria-pressed={level === l} onClick={() => setLevel(l)}>
              {l === "All" ? "All levels" : l}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Format">
          {["All", ...formats].map((f) => (
            <button key={f} className={`chip-btn ${format === f ? "on" : ""}`} aria-pressed={format === f} onClick={() => setFormat(f)}>
              {f === "All" ? "All formats" : f}
            </button>
          ))}
        </div>
      </div>
      <p className="muted small" aria-live="polite">
        {shown.length} of {resources.length} resources
      </p>
      <ul className="res-list">
        {shown.map((r) => (
          <li key={r.url} className="res">
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="res-title">
              {r.title} <Icon name="external" size={14} />
            </a>
            <span className="res-meta">
              <span className="chip">{r.level}</span>
              <span className="chip">{r.format}</span>
              {r.license && <span className="chip chip-soft">{r.license}</span>}
              <span className="muted">{r.by}</span>
            </span>
            <span className="res-blurb">{r.blurb}</span>
          </li>
        ))}
      </ul>
      {!shown.length && <p className="empty-note">No resources match those filters.</p>}
    </>
  );
}
