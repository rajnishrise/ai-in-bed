import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, lessonKey, levels, nextLesson } from "@/content";
import type { Block } from "@/content/types";
import { CompleteButton } from "@/components/CompleteButton";
import { Graphic } from "@/components/graphics";
import { Quiz } from "@/components/Quiz";
import { ReadingBar } from "@/components/ReadingBar";
import { RichText } from "@/components/RichText";

type Params = { level: string; slug: string };

export function generateStaticParams() {
  return levels.flatMap((l) => l.lessons.map((s) => ({ level: l.id, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { level, slug } = await params;
  const found = getLesson(level, slug);
  return found ? { title: found.lesson.title, description: found.lesson.summary } : {};
}

function renderBlock(b: Block, i: number, quizNo: () => number) {
  switch (b.kind) {
    case "p":
      return (
        <p key={i} className="lesson-p">
          <RichText text={b.text} />
        </p>
      );
    case "card":
      return (
        <article key={i} className="card">
          <h3>{b.title}</h3>
          {b.body.map((t, j) => (
            <p key={j}>
              <RichText text={t} />
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
    case "quiz":
      return <Quiz key={i} n={quizNo()} question={b.question} options={b.options} answer={b.answer} explain={b.explain} />;
    case "tip":
      return (
        <aside key={i} className="tip">
          <span aria-hidden>🌙</span>
          <p>
            <RichText text={b.text} />
          </p>
        </aside>
      );
    case "list":
      return (
        <ul key={i} className="lesson-ul">
          {b.items.map((t, j) => (
            <li key={j}>
              <RichText text={t} />
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
  const quizNo = () => ++q;

  return (
    <>
      <ReadingBar />
      <article className="wrap narrow lesson">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href={`/level/${level.id}`}>
            {level.emoji} {level.name}
          </Link>
          <span aria-hidden> / </span>
          <span>
            Lesson {index + 1} of {level.lessons.length}
          </span>
        </nav>
        <header className="lesson-head">
          <span className="lesson-emoji" aria-hidden>
            {lesson.emoji}
          </span>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>
          <p className="lesson-meta">⏱ {lesson.minutes} min read</p>
        </header>

        {lesson.blocks.map((b, i) => renderBlock(b, i, quizNo))}

        <section className="takeaways">
          <h2>✨ Before you drift off</h2>
          <ul>
            {lesson.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="sources">
          <h2>📚 Go deeper (free & open)</h2>
          <ul>
            {lesson.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title} ↗
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

        <CompleteButton lessonKey={lessonKey(level.id, lesson.slug)} />

        <nav className="pager" aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/learn/${level.id}/${prev.slug}`} className="pager-link">
              <span className="muted">← Previous</span>
              <span>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.level.id}/${next.lesson.slug}`} className="pager-link right">
              <span className="muted">{next.level.id !== level.id ? `Next level: ${next.level.name} →` : "Next →"}</span>
              <span>{next.lesson.title}</span>
            </Link>
          ) : (
            <Link href="/resources" className="pager-link right">
              <span className="muted">You finished everything! 🎓</span>
              <span>Explore the full library →</span>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
