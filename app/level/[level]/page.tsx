import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allQuizzes, getLevel, lessonKey, levels } from "@/content";
import { LevelComplete } from "@/components/LevelComplete";
import { JsonLd } from "@/components/JsonLd";
import { LessonList } from "@/components/LessonList";
import { Constellation } from "@/components/Constellation";
import { MoonPhase } from "@/components/MoonPhase";
import { SaveOffline } from "@/components/Offline";
import { Faq } from "@/components/Faq";
import { pageSeo } from "@/content/seo";
import { courseDetails } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Params = { level: string };

export function generateStaticParams() {
  return levels.map((l) => ({ level: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const level = getLevel((await params).level);
  if (!level) return {};
  const seo = pageSeo[`/level/${level.id}`];
  const title = seo?.title ?? `Free ${level.name} AI Course: ${level.lessons.length} Short Lessons`;
  return {
    title,
    description: seo?.description ?? `${level.tagline} ${level.description}`,
    alternates: { canonical: `/level/${level.id}` },
    openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description: level.tagline, url: `/level/${level.id}` },
  };
}

export default async function LevelPage({ params }: { params: Promise<Params> }) {
  const level = getLevel((await params).level);
  if (!level) notFound();
  const url = absoluteUrl(`/level/${level.id}`);
  const seo = pageSeo[`/level/${level.id}`];
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              name: `${level.name} AI course`,
              description: level.description,
              url,
              educationalLevel: level.name,
              ...courseDetails(level.lessons.reduce((n, l) => n + l.minutes, 0)),
              hasPart: level.lessons.map((l) => ({
                "@type": "LearningResource",
                name: l.title,
                url: absoluteUrl(`/learn/${level.id}/${l.slug}`),
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Learn", item: absoluteUrl("/learn") },
                { "@type": "ListItem", position: 3, name: level.name, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="level-switch" aria-label="Levels">
        {levels.map((l) => (
          <Link key={l.id} href={`/level/${l.id}`} className={`pill ${l.id === level.id ? "active" : ""}`} aria-current={l.id === level.id ? "page" : undefined}>
            {l.name}
          </Link>
        ))}
      </nav>
      <header className={`level-head level-${level.id}`}>
        <MoonPhase level={level.id} size={48} />
        <h1>{level.name}</h1>
        <p className="level-tag">{level.tagline}</p>
        <p>{seo?.answer ?? level.description}</p>
        <Constellation levelId={level.id} lessonKeys={level.lessons.map((l) => lessonKey(level.id, l.slug))} />
      </header>
      <LessonList level={level} />
      <SaveOffline
        id={`level-${level.id}`}
        label={`the ${level.name} level`}
        urls={[`/level/${level.id}`, ...level.lessons.map((l) => `/learn/${level.id}/${l.slug}`)]}
      />
      <LevelComplete
        levelId={level.id}
        levelName={level.name}
        lessonKeys={level.lessons.map((l) => lessonKey(level.id, l.slug))}
        quizzes={allQuizzes.filter((q) => q.levelId === level.id)}
      />
      {seo && (
        <>
          <h2 className="section-title" style={{ marginTop: 48 }}>
            Questions about the {level.name.toLowerCase()} level
          </h2>
          <Faq faqs={seo.faqs} />
        </>
      )}
    </div>
  );
}
