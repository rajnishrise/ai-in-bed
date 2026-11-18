import Link from "next/link";
import { Fragment } from "react";
import { LessonText } from "./LessonText";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Blog text: [links](/path) become real links, and the first mention of each
 * glossary word elsewhere becomes tap-to-define, as in lessons.
 */
export function BlogText({ text, seen }: { text: string; seen: Set<string> }) {
  const out = [];
  let at = 0;
  let i = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index! > at) out.push(<LessonText key={i++} text={text.slice(at, m.index)} seen={seen} />);
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={i++} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i++} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ),
    );
    at = m.index! + m[0].length;
  }
  if (at < text.length) out.push(<LessonText key={i++} text={text.slice(at)} seen={seen} />);
  return <Fragment>{out}</Fragment>;
}

/** Glossary slugs a piece of text links to explicitly. */
export const linkedGlossarySlugs = (text: string) =>
  [...text.matchAll(LINK)].map((m) => m[2]).filter((h) => h.startsWith("/glossary/")).map((h) => h.slice(10));
