"use client";

import { track } from "@vercel/analytics";
import { Icon } from "./Icon";
import { useProgress } from "./progress";

/** One-tap lesson rating, sent as an anonymous analytics event. */
export function LessonFeedback({ lessonKey }: { lessonKey: string }) {
  const { progress, vote } = useProgress();
  const current = progress.votes[lessonKey];

  const send = (v: 1 | -1) => {
    if (current === v) return;
    vote(lessonKey, v);
    track("Lesson feedback", { lesson: lessonKey, vote: v === 1 ? "clear" : "confusing" });
  };

  return (
    <div className="feedback" role="group" aria-label="Rate this lesson">
      <span className="feedback-q">{current ? "Thanks, that helps us improve the lessons." : "Was this lesson clear?"}</span>
      <div className="feedback-btns">
        <button className={`feedback-btn ${current === 1 ? "on" : ""}`} onClick={() => send(1)} aria-pressed={current === 1}>
          <Icon name="thumbUp" size={17} /> Clear
        </button>
        <button className={`feedback-btn ${current === -1 ? "on" : ""}`} onClick={() => send(-1)} aria-pressed={current === -1}>
          <Icon name="thumbDown" size={17} /> Confusing
        </button>
      </div>
    </div>
  );
}
