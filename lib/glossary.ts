import { glossary, type Term } from "@/content/glossary";

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
