import { everydayGuides, getEverydayGuide } from "@/content/everyday";
import { guideMarkdown } from "@/lib/everyday";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return everydayGuides.map((g) => ({ slug: g.slug }));
}

/** One Everyday AI guide as Markdown, served at /everyday-ai/<slug>.md (see next.config.mjs). */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const g = getEverydayGuide((await params).slug)!;
  const body = `# ${g.title} · ${SITE_NAME}\n\n${guideMarkdown(g).replace(/^## .*\n\n/, "")}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
