import type { Metadata } from "next";
import Link from "next/link";
import { lessonRefs, levels, totalGraphics, totalLessons, totalQuizzes } from "@/content";
import { resources } from "@/content/resources";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { LevelMeter } from "@/components/LevelMeter";
import { LogoMark } from "@/components/Logo";
import { MoonPhase } from "@/components/MoonPhase";
import { Tonight } from "@/components/Tonight";
import { TrackGrid } from "@/components/TrackGrid";
import { tracks } from "@/content/tracks";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const how: { icon: IconName; title: string; text: string }[] = [
  { icon: "layers", title: "Ten minutes, one idea", text: "Each lesson is a short stack of cards you can finish before you fall asleep." },
  { icon: "picture", title: "See it, play with it", text: "Drawn and interactive explainers you can poke at until the idea clicks." },
  { icon: "repeat", title: "Remember it for good", text: "Quick checks come back on a spaced schedule, right before you would forget." },
  { icon: "book", title: "Go deeper, for free", text: "Each lesson links to the open courses, books and papers it builds on." },
];

const builtOn = ["3Blue1Brown", "fast.ai", "Stanford", "Hugging Face", "Google", "MIT", "Karpathy", "Distill"];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/"), description: SITE_DESCRIPTION },
            {
              "@type": "ItemList",
              itemListElement: levels.map((l, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Course",
                  name: `${l.name} AI`,
                  description: l.description,
                  url: absoluteUrl(`/level/${l.id}`),
                  provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
                  isAccessibleForFree: true,
                },
              })),
            },
          ],
        }}
      />
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="kicker">Free · Open-source · Made for phones</p>
            <h1>
              Understand AI, <em>one quiet night</em> at a time.
            </h1>
            <p className="lead">
              Calm, ten-minute lessons from first ideas to how frontier models work. Clear pictures, quick checks that
              stick, and the best free courses on the web when you want more.
            </p>
            <div className="hero-cta">
              <Link href="/learn/beginner/what-is-ai" className="btn btn-primary">
                Start learning <Icon name="arrow" size={18} />
              </Link>
              <Link href="#levels" className="btn btn-ghost">
                Browse levels
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden>
            <LogoMark size={260} />
          </div>
        </div>
        <div className="wrap">
          <ul className="stats">
            <li>
              <strong>{totalLessons}</strong> lessons
            </li>
            <li>
              <strong>{totalQuizzes}</strong> quick checks
            </li>
            <li>
              <strong>{totalGraphics}</strong> explainers
            </li>
            <li>
              <strong>{resources.length}</strong> free sources
            </li>
          </ul>
        </div>
      </section>

      <div className="wrap section">
        <Tonight lessons={lessonRefs} tracks={tracks.map(({ id, name, steps }) => ({ id, name, steps }))} />
      </div>

      <section id="levels" className="wrap section">
        <p className="kicker">Three levels</p>
        <h2 className="section-title">From first light to full moon</h2>
        <div className="level-grid">
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
      </section>

      <section className="wrap section">
        <p className="kicker">Tracks</p>
        <h2 className="section-title">Or follow a path for your goal</h2>
        <TrackGrid />
      </section>

      <section className="wrap section">
        <p className="kicker">How it works</p>
        <h2 className="section-title">Learning that fits in bed</h2>
        <ol className="how-grid">
          {how.map((h, i) => (
            <li key={h.title} className="how">
              <span className="how-top">
                <Icon name={h.icon} size={22} />
                <span className="how-n">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section">
        <div className="built-on">
          <p className="kicker">Built on the best free material</p>
          <p className="built-names">
            {builtOn.map((n, i) => (
              <span key={n}>
                {n}
                {i < builtOn.length - 1 && <span className="sep" aria-hidden> · </span>}
              </span>
            ))}
          </p>
          <Link href="/resources" className="text-link">
            Explore the Library <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
