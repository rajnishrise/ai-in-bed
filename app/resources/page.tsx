import type { Metadata } from "next";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Library",
  description: "The free and open-source AI courses, books, papers and tools AI in Bed is built on.",
};

const groups = ["Beginner", "Intermediate", "Advanced", "All levels"] as const;

export default function ResourcesPage() {
  return (
    <div className="wrap narrow section">
      <h1>📚 The Library</h1>
      <p className="lead">
        AI in Bed is a friendly front door. These are the free and open-source courses, books, papers and tools behind
        every lesson. All credit to their authors; licences are noted where the material is openly licensed.
      </p>
      {groups.map((g) => {
        const items = resources.filter((r) => r.level === g);
        if (!items.length) return null;
        return (
          <section key={g} className="res-group">
            <h2>{g}</h2>
            <ul className="res-list">
              {items.map((r) => (
                <li key={r.url} className="res">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="res-title">
                    {r.title} ↗
                  </a>
                  <span className="res-meta">
                    <span className="chip">{r.format}</span>
                    {r.license && <span className="chip chip-soft">{r.license}</span>}
                    <span className="muted">{r.by}</span>
                  </span>
                  <span className="res-blurb">{r.blurb}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
