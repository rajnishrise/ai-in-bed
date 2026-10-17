import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SaveOffline } from "@/components/Offline";
import { TrackPath } from "@/components/TrackPath";
import { getTrack, trackLessons, tracks } from "@/content/tracks";
import { courseDetails } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

type Params = { track: string };

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const t = getTrack((await params).track);
  if (!t) return {};
  return {
    title: `${t.name}: a free AI learning path`,
    description: `${t.tagline} ${t.description}`,
    alternates: { canonical: `/tracks/${t.id}` },
  };
}

export default async function TrackPage({ params }: { params: Promise<Params> }) {
  const t = getTrack((await params).track);
  if (!t) notFound();
  const steps = trackLessons(t);
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${t.name} (AI in Bed track)`,
          description: t.description,
          url: absoluteUrl(`/tracks/${t.id}`),
          ...courseDetails(steps.reduce((n, s) => n + s.lesson.minutes, 0)),
          hasPart: steps.map((s) => ({ "@type": "LearningResource", name: s.lesson.title, url: absoluteUrl(s.href) })),
        }}
      />
      <nav className="level-switch" aria-label="Tracks">
        {tracks.map((x) => (
          <Link key={x.id} href={`/tracks/${x.id}`} className={`pill ${x.id === t.id ? "active" : ""}`} aria-current={x.id === t.id ? "page" : undefined}>
            {x.name}
          </Link>
        ))}
      </nav>
      <p className="kicker">Track · {t.forWho}</p>
      <h1>{t.name}</h1>
      <p className="level-tag" style={{ color: "var(--gold)" }}>
        {t.tagline}
      </p>
      <p className="muted">{t.description}</p>
      <TrackPath
        trackId={t.id}
        steps={steps.map((s) => ({
          key: s.key,
          href: s.href,
          title: s.lesson.title,
          summary: s.lesson.summary,
          levelName: s.level.name,
          minutes: s.lesson.minutes,
        }))}
      />
      <SaveOffline id={`track-${t.id}`} label="this track" urls={[`/tracks/${t.id}`, ...steps.map((s) => s.href)]} />
    </div>
  );
}
