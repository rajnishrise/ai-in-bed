"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { QuizItem } from "@/content";
import { Icon } from "./Icon";
import { MASTERED_BOX, dueIds, useProgress } from "./progress";
import { QuizOptions } from "./Quiz";
import { RichText } from "./RichText";

const QUICK_FIRE = 5;

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Session = { queue: QuizItem[]; i: number; right: number; total: number; retried: Set<string> };

/** Spaced review: questions you answered in lessons come back on a schedule. */
export function Review({ quizzes }: { quizzes: QuizItem[] }) {
  const { progress, recordAnswer } = useProgress();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => setReady(true), []);

  const byId = new Map(quizzes.map((q) => [q.id, q]));
  const due = dueIds(progress).flatMap((id) => byId.get(id) ?? []);
  const cards = Object.entries(progress.cards).filter(([id]) => byId.has(id));
  const mastered = cards.filter(([, c]) => c.box >= MASTERED_BOX).length;

  const start = (queue: QuizItem[]) => {
    setPicked(null);
    setSession({ queue, i: 0, right: 0, total: queue.length, retried: new Set() });
  };

  const quickFire = () => {
    const finished = new Set(progress.done);
    const pool = quizzes.filter((q) => finished.has(`${q.levelId}/${q.slug}`));
    start(shuffle(pool.length >= QUICK_FIRE ? pool : quizzes).slice(0, QUICK_FIRE));
  };

  if (!ready) return <div className="review-shell" aria-busy="true" />;

  if (session && session.i < session.queue.length) {
    const q = session.queue[session.i];
    const answered = picked !== null;
    const correct = picked === q.answer;
    const pick = (i: number) => {
      setPicked(i);
      const ok = i === q.answer;
      recordAnswer(q.id, ok, true);
      setSession((s) => {
        if (!s) return s;
        const next = { ...s, right: s.right + (ok && !s.retried.has(q.id) ? 1 : 0) };
        // A missed question comes back once at the end of the session.
        if (!ok && !s.retried.has(q.id)) {
          next.queue = [...s.queue, q];
          next.retried = new Set(s.retried).add(q.id);
        }
        return next;
      });
    };
    const advance = () => {
      setPicked(null);
      setSession((s) => s && { ...s, i: s.i + 1 });
    };
    return (
      <div className="review-shell">
        <div className="review-progress" aria-label={`Question ${session.i + 1} of ${session.queue.length}`}>
          <div style={{ width: `${(session.i / session.queue.length) * 100}%` }} />
        </div>
        <section className={`quiz review-card ${answered ? (correct ? "is-right" : "is-wrong") : ""}`}>
          <div className="quiz-tag">
            {q.levelName} · {q.lessonTitle}
          </div>
          <p className="quiz-q">
            <RichText text={q.question} />
          </p>
          <QuizOptions key={`${q.id}-${session.i}`} options={q.options} answer={q.answer} picked={picked} onPick={pick} />
          {answered && (
            <div className="quiz-feedback" role="status">
              <strong>{correct ? "Correct." : "Not quite."}</strong> <RichText text={q.explain} />
            </div>
          )}
        </section>
        {answered && (
          <button className="btn btn-primary btn-block" onClick={advance} autoFocus>
            {session.i + 1 < session.queue.length ? "Next question" : "Finish"} <Icon name="arrow" size={18} />
          </button>
        )}
        <p className="muted small center">
          <Link href={`/learn/${q.levelId}/${q.slug}`}>Reread this lesson</Link>
        </p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="review-shell center">
        <p className="kicker">Session complete</p>
        <h2 className="review-done">
          {session.right} of {session.total} right first time
        </h2>
        <p className="lead">Each question will come back when you are about to forget it. That is what makes it stick.</p>
        <div className="row-btns">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <button className="btn btn-ghost" onClick={quickFire}>
            {QUICK_FIRE} more questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-shell">
      <dl className="review-stats">
        <div>
          <dt>Due now</dt>
          <dd>{due.length}</dd>
        </div>
        <div>
          <dt>In review</dt>
          <dd>{cards.length}</dd>
        </div>
        <div>
          <dt>Mastered</dt>
          <dd>{mastered}</dd>
        </div>
      </dl>
      {due.length ? (
        <button className="btn btn-primary btn-block" onClick={() => start(due)}>
          Review {due.length} question{due.length === 1 ? "" : "s"} <Icon name="arrow" size={18} />
        </button>
      ) : (
        <div className="empty-note">
          <p>
            {cards.length
              ? "You are all caught up. Questions come back after 1, 3, 7, 14 and 30 days as you keep getting them right."
              : "Nothing to review yet. Every quick check you answer in a lesson is saved here and scheduled to come back just before you would forget it."}
          </p>
        </div>
      )}
      <button className="btn btn-ghost btn-block" onClick={quickFire}>
        Quick-fire: {QUICK_FIRE} random questions
      </button>
    </div>
  );
}
