"use client";

import Link from "next/link";
import type { Level } from "@/content/types";
import { Icon } from "./Icon";
import { useProgress } from "./progress";

export function LessonList({ level }: { level: Level }) {
  const { isDone } = useProgress();
  return (
    <ol className="lesson-list">
      {level.lessons.map((lesson, i) => {
        const done = isDone(`${level.id}/${lesson.slug}`);
        const quizzes = lesson.blocks.filter((b) => b.kind === "quiz").length;
        return (
          <li key={lesson.slug}>
            <Link href={`/learn/${level.id}/${lesson.slug}`} className={`lesson-row ${done ? "done" : ""}`}>
              <span className="lesson-num" aria-hidden>
                {done ? <Icon name="check" size={16} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span className="lesson-body">
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-summary">{lesson.summary}</span>
                <span className="lesson-meta">
                  {lesson.minutes} min · {quizzes} quick check{quizzes === 1 ? "" : "s"}
                  {done ? " · finished" : ""}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
