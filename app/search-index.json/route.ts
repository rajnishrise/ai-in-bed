import { levels } from "@/content";
import { glossary } from "@/content/glossary";
import { resources } from "@/content/resources";
import { termSlug } from "@/lib/glossary";
import type { SearchItem } from "@/lib/search";

export const dynamic = "force-static";

/** A small static index the search dialog downloads the first time it opens. */
export function GET() {
  const items: SearchItem[] = [];
  for (const level of levels) {
    level.lessons.forEach((lesson, i) => {
      const body = lesson.blocks
        .map((b) => (b.kind === "p" || b.kind === "tip" ? b.text : b.kind === "card" ? `${b.title} ${b.body.join(" ")}` : ""))
        .join(" ");
      items.push({
        kind: "Lesson",
        title: lesson.title,
        href: `/learn/${level.id}/${lesson.slug}`,
        meta: `${level.name} · Lesson ${i + 1}`,
        text: lesson.summary,
        hay: `${lesson.title} ${lesson.summary} ${lesson.takeaways.join(" ")} ${body}`.toLowerCase(),
      });
    });
  }
  for (const t of glossary) {
    items.push({
      kind: "Glossary",
      title: t.term,
      href: `/glossary#${termSlug(t.term)}`,
      meta: "Glossary",
      text: t.def,
      hay: `${t.term} ${t.def}`.toLowerCase(),
    });
  }
  for (const r of resources) {
    items.push({
      kind: "Library",
      title: r.title,
      href: r.url,
      external: true,
      meta: `${r.format} · ${r.by}`,
      text: r.blurb,
      hay: `${r.title} ${r.by} ${r.format} ${r.blurb}`.toLowerCase(),
    });
  }
  return Response.json(items);
}
