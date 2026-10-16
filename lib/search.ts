export type SearchItem = {
  kind: "Lesson" | "Glossary" | "Library";
  title: string;
  href: string;
  external?: boolean;
  meta: string;
  text: string;
  /** Lower-cased text the query is matched against. */
  hay: string;
};

/** Every query word must appear; title hits rank first, then lessons. */
export function searchItems(items: SearchItem[], q: string, limit = 24): SearchItem[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const kindRank = { Lesson: 0, Glossary: 1, Library: 2 } as const;
  return items
    .filter((it) => words.every((w) => it.hay.includes(w)))
    .map((it) => {
      const t = it.title.toLowerCase();
      let score = kindRank[it.kind];
      if (t.startsWith(words[0])) score -= 6;
      else if (words.every((w) => t.includes(w))) score -= 4;
      return { it, score };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.it);
}
