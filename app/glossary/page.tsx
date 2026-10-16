import type { Metadata } from "next";
import { glossary } from "@/content/glossary";
import { termSlug } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "AI glossary in plain English",
  description: "Plain-English definitions of the AI terms used in AI in Bed, from attention to transformers.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(sorted.map((t) => t.term[0].toUpperCase()))];
  return (
    <div className="wrap narrow section">
      <p className="kicker">Glossary</p>
      <h1>Every bit of jargon, in plain English</h1>
      <p className="lead">The terms used across the lessons. In a lesson, tap an underlined word to see its definition.</p>
      <nav className="alpha" aria-label="Jump to letter">
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`}>
            {l}
          </a>
        ))}
      </nav>
      <dl className="glossary">
        {sorted.map((t, i) => {
          const first = i === 0 || sorted[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase();
          return (
            <div key={t.term} className="gloss" id={termSlug(t.term)}>
              {first && <span id={`letter-${t.term[0].toUpperCase()}`} className="anchor" />}
              <dt>{t.term}</dt>
              <dd>{t.def}</dd>
            </div>
          );
        })}
      </dl>
      <p className="muted">
        Want more? Google&apos;s{" "}
        <a href="https://developers.google.com/machine-learning/glossary" target="_blank" rel="noopener noreferrer">
          Machine Learning Glossary
        </a>{" "}
        covers hundreds of terms.
      </p>
    </div>
  );
}
