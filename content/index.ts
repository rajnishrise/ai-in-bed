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
