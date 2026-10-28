import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, lessonKey, levels, nextLesson, quizId, stripEmoji } from "@/content";
import { cardArt } from "@/content/cardArt";
import type { Block } from "@/content/types";
import { CardArt } from "@/components/cardArt";
import { pickMotif } from "@/components/cardArt/pick";
import { CodeRunner } from "@/components/CodeRunner";
import { CompleteButton } from "@/components/CompleteButton";
import { Graphic } from "@/components/graphics";
import { Icon } from "@/components/Icon";
import { Interactive } from "@/components/interactive";
import { JsonLd } from "@/components/JsonLd";
import { LessonAudio } from "@/components/LessonAudio";
import { LessonFeedback } from "@/components/LessonFeedback";
import { LessonText } from "@/components/LessonText";
import { NextUp, ScrollToTop } from "@/components/NextUp";
import { Quiz } from "@/components/Quiz";
import { ReadingBar } from "@/components/ReadingBar";
import { ReaderToggle, ReelChrome, SwipeHint } from "@/components/Reel";
import { lessonTerms, termSlug } from "@/lib/glossary";
import { lastUpdated, lessonPublished, publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl, suggestEditUrl } from "@/lib/site";

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
    title: `${lesson.title} · Free ${lv.name.toLowerCase()} AI lesson`,
    description: lesson.summary,
    alternates: { canonical: path, types: { "text/markdown": `${path}.md` } },
    openGraph: {
      siteName: SITE_NAME,
      type: "article",
      locale: "en",
      title: lesson.title,
      description: lesson.summary,
      url: path,
      publishedTime: lessonPublished(lessonKey(lv.id, lesson.slug)),
      modifiedTime: lastUpdated,
    },
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
          <CardArt
            motif={cardArt[`${ctx.levelId}/${ctx.slug}|${b.title}`] ?? pickMotif(`${b.title} ${b.body.join(" ")}`)}
            seedKey={`${ctx.levelId}/${ctx.slug}|${b.title}`}
          />
          <h3>{stripEmoji(b.title)}</h3>
          {b.body.map((s, j) => (
            <p key={j}>{t(s)}</p>
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
          <p>{t(b.text)}</p>
        </aside>
      );
    case "interactive":
      return (
        <figure key={i} className="figure figure-lab">
          <Interactive id={b.id} />
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
    case "code":
      return <CodeRunner key={i} title={b.title} code={b.code} note={b.note} packages={b.packages} />;
    case "list":
      return (
        <ul key={i} className="lesson-ul">
          {b.items.map((s, j) => (
            <li key={j}>{t(s)}</li>
          ))}
        </ul>
      );
  }
}

const TEXT_KINDS = new Set<Block["kind"]>(["p", "list", "tip"]);

/** Groups blocks into swipeable cards: runs of text share a card, everything else gets its own. */
function toSlides(blocks: Block[]): Block[][] {
  const slides: Block[][] = [];
  let run: Block[] = [];
  for (const b of blocks) {
    if (TEXT_KINDS.has(b.kind)) {
      run.push(b);
      continue;
    }
    if (run.length) slides.push(run);
    run = [];
    slides.push([b]);
  }
  if (run.length) slides.push(run);
  return slides;
}

const plain = (s: string) => s.replace(/\*\*|\*|`/g, "").replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\uFE0F?/gu, "");

/** What listening mode reads aloud for a card. */
function speechFor(b: Block): string {
  switch (b.kind) {
    case "p":
    case "tip":
      return plain(b.text);
    case "list":
      return b.items.map(plain).join(". ");
    case "card":
      return `${plain(stripEmoji(b.title))}. ${b.body.map(plain).join(" ")}`;
    case "figure":
    case "interactive":
      return plain(b.caption);
    case "quiz":
      return `Quick check. ${plain(b.question)} ${b.options.map((o, k) => `${"ABCD"[k]}: ${plain(o)}.`).join(" ")} The answer is ${"ABCD"[b.answer]}. ${plain(b.explain)}`;
    case "code":
      return `There's a Python example here: ${b.title}.`;
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
  const slides = toSlides(lesson.blocks);
  const terms = lessonTerms(lesson).slice(0, 8);
  const quizzes = lesson.blocks.filter((b) => b.kind === "quiz");
  let blockIndex = 0;
  const speech = [
    `${lesson.title}. ${plain(lesson.summary)}`,
    ...slides.map((g) => g.map(speechFor).join(" ")),
    `Before you drift off. ${lesson.takeaways.map(plain).join(". ")}`,
    "That's the end of this lesson. Sleep well.",
  ];

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
              image: `${url}/opengraph-image`,
              datePublished: lessonPublished(key),
              dateModified: lastUpdated,
              author: publisher,
              timeRequired: `PT${lesson.minutes}M`,
              isAccessibleForFree: true,
              inLanguage: "en",
              teaches: lesson.takeaways,
              about: terms.map((t) => ({
                "@type": "DefinedTerm",
                name: t.term,
                description: t.def,
                url: absoluteUrl(`/glossary/${termSlug(t.term)}`),
              })),
              isPartOf: { "@type": "Course", name: `${level.name} AI course`, url: absoluteUrl(`/level/${level.id}`) },
              publisher,
              citation: lesson.sources.map((s) => ({
                "@type": "CreativeWork",
                name: s.title,
                url: s.url,
                author: s.by,
              })),
            },
            ...(quizzes.length
              ? [
                  {
                    "@type": "Quiz",
                    name: `${lesson.title}: quick check`,
                    url,
                    educationalLevel: level.name,
                    isAccessibleForFree: true,
                    hasPart: quizzes.map((b) => ({
                      "@type": "Question",
                      eduQuestionType: "Multiple choice",
                      text: b.question,
                      suggestedAnswer: b.options.filter((_, k) => k !== b.answer).map((o) => ({ "@type": "Answer", text: o })),
                      acceptedAnswer: { "@type": "Answer", text: b.options[b.answer], answerExplanation: { "@type": "Comment", text: b.explain } },
                    })),
                  },
                ]
              : []),
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
      <ScrollToTop />
      <article key={key} className="wrap narrow lesson">
        <ReelChrome total={slides.length + 3} />
        <section className="slide slide-intro">
          <div className="slide-inner">
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
              <LessonAudio segments={speech} />
              <ReaderToggle />
            </header>
            <SwipeHint />
          </div>
        </section>

        {slides.map((group, si) => (
          <section
            key={si}
            className={`slide ${group.length === 1 && group[0].kind !== "p" ? `slide-${group[0].kind}` : "slide-text"}`}
          >
            <div className="slide-inner">
              {group.every((b) => TEXT_KINDS.has(b.kind)) && (
                <CardArt variant="slide" motif={pickMotif(group.map(speechFor).join(" "))} seedKey={`${key}#${si}`} />
              )}
              {group.map((b) => renderBlock(b, blockIndex++, ctx))}
            </div>
          </section>
        ))}

        <section className="slide slide-takeaways">
          <div className="slide-inner">
            <section className="takeaways">
              <h2>Before you drift off</h2>
              <ul>
                {lesson.takeaways.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
            {terms.length > 0 && (
              <section className="lesson-terms">
                <h2>Terms in this lesson</h2>
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
          </div>
        </section>

        <section className="slide slide-end">
          <div className="slide-inner">
            <div className="lesson-done">
              <span className="lesson-done-mark" aria-hidden>
                <Icon name="moon" size={26} />
              </span>
              <h2>That&apos;s the lesson</h2>
              <p className="muted">
                {lesson.title} · {lesson.minutes} min
              </p>
            </div>

            {next ? (
              <NextUp
                lessonKey={key}
                href={`/learn/${next.level.id}/${next.lesson.slug}`}
                kicker={next.level.id !== level.id ? `Next level: ${next.level.name}` : "Up next"}
                title={next.lesson.title}
                meta={`${next.level.name} · ${next.lesson.minutes} min`}
              />
            ) : (
              <NextUp
                lessonKey={key}
                href="/resources"
                kicker="You finished every lesson"
                title="Explore the Library"
                meta="Free courses, books and papers"
              />
            )}

            <CompleteButton lessonKey={key} subtle />
            <LessonFeedback lessonKey={key} />
            <p className="suggest-edit">
              <a href={suggestEditUrl(lesson.title, `/learn/${level.id}/${lesson.slug}`)} target="_blank" rel="noopener noreferrer">
                <Icon name="edit" size={15} /> Spotted a mistake? Suggest an edit
              </a>
            </p>
            {prev && (
              <Link href={`/learn/${level.id}/${prev.slug}`} className="prev-link">
                <Icon name="back" size={15} /> Previous: {prev.title}
              </Link>
            )}
          </div>
        </section>
      </article>
    </>
  );
}
