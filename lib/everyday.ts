import { getLesson } from "@/content";
import { getPost } from "@/content/blog";
import { type UseCaseGuide, costLabel } from "@/content/everyday";
import { absoluteUrl } from "@/lib/site";

export const EVERYDAY_PATH = "/everyday-ai";
export const everydayPath = (g: UseCaseGuide) => `${EVERYDAY_PATH}/${g.slug}`;

/** A guide's lessons, resolved; a missing one fails the build. */
export const guideLessons = (g: UseCaseGuide) =>
  g.lessons.map((k) => {
    const [lv, slug] = k.split("/");
    const found = getLesson(lv, slug);
    if (!found) throw new Error(`Everyday guide ${g.slug} links a missing lesson: ${k}`);
    return found;
  });

/** A guide's blog posts, resolved; a missing one fails the build. */
export const guidePosts = (g: UseCaseGuide) =>
  g.posts.map((s) => {
    const p = getPost(s);
    if (!p) throw new Error(`Everyday guide ${g.slug} links a missing blog post: ${s}`);
    return p;
  });

export const toolHref = (url: string) => (url.startsWith("/") ? absoluteUrl(url) : url);

const md = (s: string) => s.replace(/\]\((\/[^)]*)\)/g, (_, path) => `](${absoluteUrl(path)})`);

/** A guide as Markdown, for /everyday-ai/<slug>.md, llms-full.txt and AI assistants. */
export function guideMarkdown(g: UseCaseGuide) {
  return [
    `## ${g.title}`,
    `${absoluteUrl(everydayPath(g))} · Published ${g.published}${g.updated ? ` · Updated ${g.updated}` : ""}`,
    `**Short answer:** ${md(g.answer)}`,
    "### What AI is good at here",
    g.canDo.map((s) => `- ${md(s)}`).join("\n"),
    "### The best tools",
    g.tools.map((t) => `- **[${t.name}](${toolHref(t.url)})** (${costLabel[t.cost]}, ${t.by}). Best for: ${t.for}. ${md(t.why)}`).join("\n"),
    "### A simple workflow",
    g.steps.map((s, i) => `${i + 1}. ${md(s)}`).join("\n"),
    "### Prompts to copy",
    g.prompts.map((p) => `**${p.for}:**\n\n> ${p.text}`).join("\n\n"),
    "### Tips for better results",
    g.tips.map((s) => `- ${md(s)}`).join("\n"),
    "### Watch out for",
    g.watchOut.map((s) => `- ${md(s)}`).join("\n"),
    "### Questions",
    ...g.faqs.map((f) => `**${f.q}**\n\n${f.a}`),
  ].join("\n\n");
}
