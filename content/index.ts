import { advanced } from "./advanced";
import { beginner } from "./beginner";
import { intermediate } from "./intermediate";
import type { Lesson, Level, LevelId } from "./types";

export const levels: Level[] = [beginner, intermediate, advanced];

export function getLevel(id: string): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getLesson(
  levelId: string,
  slug: string,
): { level: Level; lesson: Lesson; index: number } | undefined {
  const level = getLevel(levelId);
  if (!level) return undefined;
  const index = level.lessons.findIndex((l) => l.slug === slug);
  if (index === -1) return undefined;
  return { level, lesson: level.lessons[index], index };
}

/** The lesson after this one, crossing into the next level when needed. */
export function nextLesson(
  levelId: LevelId,
  slug: string,
): { level: Level; lesson: Lesson } | undefined {
  const li = levels.findIndex((l) => l.id === levelId);
  const level = levels[li];
  const i = level.lessons.findIndex((l) => l.slug === slug);
  if (i + 1 < level.lessons.length) return { level, lesson: level.lessons[i + 1] };
  const nextLevel = levels[li + 1];
  if (nextLevel) return { level: nextLevel, lesson: nextLevel.lessons[0] };
  return undefined;
}

export function lessonKey(levelId: string, slug: string) {
  return `${levelId}/${slug}`;
}

export const totalLessons = levels.reduce((n, l) => n + l.lessons.length, 0);
export const totalQuizzes = levels.reduce(
  (n, l) =>
    n + l.lessons.reduce((m, s) => m + s.blocks.filter((b) => b.kind === "quiz").length, 0),
  0,
);

export type QuizItem = {
  id: string;
  levelId: LevelId;
  levelName: string;
  slug: string;
  lessonTitle: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

/** Stable id for the nth (1-based) quiz in a lesson. */
export const quizId = (levelId: string, slug: string, n: number) => `${levelId}/${slug}#${n}`;

/** Every quiz on the site, in reading order. Used by review mode. */
export const allQuizzes: QuizItem[] = levels.flatMap((level) =>
  level.lessons.flatMap((lesson) => {
    let n = 0;
    return lesson.blocks.flatMap((b) =>
      b.kind === "quiz"
        ? [
            {
              id: quizId(level.id, lesson.slug, ++n),
              levelId: level.id,
              levelName: level.name,
              slug: lesson.slug,
              lessonTitle: lesson.title,
              question: b.question,
              options: b.options,
              answer: b.answer,
              explain: b.explain,
            },
          ]
        : [],
    );
  }),
);

export type LessonRef = {
  key: string;
  href: string;
  title: string;
  summary: string;
  minutes: number;
  levelId: LevelId;
  levelName: string;
  number: number;
};

/** All lessons in reading order, flattened for "tonight's pick". */
export const lessonRefs: LessonRef[] = levels.flatMap((level) =>
  level.lessons.map((lesson, i) => ({
    key: lessonKey(level.id, lesson.slug),
    href: `/learn/${level.id}/${lesson.slug}`,
    title: lesson.title,
    summary: lesson.summary,
    minutes: lesson.minutes,
    levelId: level.id,
    levelName: level.name,
    number: i + 1,
  })),
);

export const totalGraphics = levels.reduce(
  (n, l) => n + l.lessons.reduce((m, s) => m + s.blocks.filter((b) => b.kind === "figure").length, 0),
  0,
);

/** Strips a leading emoji (card titles were written with one). */
export const stripEmoji = (s: string) =>
  s.replace(/^(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*|\d️?⃣)\s*/u, "");
