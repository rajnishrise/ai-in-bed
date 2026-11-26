import type { Metadata } from "next";
import Link from "next/link";
import { postMinutes, sortedPosts } from "@/content/blog";
import { Icon } from "@/components/Icon";
import { ArtThumb } from "@/components/cardArt";
import { pickMotif } from "@/components/cardArt/pick";
import { blogVisuals } from "@/content/visuals";
import { JsonLd } from "@/components/JsonLd";
import { blogPath } from "@/lib/blog";
import { publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "AI Explained Simply: The AI in Bed Blog";
const description =
  "Plain-English answers to the questions people ask about AI: how ChatGPT works, AI vs machine learning, how to learn AI for free, hallucinations, prompting and AI agents.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description, url: "/blog" },
};

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogIndex() {
  const url = absoluteUrl("/blog");
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${url}#blog`,
              name: `${SITE_NAME} blog`,
              description,
              url,
              inLanguage: "en",
              publisher,
              blogPost: sortedPosts.map((p) => ({
                "@type": "BlogPosting",
                "@id": `${absoluteUrl(blogPath(p))}#article`,
                headline: p.seoTitle,
                url: absoluteUrl(blogPath(p)),
                datePublished: p.published,
                dateModified: p.updated ?? p.published,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Blog", item: url },
              ],
            },
          ],
        }}
      />
      <p className="kicker">Blog</p>
      <h1>AI, explained simply</h1>
      <p className="lead">
        Straight answers to the questions people ask most about AI, each one linked to the free lessons that go deeper.
        No jargon you can&apos;t tap for a definition.
      </p>
      <ul className="blog-list">
        {sortedPosts.map((p) => (
          <li key={p.slug}>
            <Link href={blogPath(p)} className="blog-card">
              <ArtThumb motif={blogVisuals[p.slug]?.motifs[0] ?? pickMotif(`${p.title} ${p.answer}`)} seedKey={`blog/${p.slug}`} />
              <p className="pick-for">
                {p.topic} · {postMinutes(p)} min read
              </p>
              <h2>{p.title}</h2>
              <p className="muted">{p.description}</p>
              <span className="text-link">
                Read <Icon name="arrow" size={15} />
              </span>
            </Link>
            <time className="visually-hidden" dateTime={p.published}>
              {fmt(p.published)}
            </time>
          </li>
        ))}
      </ul>
      <p className="muted small" style={{ marginTop: 28 }}>
        Prefer to learn step by step? Start the free <Link href="/level/beginner">Beginner level</Link> or follow the{" "}
        <Link href="/learn-ai-in-30-days">30-day plan</Link>. Follow new posts with the <a href="/blog/rss.xml">RSS feed</a>.
      </p>
    </div>
  );
}
