import { getPost, posts } from "@/content/blog";
import { postMarkdown } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** One blog post as Markdown, served at /blog/<slug>.md (see next.config.mjs). */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug)!;
  const body = `# ${p.title} · ${SITE_NAME}\n\n${postMarkdown(p).replace(/^## .*\n\n/, "")}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
