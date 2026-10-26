import { lessonKey, levels } from ".";
import type { Lesson, Level } from "./types";

/**
 * The 30-day plan: every lesson in reading order, packed into evenings of
 * similar length, with a review night closing each week and a last night for
 * choosing what to learn next.
 */
export type PlanLesson = { key: string; href: string; title: string; minutes: number; levelName: string };

export type PlanDay =
  | { day: number; kind: "lessons"; levelName: string; lessons: PlanLesson[]; minutes: number }
  | { day: number; kind: "review"; title: string; text: string; href: string; minutes: number }
  | { day: number; kind: "finish"; title: string; text: string; href: string; minutes: number };

export const PLAN_DAYS = 30;
const REVIEW_DAYS = [7, 14, 21, 28];

/** Evenings given to each level (25 lesson nights in all). */
const NIGHTS: Record<Level["id"], number> = { beginner: 8, intermediate: 8, advanced: 9 };

/** Splits lessons, in order, into `k` runs whose longest evening is as short as possible. */
function partition(lessons: Lesson[], k: number): Lesson[][] {
  const n = lessons.length;
  const pre = [0];
  for (const l of lessons) pre.push(pre[pre.length - 1] + l.minutes);
  const cost = (i: number, j: number) => pre[j] - pre[i];
  // best[d][j]: the smallest possible longest evening when the first j lessons fill d evenings.
  const best = Array.from({ length: k + 1 }, () => Array(n + 1).fill(Infinity));
  const cut = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
  best[0][0] = 0;
  for (let d = 1; d <= k; d++)
    for (let j = d; j <= n; j++)
      for (let i = d - 1; i < j; i++) {
        const v = Math.max(best[d - 1][i], cost(i, j));
        if (v < best[d][j]) {
          best[d][j] = v;
          cut[d][j] = i;
        }
      }
  const out: Lesson[][] = [];
  for (let d = k, j = n; d > 0; d--) {
    const i = cut[d][j];
    out.unshift(lessons.slice(i, j));
    j = i;
  }
  return out;
}

function buildPlan(): PlanDay[] {
  const evenings = levels.flatMap((level) =>
    partition(level.lessons, NIGHTS[level.id]).map((group) => ({
      levelName: level.name,
      lessons: group.map((l) => ({
        key: lessonKey(level.id, l.slug),
        href: `/learn/${level.id}/${l.slug}`,
        title: l.title,
        minutes: l.minutes,
        levelName: level.name,
      })),
    })),
  );
  const days: PlanDay[] = [];
  for (let day = 1; day <= PLAN_DAYS; day++) {
    if (REVIEW_DAYS.includes(day)) {
      days.push({
        day,
        kind: "review",
        title: "Review night",
        text: "No new lesson. Answer tonight's spaced-review questions so this week's ideas stick.",
        href: "/review",
        minutes: 10,
      });
    } else if (day === PLAN_DAYS) {
      days.push({
        day,
        kind: "finish",
        title: "Final check and what's next",
        text: "Take the Advanced final check, then pick a longer free course for the next month.",
        href: "/free-ai-courses",
        minutes: 15,
      });
    } else {
      const e = evenings.shift()!;
      days.push({ day, kind: "lessons", ...e, minutes: e.lessons.reduce((n, l) => n + l.minutes, 0) });
    }
  }
  return days;
}

export const plan = buildPlan();

export const planMinutes = plan.reduce((n, d) => n + d.minutes, 0);
