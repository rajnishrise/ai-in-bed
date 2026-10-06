import Link from "next/link";
import { levels, totalLessons, totalQuizzes } from "@/content";
import { LevelMeter } from "@/components/LevelMeter";
import { resources } from "@/content/resources";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="stars" aria-hidden />
          <p className="eyebrow">Free · No sign-up · Made for phones</p>
          <h1>
            Learn AI <span className="grad">one cozy scroll</span> at a time.
          </h1>
          <p className="lead">
            Bite-sized lessons you can read under the duvet. Clear pictures, quick quizzes, and links to the best free
            courses on the internet when you want to go deeper.
          </p>
          <div className="hero-cta">
            <Link href="/learn/beginner/what-is-ai" className="btn btn-primary">
              Start the first lesson →
            </Link>
            <Link href="#levels" className="btn btn-ghost">
              Pick a level
            </Link>
          </div>
          <ul className="stats">
            <li>
              <strong>{totalLessons}</strong> lessons
            </li>
            <li>
              <strong>{totalQuizzes}</strong> quizzes
            </li>
            <li>
              <strong>20</strong> infographics
            </li>
            <li>
              <strong>{resources.length}</strong> open sources
            </li>
          </ul>
        </div>
      </section>

      <section id="levels" className="wrap section">
        <h2 className="section-title">Choose your level</h2>
        <div className="level-grid">
          {levels.map((level) => (
            <Link key={level.id} href={`/level/${level.id}`} className={`level-card level-${level.id}`}>
              <span className="level-emoji" aria-hidden>
                {level.emoji}
              </span>
              <span className="level-name">{level.name}</span>
              <span className="level-tag">{level.tagline}</span>
              <span className="level-desc">{level.description}</span>
              <span className="level-foot">
                {level.lessons.length} lessons · ~{level.lessons.reduce((n, l) => n + l.minutes, 0)} min
              </span>
              <LevelMeter level={level} />
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">How it works</h2>
        <div className="how-grid">
          <div className="how">
            <span aria-hidden>📱</span>
            <h3>Scroll, don&apos;t study</h3>
            <p>Every lesson is a stack of small cards. One idea per card, five minutes per lesson.</p>
          </div>
          <div className="how">
            <span aria-hidden>🖼️</span>
            <h3>See it, get it</h3>
            <p>Each lesson has a hand-drawn infographic that explains the idea at a glance.</p>
          </div>
          <div className="how">
            <span aria-hidden>🧩</span>
            <h3>Quick quizzes</h3>
            <p>Tap-to-answer questions keep you awake (just enough) and lock in what you read.</p>
          </div>
          <div className="how">
            <span aria-hidden>📚</span>
            <h3>Go deeper, for free</h3>
            <p>Every lesson links to the open courses, books and papers it builds on.</p>
          </div>
        </div>
      </section>
    </>
  );
}
