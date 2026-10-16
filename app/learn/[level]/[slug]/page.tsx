import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, lessonKey, levels, nextLesson, quizId, stripEmoji } from "@/content";
import type { Block } from "@/content/types";
import { CompleteButton } from "@/components/CompleteButton";
import { Graphic } from "@/components/graphics";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LessonFeedback } from "@/components/LessonFeedback";
import { LessonText } from "@/components/LessonText";
import { Quiz } from "@/components/Quiz";
import { ReadingBar } from "@/components/ReadingBar";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Params = { level: string; slug: string };

export function generateStaticParams() {
  return levels.flatMap((l) => l.lessons.map((s) => ({ level: l.id, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { level, slug } = await params;
  const found = getLesson(level, slug);
  if (!found) return {};
  const { lesson, level: lv } = found;
  const path = `/learn/${lv.id}/${lesson.slug}`;
  return {
    title: lesson.title,
    description: lesson.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", title: lesson.title, description: lesson.summary, url: path },
  };
}

type Ctx = { quizNo: () => number; seen: Set<string>; levelId: string; slug: string };

function renderBlock(b: Block, i: number, ctx: Ctx) {
  const t = (text: string) => <LessonText text={text} seen={ctx.seen} />;
  switch (b.kind) {
    case "p":
      return (
        <p key={i} className="lesson-p">
          {t(b.text)}
        </p>
      );
    case "card":
      return (
        <article key={i} className="card">
          <h3>{stripEmoji(b.title)}</h3>
          {b.body.map((s, j) => (
            <p key={j}>
              {t(s)}
            </p>
          ))}
        </article>
      );
    case "figure":
      return (
        <figure key={i} className="figure">
          <Graphic id={b.graphic} />
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
    case "quiz": {
      const n = ctx.quizNo();
      return (
        <Quiz
          key={i}
          id={quizId(ctx.levelId, ctx.slug, n)}
          n={n}
          question={b.question}
          options={b.options}
          answer={b.answer}
          explain={b.explain}
        />
      );
    }
    case "tip":
      return (
        <aside key={i} className="tip">
          <Icon name="moon" size={18} />
          <p>
            {t(b.text)}
          </p>
        </aside>
      );
    case "list":
      return (
        <ul key={i} className="lesson-ul">
          {b.items.map((s, j) => (
            <li key={j}>
              {t(s)}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { level: levelId, slug } = await params;
  const found = getLesson(levelId, slug);
  if (!found) notFound();
  const { level, lesson, index } = found;
  const next = nextLesson(level.id, lesson.slug);
  const prev = index > 0 ? level.lessons[index - 1] : undefined;
  let q = 0;
  const ctx: Ctx = { quizNo: () => ++q, seen: new Set(), levelId: level.id, slug: lesson.slug };
  const key = lessonKey(level.id, lesson.slug);
  const url = absoluteUrl(`/learn/${level.id}/${lesson.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LearningResource",
              name: lesson.title,
              description: lesson.summary,
              url,
              learningResourceType: "Lesson",
              educationalLevel: level.name,
              timeRequired: `PT${lesson.minutes}M`,
              isAccessibleForFree: true,
              inLanguage: "en",
              teaches: lesson.takeaways,
              isPartOf: { "@type": "Course", name: `${level.name} AI`, url: absoluteUrl(`/level/${level.id}`) },
              publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
              citation: lesson.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url, author: s.by })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: level.name, item: absoluteUrl(`/level/${level.id}`) },
                { "@type": "ListItem", position: 3, name: lesson.title, item: url },
              ],
            },
          ],
        }}
      />
      <ReadingBar />
      <article className="wrap narrow lesson">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href={`/level/${level.id}`}>{level.name}</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">
            Lesson {index + 1} of {level.lessons.length}
          </span>
        </nav>
        <header className="lesson-head">
          <p className="kicker">
            {level.name} · {String(index + 1).padStart(2, "0")}
          </p>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>
          <p className="lesson-meta">
            <Icon name="clock" size={15} /> {lesson.minutes} min read
            <span className="muted"> · Tap underlined words for a definition</span>
          </p>
        </header>

        {lesson.blocks.map((b, i) => renderBlock(b, i, ctx))}

        <section className="takeaways">
          <h2>Before you drift off</h2>
          <ul>
            {lesson.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="sources">
          <h2>Go deeper, free and open</h2>
          <ul>
            {lesson.sources.map((s) => (
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

        <CompleteButton lessonKey={key} />
        <LessonFeedback lessonKey={key} />

        <nav className="pager" aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/learn/${level.id}/${prev.slug}`} className="pager-link">
              <span className="muted">Previous</span>
              <span>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.level.id}/${next.lesson.slug}`} className="pager-link right">
              <span className="muted">{next.level.id !== level.id ? `Next level: ${next.level.name}` : "Next"}</span>
              <span>{next.lesson.title}</span>
            </Link>
          ) : (
            <Link href="/resources" className="pager-link right">
              <span className="muted">You finished every lesson</span>
              <span>Explore the Library</span>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
