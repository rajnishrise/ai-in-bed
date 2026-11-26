import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { costLabel, everydayGuides, everydayMinutes, everydayText, getEverydayGuide } from "@/content/everyday";
import { BlogText } from "@/components/BlogText";
import { CopyPrompt } from "@/components/CopyPrompt";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ReadingBar } from "@/components/ReadingBar";
import { HeroArt } from "@/components/cardArt";
import { defaultVisual, everydayVisuals } from "@/content/visuals";
import { blogPath } from "@/lib/blog";
import { EVERYDAY_PATH, everydayPath, guideLessons, guidePosts, toolHref } from "@/lib/everyday";
import { publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl, suggestEditUrl } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return everydayGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const g = getEverydayGuide((await params).slug);
  if (!g) return {};
  const path = everydayPath(g);
  return {
    title: { absolute: `${g.seoTitle} · ${SITE_NAME}` },
    description: g.description,
    alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
    openGraph: {
      siteName: SITE_NAME,
      type: "article",
      locale: "en",
      title: g.seoTitle,
      description: g.description,
      url: path,
      publishedTime: g.published,
      modifiedTime: g.updated ?? g.published,
      section: "Everyday AI",
    },
    twitter: { card: "summary_large_image", title: g.seoTitle, description: g.description },
  };
}

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const sections = [
  { id: "what-ai-can-do", title: "What AI is good at here" },
  { id: "best-tools", title: "The best tools" },
  { id: "workflow", title: "A simple workflow" },
  { id: "prompts", title: "Prompts to copy" },
  { id: "tips", title: "Tips for better results" },
  { id: "watch-out", title: "Watch out for" },
];

export default async function EverydayGuidePage({ params }: { params: Promise<Params> }) {
  const g = getEverydayGuide((await params).slug);
  if (!g) notFound();
  const path = everydayPath(g);
  const url = absoluteUrl(path);
  const lessons = guideLessons(g);
  const posts = guidePosts(g);
  const minutes = everydayMinutes(g);
  const modified = g.updated ?? g.published;
  const others = everydayGuides.filter((o) => o.slug !== g.slug);
  const visual = everydayVisuals[g.slug] ?? defaultVisual(g.title, "bulb");
  // Tap-to-define marks the first mention of each glossary word across the page.
  const seen = new Set<string>();
  const t = (s: string) => <BlogText text={s} seen={seen} />;

  return (
    <article className="wrap narrow section blog-post everyday-guide">
      <ReadingBar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `${url}#article`,
              headline: g.seoTitle,
              name: g.title,
              description: g.description,
              abstract: g.answer,
              url,
              mainEntityOfPage: url,
              image: `${url}/opengraph-image`,
              datePublished: g.published,
              dateModified: modified,
              author: publisher,
              publisher,
              inLanguage: "en",
              isAccessibleForFree: true,
              articleSection: "Everyday AI",
              about: { "@type": "Thing", name: g.topic },
              timeRequired: `PT${minutes}M`,
              wordCount: everydayText(g).split(/\s+/).length,
              isPartOf: { "@type": "CollectionPage", "@id": absoluteUrl(`${EVERYDAY_PATH}#hub`), url: absoluteUrl(EVERYDAY_PATH) },
              speakable: { "@type": "SpeakableSpecification", cssSelector: [".term-answer"] },
            },
            {
              "@type": "ItemList",
              "@id": `${url}#tools`,
              name: `Best AI tools for ${g.topic.toLowerCase()}`,
              itemListElement: g.tools.map((tool, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: tool.name,
                  url: toolHref(tool.url),
                  applicationCategory: "MultimediaApplication",
                  description: tool.why,
                  ...(tool.cost !== "paid" && { offers: { "@type": "Offer", price: 0, priceCurrency: "USD" } }),
                },
              })),
            },
            {
              "@type": "HowTo",
              "@id": `${url}#howto`,
              name: g.title,
              step: g.steps.map((s, i) => {
                const [, name, rest] = s.match(/^\*\*(.+?)\*\*\s*(.*)$/) ?? [null, `Step ${i + 1}`, s];
                return { "@type": "HowToStep", position: i + 1, name: name.replace(/[.:]$/, ""), text: (rest || name).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") };
              }),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Everyday AI", item: absoluteUrl(EVERYDAY_PATH) },
                { "@type": "ListItem", position: 3, name: g.title, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={EVERYDAY_PATH}>Everyday AI</Link>
        <span aria-hidden> / </span>
        <span>{g.topic}</span>
      </nav>
      <header className="lesson-head">
        <p className="kicker">Everyday AI · {g.topic}</p>
        <h1>{g.title}</h1>
        <p className="lead">{g.description}</p>
        <p className="lesson-meta">
          Updated <time dateTime={modified}>{fmt(modified)}</time>
          <span aria-hidden>·</span> {minutes} min read
          <span aria-hidden>·</span> {g.tools.length} tools
        </p>
      </header>

      <HeroArt motifs={visual.motifs} seedKey={`everyday/${g.slug}`} alt={visual.alt} />

      <section className="term-box" aria-label="Short answer">
        <p className="term-label">Short answer</p>
        <p className="term-answer">{t(g.answer)}</p>
      </section>

      <nav className="blog-toc" aria-label="In this guide">
        <p className="term-label">In this guide</p>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
          <li>
            <a href="#questions">Questions</a>
          </li>
        </ul>
      </nav>

      <section className="blog-section">
        <h2 id="what-ai-can-do">What AI is good at here</h2>
        <ul className="lesson-ul">
          {g.canDo.map((s) => (
            <li key={s}>{t(s)}</li>
          ))}
        </ul>
      </section>

      <section className="blog-section">
        <h2 id="best-tools">The best tools</h2>
        <p className="muted small">
          Free and open-source options are marked. Free plans and prices change often, so check each site before you
          commit.
        </p>
        <ol className="tool-picks">
          {g.tools.map((tool) => {
            const internal = tool.url.startsWith("/");
            return (
              <li key={tool.name} className={`course-pick tool-pick ${internal ? "ours" : ""}`}>
                <p className="pick-for">{tool.for}</p>
                <h3>
                  {internal ? (
                    <Link href={tool.url}>{tool.name}</Link>
                  ) : (
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      {tool.name} <Icon name="external" size={14} />
                    </a>
                  )}
                  <span className={`cost cost-${tool.cost}`}>{costLabel[tool.cost]}</span>
                </h3>
                <p>
                  <span className="tool-by">{tool.by}</span> · {t(tool.why)}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="blog-section">
        <h2 id="workflow">A simple workflow</h2>
        <ol className="lesson-ul workflow">
          {g.steps.map((s) => (
            <li key={s}>{t(s)}</li>
          ))}
        </ol>
      </section>

      <section className="blog-section">
        <h2 id="prompts">Prompts to copy</h2>
        <p className="muted small">Swap the parts in [brackets] for your own details.</p>
        <div className="prompt-list">
          {g.prompts.map((p) => (
            <CopyPrompt key={p.text} label={p.for} text={p.text} />
          ))}
        </div>
      </section>

      <section className="blog-section">
        <h2 id="tips">Tips for better results</h2>
        <ul className="lesson-ul">
          {g.tips.map((s) => (
            <li key={s}>{t(s)}</li>
          ))}
        </ul>
      </section>

      <section className="blog-section">
        <h2 id="watch-out">Watch out for</h2>
        <aside className="tip watch-out">
          <Icon name="moon" size={18} />
          <ul>
            {g.watchOut.map((s) => (
              <li key={s}>{t(s)}</li>
            ))}
          </ul>
        </aside>
      </section>

      <h2 className="section-title" style={{ marginTop: 44 }}>
        Understand how it works, free
      </h2>
      <ul className="link-list">
        {lessons.map(({ level, lesson }) => (
          <li key={`${level.id}/${lesson.slug}`}>
            <Link href={`/learn/${level.id}/${lesson.slug}`}>
              <span>{lesson.title}</span>
              <span className="muted">
                {level.name} · {lesson.minutes} min
              </span>
            </Link>
          </li>
        ))}
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={blogPath(p)}>
              <span>{p.title}</span>
              <span className="muted">Blog</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="section-title" id="questions" style={{ marginTop: 44 }}>
        Questions
      </h2>
      <Faq faqs={g.faqs} />

      <h2 className="section-title" style={{ marginTop: 44 }}>
        More everyday AI guides
      </h2>
      <ul className="link-list">
        {others.map((o) => (
          <li key={o.slug}>
            <Link href={everydayPath(o)}>
              <span>{o.title}</span>
              <span className="muted">{o.topic}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="suggest-edit">
        <a href={suggestEditUrl(g.title, path, "Everyday AI")} target="_blank" rel="noopener noreferrer">
          <Icon name="edit" size={15} /> Know a better tool? Suggest an edit
        </a>
      </p>
    </article>
  );
}
