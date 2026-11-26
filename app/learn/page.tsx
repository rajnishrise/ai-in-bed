import type { Metadata } from "next";
import Link from "next/link";
import { levels, totalLessons } from "@/content";
import { tracks } from "@/content/tracks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LevelMeter } from "@/components/LevelMeter";
import { MoonPhase } from "@/components/MoonPhase";
import { TrackGrid } from "@/components/TrackGrid";
import { breadcrumbs, courseDetails, publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const title = `Learn AI: ${totalLessons} Free Lessons, Beginner to Advanced`;
const description = `Every AI in Bed lesson in one place: ${totalLessons} free ten-minute AI lessons in three levels, from what AI is to how LLMs, RAG and agents work, plus guided tracks and a 30-day plan.`;

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/learn" },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description, url: "/learn" },
};

/** The Learn section's front page: every level and lesson, so "Learn" has one home in the site structure. */
export default function LearnPage() {
  const url = absoluteUrl("/learn");
  return (
    <div className="wrap section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: title,
              description,
              url,
              inLanguage: "en",
              isPartOf: { "@id": absoluteUrl("/#website") },
              publisher,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: levels.map((l, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Course",
                    name: `${l.name} AI course`,
                    description: l.description,
                    url: absoluteUrl(`/level/${l.id}`),
                    educationalLevel: l.name,
                    ...courseDetails(l.lessons.reduce((n, s) => n + s.minutes, 0)),
                  },
                })),
              },
            },
            breadcrumbs(["Learn", "/learn"]),
          ],
        }}
      />
      <p className="kicker">Learn</p>
      <h1>Learn AI, one short lesson at a time</h1>
      <p className="lead" style={{ maxWidth: "40rem" }}>
        {totalLessons} free lessons in three levels. Each takes about ten minutes, with pictures and quick checks. Start
        at Beginner, or jump to the level that fits you.
      </p>

      <div className="level-grid" style={{ marginTop: 28 }}>
        {levels.map((level) => (
          <Link key={level.id} href={`/level/${level.id}`} className={`level-card level-${level.id}`}>
            <MoonPhase level={level.id} />
            <span className="level-name">{level.name}</span>
            <span className="level-tag">{level.tagline}</span>
            <span className="level-desc">{level.description}</span>
            <span className="level-foot">
              {level.lessons.length} lessons · about {level.lessons.reduce((n, l) => n + l.minutes, 0)} min
            </span>
            <LevelMeter level={level} />
          </Link>
        ))}
      </div>

      <section className="section">
        <p className="kicker">Tracks</p>
        <h2 className="section-title">Or follow a path for your goal</h2>
        <TrackGrid />
        <Link href="/learn-ai-in-30-days" className="text-link" style={{ marginTop: 18, display: "inline-flex" }}>
          Or learn everything in 30 nights with the free plan <Icon name="arrow" size={16} />
        </Link>
      </section>

      <section style={{ maxWidth: "44rem" }}>
        <h2 className="section-title">Every lesson</h2>
        {levels.map((level) => (
          <div key={level.id} style={{ marginTop: 28 }}>
            <h3>
              <Link href={`/level/${level.id}`}>{level.name}</Link>
            </h3>
            <ul className="link-list">
              {level.lessons.map((l) => (
                <li key={l.slug}>
                  <Link href={`/learn/${level.id}/${l.slug}`}>
                    <span>{l.title}</span>
                    <span className="muted">{l.minutes} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="muted" style={{ marginTop: 28 }}>
          {tracks.length} tracks, {levels.length} levels, all free with no sign-up. Your progress stays in your browser.
        </p>
      </section>
    </div>
  );
}
