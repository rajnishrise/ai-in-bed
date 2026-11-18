import { sortedPosts } from "@/content/blog";
import { blogPath } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed of blog posts, for feed readers and search engines that follow feeds. */
export function GET() {
  const items = sortedPosts
    .map((p) => {
      const url = absoluteUrl(blogPath(p));
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${p.published}T06:00:00Z`).toUTCString()}</pubDate><category>${esc(p.topic)}</category><description>${esc(p.answer)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE_NAME} blog</title><link>${absoluteUrl("/blog")}</link><atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/><description>AI explained simply, in plain English.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
