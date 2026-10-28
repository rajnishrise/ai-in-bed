import { getLesson, levels } from "@/content";
import { lessonMarkdown } from "@/lib/markdown";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return levels.flatMap((l) => l.lessons.map((s) => ({ level: l.id, slug: s.slug })));
}

/** One lesson as Markdown, served at /learn/<level>/<slug>.md (see next.config.mjs). */
export async function GET(_: Request, { params }: { params: Promise<{ level: string; slug: string }> }) {
  const { level, slug } = await params;
  const found = getLesson(level, slug)!;
  const body = `# ${found.lesson.title} · ${SITE_NAME}\n\n${lessonMarkdown(found.level, found.lesson).replace(/^## .*\n\n/, "")}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
