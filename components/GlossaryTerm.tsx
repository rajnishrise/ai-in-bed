"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Icon } from "./Icon";

const EVENT = "aib-term-open";

/** A glossary word in a lesson. Tapping it slides up a short definition. */
export function GlossaryTerm({ label, term, def, slug }: { label: string; term: string; def: string; slug: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOther = (e: Event) => (e as CustomEvent<string>).detail !== id && setOpen(false);
    window.addEventListener(EVENT, onOther);
    return () => window.removeEventListener(EVENT, onOther);
  }, [id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    if (!open) window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
    setOpen(!open);
  };

  return (
    <>
      <button type="button" className="term" onClick={toggle} aria-expanded={open} aria-controls={id}>
        {label}
      </button>
      {open && (
        <span id={id} className="term-sheet" role="dialog" aria-label={`Definition of ${term}`}>
          <span className="term-sheet-head">
            <span className="term-sheet-kicker">Glossary</span>
            <button type="button" className="icon-btn plain" onClick={() => setOpen(false)} aria-label="Close definition">
              <Icon name="close" size={16} />
            </button>
          </span>
          <strong className="term-sheet-term">{term}</strong>
          <span className="term-sheet-def">{def}</span>
          <Link href={`/glossary#${slug}`} className="term-sheet-link">
            All terms <Icon name="arrow" size={14} />
          </Link>
        </span>
      )}
    </>
  );
}
