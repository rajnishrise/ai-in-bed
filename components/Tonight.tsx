"use client";

import Link from "next/link";
import type { LessonRef } from "@/content";
import { Icon } from "./Icon";
import { DAILY_REVIEW_GOAL, dueIds, goalMet, streakOf, today, useProgress } from "./progress";

const DAY = ["S", "M", "T", "W", "T", "F", "S"];

/** Home-page panel: streak, the past week, tonight's lesson and due reviews. */
export function Tonight({ lessons, tracks }: { lessons: LessonRef[]; tracks: { id: string; name: string; steps: string[] }[] }) {
  const { progress, isDone } = useProgress();
  const streak = streakOf(progress);
  const met = goalMet(progress);
  const due = dueIds(progress).length;
  const track = tracks.find((t) => t.id === progress.track);
  const byKey = new Map(lessons.map((l) => [l.key, l]));
  const trackNext = track?.steps.map((k) => byKey.get(k)!).find((l) => l && !isDone(l.key));
  const next = trackNext ?? lessons.find((l) => !isDone(l.key));
  const started = progress.done.length > 0 || Object.keys(progress.cards).length > 0;
  const tonightLog = progress.log[today()];

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = today(i - 6);
    const d = new Date(`${date}T12:00:00`);
    return { date, label: DAY[d.getDay()], active: !!progress.log[date], isToday: i === 6 };
  });

  return (
    <section className="tonight" aria-labelledby="tonight-title">
      <div className="tonight-head">
        <div>
          <p className="kicker">Tonight</p>
          <h2 id="tonight-title">{started ? (met ? "Goal met. Sleep well." : "Your nightly ten minutes") : "Start your first night"}</h2>
        </div>
        <div className="streak" aria-label={`${streak}-night streak`}>
          <Icon name="flame" size={18} />
          <strong>{streak}</strong>
          <span>night{streak === 1 ? "" : "s"}</span>
        </div>
      </div>

      <ol className="week" aria-label="The last seven nights">
        {week.map((d) => (
          <li key={d.date} className={`${d.active ? "on" : ""} ${d.isToday ? "today" : ""}`}>
            <span className="dot">{d.active && <Icon name="check" size={12} />}</span>
            <span className="day">{d.label}</span>
            <span className="visually-hidden">{d.active ? "active" : "no activity"}</span>
          </li>
        ))}
      </ol>

      <div className="tonight-grid">
        {next ? (
          <Link href={next.href} className="pick">
            <span className="pick-kicker">
              {trackNext ? `${track!.name} track` : started ? "Tonight's lesson" : "Begin here"} · {next.levelName} {next.number}
            </span>
            <span className="pick-title">{next.title}</span>
            <span className="pick-summary">{next.summary}</span>
            <span className="pick-foot">
              <Icon name="clock" size={15} /> {next.minutes} min <Icon name="arrow" size={16} className="push" />
            </span>
          </Link>
        ) : (
          <Link href="/resources" className="pick">
            <span className="pick-kicker">All lessons finished</span>
            <span className="pick-title">Go deeper in the Library</span>
            <span className="pick-summary">You have read every lesson. The free courses and books behind them are the next step.</span>
            <span className="pick-foot">
              Open the Library <Icon name="arrow" size={16} className="push" />
            </span>
          </Link>
        )}
        <Link href="/review" className="review-tile">
          <span className="pick-kicker">Review</span>
          <span className="review-num">{due}</span>
          <span className="pick-summary">
            {due
              ? `question${due === 1 ? "" : "s"} ready to revisit`
              : started
                ? "Nothing due. Answered questions come back here on a schedule."
                : "Answer quick checks in lessons and they come back here to stick."}
          </span>
        </Link>
      </div>
      <p className="goal">
        <span className={`goal-dot ${met ? "on" : ""}`} aria-hidden />
        Nightly goal: finish one lesson or review {DAILY_REVIEW_GOAL} questions.
        {tonightLog && !met ? ` ${tonightLog.reviews} reviewed so far.` : ""}
      </p>
    </section>
  );
}
