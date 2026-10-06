import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLevel, levels } from "@/content";
import { LessonList } from "@/components/LessonList";
import { LevelMeter } from "@/components/LevelMeter";

type Params = { level: string };

export function generateStaticParams() {
  return levels.map((l) => ({ level: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const level = getLevel((await params).level);
  return level ? { title: `${level.name} lessons`, description: level.description } : {};
}

export default async function LevelPage({ params }: { params: Promise<Params> }) {
  const level = getLevel((await params).level);
  if (!level) notFound();
  return (
    <div className="wrap narrow section">
      <div className="level-switch" role="tablist" aria-label="Levels">
        {levels.map((l) => (
          <Link key={l.id} href={`/level/${l.id}`} className={`pill ${l.id === level.id ? "active" : ""}`} role="tab" aria-selected={l.id === level.id}>
            {l.emoji} {l.name}
          </Link>
        ))}
      </div>
      <header className={`level-head level-${level.id}`}>
        <span className="level-emoji big" aria-hidden>
          {level.emoji}
        </span>
        <h1>{level.name}</h1>
        <p className="level-tag">{level.tagline}</p>
        <p>{level.description}</p>
        <LevelMeter level={level} />
      </header>
      <LessonList level={level} />
    </div>
  );
}
