import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { glossary } from "@/content/glossary";
import { termExamples } from "@/content/glossary-examples";
import { termSeo } from "@/content/glossary-seo";
import { PopularGuides } from "@/components/PopularGuides";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { HeroArt } from "@/components/cardArt";
import { pickMotif } from "@/components/cardArt/pick";
import { glossaryMotifs } from "@/content/visuals";
import { JsonLd } from "@/components/JsonLd";
import { blogPath, postsForTerm } from "@/lib/blog";
import { getTerm, lessonsForTerm, relatedTerms, termInSentence, termSlug } from "@/lib/glossary";
import { publisher, termModified } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Params = { term: string };

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

export function generateStaticParams() {
  return glossary.map((t) => ({ term: termSlug(t.term) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const t = getTerm((await params).term);
  if (!t) return {};
  const path = `/glossary/${termSlug(t.term)}`;
  const seo = termSeo[t.term];
  const title = seo?.title ?? `What Is ${t.term}? A Simple Explanation`;
  const description = seo?.answer ?? `${t.term} in plain English: ${t.def}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { siteName: SITE_NAME, type: "article", locale: "en", title, description, url: path },
  };
}

export default async function TermPage({ params }: { params: Promise<Params> }) {
  const term = getTerm((await params).term);
  if (!term) notFound();
  const slug = termSlug(term.term);
  const url = absoluteUrl(`/glossary/${slug}`);
  const example = termExamples[term.term];
  const lessons = lessonsForTerm(term);
  const related = relatedTerms(term);
  const reading = postsForTerm(term);
  const i = sorted.indexOf(term);
  const prev = sorted[(i - 1 + sorted.length) % sorted.length];
  const next = sorted[(i + 1) % sorted.length];
  const name = termInSentence(term.term);
  const seo = termSeo[term.term];
  const answer = seo?.answer ?? term.def;
  const faqs = [
    { q: `What is ${name} in simple terms?`, a: answer },
    ...(example ? [{ q: `What is an example of ${name}?`, a: example }] : []),
    ...(lessons.length
      ? [
          {
            q: `Where can I learn about ${name} for free?`,
            a: `${SITE_NAME} explains it in the free lesson "${lessons[0].lesson.title}" (${lessons[0].level.name} level, ${lessons[0].lesson.minutes} minutes), with no sign-up.`,
          },
        ]
      : []),
    ...(seo?.faqs ?? []),
  ];

  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "DefinedTerm",
              "@id": url,
              name: term.term,
              description: answer,
              url,
              inDefinedTermSet: { "@type": "DefinedTermSet", name: "AI glossary in plain English", url: absoluteUrl("/glossary") },
            },
            {
              "@type": "WebPage",
              url,
              name: seo?.h1 ?? `What is ${name}?`,
              about: { "@id": url },
              dateModified: termModified(term.term),
              publisher,
              speakable: { "@type": "SpeakableSpecification", cssSelector: [".term-answer", ".term-example"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Glossary", item: absoluteUrl("/glossary") },
                { "@type": "ListItem", position: 3, name: term.term, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/glossary">Glossary</Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{term.term}</span>
      </nav>
      <p className="kicker">AI glossary</p>
      <h1>{seo?.h1 ?? `What is ${name}?`}</h1>
      <HeroArt
        size="compact"
        motifs={[glossaryMotifs[termSlug(term.term)] ?? pickMotif(`${term.term} ${term.term} ${answer}`)]}
        seedKey={`glossary/${term.term}`}
        alt={`Small line illustration for the AI term ${term.term}.`}
      />
      <section className="term-box" aria-label="Short answer">
        <p className="term-label">Short answer</p>
        <p className="term-answer">{answer}</p>
      </section>
      {example && (
        <section className="term-box term-box-soft" aria-label="Example">
          <p className="term-label">For example</p>
          <p className="term-example">{example}</p>
        </section>
      )}

      {seo?.guide && (
        <p className="term-guide">
          <Link href={seo.guide.href} className="text-link">
            {seo.guide.title} <Icon name="arrow" size={15} />
          </Link>
        </p>
      )}

      {lessons.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: 40 }}>
            Learn it in a free lesson
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
        </>
      )}

      {reading.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: 40 }}>
            Read more on the blog
          </h2>
          <ul className="link-list">
            {reading.map((p) => (
              <li key={p.slug}>
                <Link href={blogPath(p)}>
                  <span>{p.title}</span>
                  <span className="muted">{p.topic}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {related.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: 40 }}>
            Related terms
          </h2>
          <ul className="term-chips">
            {related.map((r) => (
              <li key={r.term}>
                <Link href={`/glossary/${termSlug(r.term)}`} className="pill">
                  {r.term}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title" style={{ marginTop: 40 }}>
        Questions
      </h2>
      <Faq faqs={faqs} />

      <div style={{ marginTop: 40 }}>
        <PopularGuides title="Start learning AI, free" limit={5} />
      </div>

      <nav className="term-nav" aria-label="More terms">
        <Link href={`/glossary/${termSlug(prev.term)}`}>
          <Icon name="back" size={15} /> {prev.term}
        </Link>
        <Link href="/glossary">All {glossary.length} terms</Link>
        <Link href={`/glossary/${termSlug(next.term)}`}>
          {next.term} <Icon name="arrow" size={15} />
        </Link>
      </nav>
    </div>
  );
}
