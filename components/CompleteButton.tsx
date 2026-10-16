"use client";

import { Icon } from "./Icon";
import { useProgress } from "./progress";

/** Marks a lesson finished. `subtle` is the quiet text version shown under the next-lesson card. */
export function CompleteButton({ lessonKey, subtle = false }: { lessonKey: string; subtle?: boolean }) {
  const { isDone, markDone, unmark } = useProgress();
  const done = isDone(lessonKey);
  const toggle = () => (done ? unmark(lessonKey) : markDone(lessonKey));
  if (subtle) {
    return (
      <button type="button" className="complete-subtle" onClick={toggle} aria-pressed={done}>
        {done ? (
          <>
            <Icon name="check" size={15} /> Marked as finished · undo
          </>
        ) : (
          "Just mark as finished"
        )}
      </button>
    );
  }
  return (
    <button
      className={`btn ${done ? "btn-ghost" : "btn-primary"} btn-block`}
      onClick={toggle}
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
