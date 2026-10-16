"use client";

import { Icon } from "./Icon";
import { useProgress } from "./progress";

export function CompleteButton({ lessonKey }: { lessonKey: string }) {
  const { isDone, markDone, unmark } = useProgress();
  const done = isDone(lessonKey);
  return (
    <button
      className={`btn ${done ? "btn-ghost" : "btn-primary"} btn-block`}
      onClick={() => (done ? unmark(lessonKey) : markDone(lessonKey))}
      aria-pressed={done}
    >
      {done ? (
        <>
          <Icon name="check" size={18} /> Finished · tap to undo
        </>
      ) : (
        "Mark as finished"
      )}
    </button>
  );
}
