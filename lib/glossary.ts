import { levels } from "@/content";
import { glossary, type Term } from "@/content/glossary";
import type { Block, Lesson } from "@/content/types";

export const termSlug = (term: string) =>
  term
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Alias = { text: string; term: Term; exactCase: boolean };

/*
 * Words in lessons that link to their glossary definition. Terms with a
 * qualifier like "Bias (in data)" are skipped: the bare word is ambiguous.
 */
const aliases: Alias[] = glossary
  .filter((t) => !t.term.includes("("))
  .flatMap((t) =>
    t.term.split(" / ").map((text) => ({
      text: text.trim(),
      term: t,
      // Acronyms (LLM, RAG, LoRA) only match with their own capitals.
      exactCase: /[A-Z].*[A-Z]/.test(text),
    })),
  )
  .sort((a, b) => b.text.length - a.text.length);

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const pattern = new RegExp(
  `\\b(${aliases.map((a) => escape(a.text)).join("|")})(?:s|es)?\\b`,
  "gi",
);

export type TermMatch = { start: number; end: number; text: string; term: Term };

/** Finds glossary terms in a run of plain text, skipping terms in `seen`. */
export function findTerms(text: string, seen: Set<string>): TermMatch[] {
  const out: TermMatch[] = [];
  for (const m of text.matchAll(pattern)) {
    const stem = m[1];
    const alias = aliases.find((a) =>
      a.exactCase ? a.text === stem : a.text.toLowerCase() === stem.toLowerCase(),
    );
    if (!alias || seen.has(alias.term.term)) continue;
    seen.add(alias.term.term);
    out.push({ start: m.index!, end: m.index! + m[0].length, text: m[0], term: alias.term });
  }
  return out;
}

export const getTerm = (slug: string) => glossary.find((t) => termSlug(t.term) === slug);

/** Glossary terms mentioned anywhere in a piece of text, in order of first mention. */
export const termsIn = (text: string) => findTerms(text, new Set()).map((m) => m.term);

const blockText = (b: Block) =>
  b.kind === "p" || b.kind === "tip"
    ? b.text
    : b.kind === "list"
      ? b.items.join(" ")
      : b.kind === "card"
        ? `${b.title} ${b.body.join(" ")}`
        : b.kind === "figure" || b.kind === "interactive"
          ? b.caption
          : b.kind === "quiz"
            ? `${b.question} ${b.explain}`
            : "";

/** The glossary terms a lesson uses, most-mentioned first. */
const termCache = new WeakMap<Lesson, Term[]>();

export function lessonTerms(lesson: Lesson): Term[] {
  const hit = termCache.get(lesson);
  if (hit) return hit;
  const text = [lesson.title, lesson.summary, ...lesson.blocks.map(blockText), ...lesson.takeaways].join("\n");
  const counts = new Map<Term, number>();
  for (const m of text.matchAll(pattern)) {
    const alias = aliases.find((a) => (a.exactCase ? a.text === m[1] : a.text.toLowerCase() === m[1].toLowerCase()));
    if (alias) counts.set(alias.term, (counts.get(alias.term) ?? 0) + 1);
  }
  const terms = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  termCache.set(lesson, terms);
  return terms;
}

/** Lessons that use a term, the ones that mention it most first. */
export function lessonsForTerm(term: Term, limit = 6) {
  return levels
    .flatMap((level) =>
      level.lessons.map((lesson) => {
        const terms = lessonTerms(lesson);
        const rank = terms.indexOf(term);
        return { level, lesson, rank };
      }),
    )
    .filter((x) => x.rank !== -1)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit);
}

/** Terms this definition uses, plus terms whose definitions use this one. */
export function relatedTerms(term: Term, limit = 6): Term[] {
  const out = new Set<Term>(termsIn(term.def));
  for (const t of glossary) if (t !== term && termsIn(t.def).includes(term)) out.add(t);
  out.delete(term);
  return [...out].slice(0, limit);
}

/** A term as it reads mid-sentence: "Machine learning" becomes "machine learning"; LoRA and AI winter stay. */
export const termInSentence = (term: string) => (/^[A-Z][a-z]+\b/.test(term) ? term[0].toLowerCase() + term.slice(1) : term);
