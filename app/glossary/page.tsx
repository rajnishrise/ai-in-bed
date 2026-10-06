import type { Metadata } from "next";
import { glossary } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-English definitions of the AI terms used in AI in Bed.",
};

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="wrap narrow section">
      <h1>📖 Glossary</h1>
      <p className="lead">Every bit of jargon from the lessons, in plain English.</p>
      <dl className="glossary">
        {sorted.map((t) => (
          <div key={t.term} className="gloss">
            <dt>{t.term}</dt>
            <dd>{t.def}</dd>
          </div>
        ))}
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
