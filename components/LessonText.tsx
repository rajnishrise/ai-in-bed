import { Fragment } from "react";
import { findTerms, termSlug } from "@/lib/glossary";
import { GlossaryTerm } from "./GlossaryTerm";
import { RichText } from "./RichText";

/** Lesson text with the first mention of each glossary term made tappable. */
export function LessonText({ text, seen }: { text: string; seen: Set<string> }) {
  return (
    <RichText
      text={text}
      renderPlain={(s) => {
        const hits = findTerms(s, seen);
        if (!hits.length) return s;
        const out = [];
        let at = 0;
        hits.forEach((h, i) => {
          out.push(<Fragment key={`t${i}`}>{s.slice(at, h.start)}</Fragment>);
          out.push(<GlossaryTerm key={`g${i}`} label={h.text} term={h.term.term} def={h.term.def} slug={termSlug(h.term.term)} />);
          at = h.end;
        });
        out.push(<Fragment key="end">{s.slice(at)}</Fragment>);
        return out;
      }}
    />
  );
}
