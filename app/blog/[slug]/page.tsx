import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type BlogBlock, getPost, postMinutes, postText, posts } from "@/content/blog";
import { BlogText, linkedGlossarySlugs } from "@/components/BlogText";
import { Faq } from "@/components/Faq";
import { PopularGuides } from "@/components/PopularGuides";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ReadingBar } from "@/components/ReadingBar";
import { blogPath, postLessons, postTerms, relatedPosts } from "@/lib/blog";
import { getTerm, termSlug } from "@/lib/glossary";
import { publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl, suggestEditUrl } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const path = blogPath(p);
  return {
    title: { absolute: `${p.seoTitle} · ${SITE_NAME}` },
    description: p.description,
    alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
    openGraph: {
      siteName: SITE_NAME,
      type: "article",
      locale: "en",
      title: p.seoTitle,
      description: p.description,
      url: path,
      publishedTime: p.published,
      modifiedTime: p.updated ?? p.published,
      section: p.topic,
    },
    twitter: { card: "summary_large_image", title: p.seoTitle, description: p.description },
  };
}

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function Block({ b, seen }: { b: BlogBlock; seen: Set<string> }) {
  const t = (s: string) => <BlogText text={s} seen={seen} />;
  if (typeof b === "string") return <p className="lesson-p">{t(b)}</p>;
  if (Array.isArray(b))
    return (
      <ul className="lesson-ul">
        {b.map((s, i) => (
          <li key={i}>{t(s)}</li>
        ))}
      </ul>
    );
  if ("ol" in b)
    return (
      <ol className="lesson-ul">
        {b.ol.map((s, i) => (
          <li key={i}>{t(s)}</li>
        ))}
      </ol>
    );
  return (
    <aside className="tip">
      <Icon name="moon" size={18} />
      <p>{t(b.tip)}</p>
    </aside>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = blogPath(post);
  const url = absoluteUrl(path);
  const lessons = postLessons(post);
  const terms = postTerms(post).slice(0, 10);
  const more = relatedPosts(post);
  const minutes = postMinutes(post);
  const modified = post.updated ?? post.published;

  // Terms the text already links to don't also need a tap-to-define.
  const allText = [post.answer, ...post.sections.flatMap((s) => s.blocks.flatMap((b) => (typeof b === "string" ? [b] : Array.isArray(b) ? b : "ol" in b ? b.ol : [b.tip])))].join(" ");
  const seen = new Set(linkedGlossarySlugs(allText).map((s) => getTerm(s)?.term).filter((t): t is string => !!t));

  return (
    <article className="wrap narrow section blog-post">
      <ReadingBar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: post.seoTitle,
              name: post.title,
              description: post.description,
              abstract: post.answer,
              url,
              mainEntityOfPage: url,
              image: `${url}/opengraph-image`,
              datePublished: post.published,
              dateModified: modified,
              author: publisher,
              publisher,
              inLanguage: "en",
              isAccessibleForFree: true,
              articleSection: post.topic,
              timeRequired: `PT${minutes}M`,
              wordCount: postText(post).split(/\s+/).length,
              about: postTerms(post)
                .slice(0, 6)
                .map((t) => ({ "@type": "DefinedTerm", name: t.term, url: absoluteUrl(`/glossary/${termSlug(t.term)}`) })),
              citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
              isPartOf: { "@type": "Blog", "@id": absoluteUrl("/blog#blog"), name: `${SITE_NAME} blog`, url: absoluteUrl("/blog") },
              speakable: { "@type": "SpeakableSpecification", cssSelector: [".term-answer", ".takeaways"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/blog">Blog</Link>
        <span aria-hidden> / </span>
        <span>{post.topic}</span>
      </nav>
      <header className="lesson-head">
        <p className="kicker">{post.topic}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <p className="lesson-meta">
          <time dateTime={post.published}>{fmt(post.published)}</time>
          {post.updated && (
            <>
              <span aria-hidden>·</span> Updated <time dateTime={post.updated}>{fmt(post.updated)}</time>
            </>
          )}
          <span aria-hidden>·</span> {minutes} min read
        </p>
      </header>

      <section className="term-box" aria-label="Short answer">
        <p className="term-label">Short answer</p>
        <p className="term-answer">
          <BlogText text={post.answer} seen={seen} />
        </p>
      </section>

      <nav className="blog-toc" aria-label="In this post">
        <p className="term-label">In this post</p>
        <ul>
          {post.sections.map((s) => (
            <li key={s.heading}>
              <a href={`#${termSlug(s.heading)}`}>{s.heading}</a>
            </li>
          ))}
        </ul>
      </nav>

      {post.sections.map((s) => (
        <section key={s.heading} className="blog-section">
          <h2 id={termSlug(s.heading)}>{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} seen={seen} />
          ))}
        </section>
      ))}

      <section className="takeaways">
        <h2>Key takeaways</h2>
        <ul>
          {post.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <h2 className="section-title" style={{ marginTop: 44 }}>
        Learn it properly, free
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
      </ul>

      {terms.length > 0 && (
        <section className="lesson-terms">
          <p className="term-label">Terms in this post</p>
          <ul className="term-chips">
            {terms.map((t) => (
              <li key={t.term}>
                <Link href={`/glossary/${termSlug(t.term)}`} className="pill">
                  {t.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <h2 className="section-title" style={{ marginTop: 44 }}>
        Questions
      </h2>
      <Faq faqs={post.faqs} />

      <section className="sources">
        <h2>Sources and further reading</h2>
        <ul>
          {post.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title} <Icon name="external" size={13} />
              </a>
              <span className="muted">
                {" "}
                · {s.by}
                {s.note ? ` · ${s.note}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ marginTop: 44 }}>
        <PopularGuides title="Popular free lessons" limit={6} />
      </div>

      <h2 className="section-title" style={{ marginTop: 44 }}>
        Read next
      </h2>
      <ul className="link-list">
        {more.map((o) => (
          <li key={o.slug}>
            <Link href={blogPath(o)}>
              <span>{o.title}</span>
              <span className="muted">{postMinutes(o)} min</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="suggest-edit">
        <a href={suggestEditUrl(post.title, path, "Blog")} target="_blank" rel="noopener noreferrer">
          <Icon name="edit" size={15} /> Spotted a mistake? Suggest an edit
        </a>
      </p>
    </article>
  );
}
