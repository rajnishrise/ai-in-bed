import { getLesson } from "@/content";
import { type BlogBlock, type BlogPost, postText, posts } from "@/content/blog";
import type { Term } from "@/content/glossary";
import { termsIn } from "@/lib/glossary";
import { absoluteUrl } from "@/lib/site";

export const blogPath = (p: BlogPost) => `/blog/${p.slug}`;

/** The post's related lessons, resolved. */
export const postLessons = (p: BlogPost) =>
  p.lessons.map((k) => {
    const [lv, slug] = k.split("/");
    const found = getLesson(lv, slug);
    if (!found) throw new Error(`Blog post ${p.slug} links a missing lesson: ${k}`);
    return found;
  });

const termCache = new Map<string, Term[]>();
/** Glossary terms the post uses, in order of first mention. */
export function postTerms(p: BlogPost): Term[] {
  if (!termCache.has(p.slug)) termCache.set(p.slug, [...new Set(termsIn(postText(p)))]);
  return termCache.get(p.slug)!;
}

/** Posts that mention a glossary term, for "read more" links on term pages. */
export const postsForTerm = (t: Term, limit = 3) => posts.filter((p) => postTerms(p).includes(t)).slice(0, limit);

/** Posts that point at a lesson. */
export const postsForLesson = (key: string, limit = 3) => posts.filter((p) => p.lessons.includes(key)).slice(0, limit);

/** Other posts to read next: the ones sharing the most glossary terms. */
export function relatedPosts(p: BlogPost, limit = 3) {
  const mine = new Set(postTerms(p));
  return posts
    .filter((o) => o !== p)
    .map((o) => ({ o, score: postTerms(o).filter((t) => mine.has(t)).length + (o.topic === p.topic ? 2 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.o);
}

const md = (s: string) => s.replace(/\]\((\/[^)]*)\)/g, (_, path) => `](${absoluteUrl(path)})`);

function blockMarkdown(b: BlogBlock) {
  if (typeof b === "string") return md(b);
  if (Array.isArray(b)) return b.map((s) => `- ${md(s)}`).join("\n");
  if ("ol" in b) return b.ol.map((s, i) => `${i + 1}. ${md(s)}`).join("\n");
  return `> ${md(b.tip)}`;
}

/** A post as Markdown, for /blog/<slug>.md, llms-full.txt and AI assistants. */
export function postMarkdown(p: BlogPost) {
  return [
    `## ${p.title}`,
    `${absoluteUrl(blogPath(p))} · Published ${p.published}${p.updated ? ` · Updated ${p.updated}` : ""}`,
    `**Short answer:** ${p.answer}`,
    ...p.sections.flatMap((s) => [`### ${s.heading}`, ...s.blocks.map(blockMarkdown)]),
    "### Key takeaways",
    p.takeaways.map((t) => `- ${t}`).join("\n"),
    "### Questions",
    ...p.faqs.map((f) => `**${f.q}**\n\n${f.a}`),
    "### Sources",
    p.sources.map((s) => `- [${s.title}](${s.url}) by ${s.by}`).join("\n"),
  ].join("\n\n");
}
