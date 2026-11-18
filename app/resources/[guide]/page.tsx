import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, resourceGuides } from "@/content/resource-guides";
import { resources } from "@/content/resources";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { lastUpdated, publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Params = { guide: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceGuides.map((g) => ({ guide: g.slug }));
}

const year = lastUpdated.slice(0, 4);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const g = getGuide((await params).guide);
  if (!g) return {};
  const path = `/resources/${g.slug}`;
  const title = `${g.title} (${year})`;
  return {
    title,
    description: g.description,
    alternates: { canonical: path },
    openGraph: { siteName: SITE_NAME, type: "article", locale: "en", title, description: g.description, url: path },
  };
}

/** A pick resolved against the Library, so links and authors stay in one place. */
function resolve(p: (typeof resourceGuides)[number]["picks"][number]) {
  if (p.href) return { ...p, href: p.href, by: p.by ?? SITE_NAME, license: undefined, internal: true };
  const r = resources.find((x) => x.title === p.title);
  if (!r) throw new Error(`Guide pick "${p.title}" is not in content/resources.ts`);
  return { ...p, href: r.url, by: p.by ?? r.by, license: r.license, internal: false };
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const g = getGuide((await params).guide);
  if (!g) notFound();
  const url = absoluteUrl(`/resources/${g.slug}`);
  const picks = g.picks.map(resolve);
  const others = resourceGuides.filter((x) => x.slug !== g.slug);
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: g.h1,
              description: g.description,
              url,
              datePublished: lastUpdated,
              dateModified: lastUpdated,
              author: publisher,
              publisher,
              inLanguage: "en",
            },
            {
              "@type": "ItemList",
              name: g.h1,
              itemListElement: picks.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: p.internal ? absoluteUrl(p.href) : p.href,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Library", item: absoluteUrl("/resources") },
                { "@type": "ListItem", position: 3, name: g.h1, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/resources">Library</Link>
        <span aria-hidden> / </span>
        <span aria-current="page">Guide</span>
      </nav>
      <p className="kicker">Guide · Updated {year}</p>
      <h1>{g.h1}</h1>
      <section className="term-box" aria-label="Short answer">
        <p className="term-label">Short answer</p>
        <p className="term-answer">{g.answer}</p>
      </section>

      <h2 className="section-title" style={{ marginTop: 40 }}>
        Our picks
      </h2>
      <ol className="course-picks">
        {picks.map((p) => (
          <li key={p.title} className={`course-pick ${p.internal ? "ours" : ""}`}>
            <p className="pick-for">{p.for}</p>
            <h3>
              {p.internal ? (
                <Link href={p.href}>{p.title}</Link>
              ) : (
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {p.title} <Icon name="external" size={14} />
                </a>
              )}
            </h3>
            <p>
              {p.by}
              {p.license ? ` · ${p.license}` : ""} · {p.why}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        Questions
      </h2>
      <Faq faqs={g.faqs} />

      <h2 className="section-title" style={{ marginTop: 48 }}>
        More free guides
      </h2>
      <ul className="link-list">
        {others.map((o) => (
          <li key={o.slug}>
            <Link href={`/resources/${o.slug}`}>
              <span>{o.h1}</span>
              <span className="muted">Guide</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/free-ai-courses">
            <span>The best free AI courses, for every level</span>
            <span className="muted">Guide</span>
          </Link>
        </li>
        <li>
          <Link href="/resources">
            <span>The full Library: all {resources.length} free sources</span>
            <span className="muted">Library</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
