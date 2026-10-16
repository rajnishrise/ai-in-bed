"use client";

import { useSyncExternalStore } from "react";

/**
 * Everything the site remembers lives only in this browser (localStorage):
 * finished lessons, nightly activity for the streak, spaced-review cards and
 * lesson feedback. Nothing is sent to a server.
 */
const KEY = "aib-progress-v1";

/** A quiz question in spaced review (Leitner boxes 0–5). */
export type Card = { box: number; due: string; seen: number; right: number };

type DayLog = { lessons: number; reviews: number };

export type Progress = {
  done: string[];
  log: Record<string, DayLog>;
  cards: Record<string, Card>;
  votes: Record<string, 1 | -1>;
  /** The learning track the home page follows, if any. */
  track?: string;
};

/** Days until a card is due again, by box. Box 0 means "again tonight". */
const INTERVALS = [0, 1, 3, 7, 14, 30];
export const MASTERED_BOX = 4;
export const DAILY_REVIEW_GOAL = 5;

const EMPTY: Progress = { done: [], log: {}, cards: {}, votes: {} };

let cache: Progress | null = null;
const listeners = new Set<() => void>();

/** Local calendar date, YYYY-MM-DD. */
export function today(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const p = raw ? (JSON.parse(raw) as Partial<Progress>) : {};
    cache = { done: p.done ?? [], log: p.log ?? {}, cards: p.cards ?? {}, votes: p.votes ?? {}, track: p.track };
  } catch {
    cache = { ...EMPTY };
  }
  return cache;
}

function write(p: Progress) {
  cache = p;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage blocked: keep progress in memory for this visit */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function bump(p: Progress, field: keyof DayLog): Progress["log"] {
  const d = today();
  const cur = p.log[d] ?? { lessons: 0, reviews: 0 };
  return { ...p.log, [d]: { ...cur, [field]: cur[field] + 1 } };
}

/** Consecutive nights with activity, counting tonight only once it happens. */
export function streakOf(p: Progress): number {
  let i = p.log[today()] ? 0 : -1;
  let n = 0;
  while (p.log[today(i)]) {
    n++;
    i--;
  }
  return n;
}

export function goalMet(p: Progress, date = today()): boolean {
  const d = p.log[date];
  return !!d && (d.lessons >= 1 || d.reviews >= DAILY_REVIEW_GOAL);
}

export function dueIds(p: Progress): string[] {
  const t = today();
  return Object.entries(p.cards)
    .filter(([, c]) => c.due <= t)
    .sort((a, b) => a[1].due.localeCompare(b[1].due) || a[1].box - b[1].box)
    .map(([id]) => id);
}

export function useProgress() {
  const p = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    progress: p,
    done: p.done,
    isDone: (key: string) => p.done.includes(key),
    markDone: (key: string) => {
      const cur = read();
      if (!cur.done.includes(key)) write({ ...cur, done: [...cur.done, key], log: bump(cur, "lessons") });
    },
    unmark: (key: string) => {
      const cur = read();
      write({ ...cur, done: cur.done.filter((k) => k !== key) });
    },
    /** Records a quiz answer and schedules the question for review. */
    recordAnswer: (id: string, correct: boolean, inReview: boolean) => {
      const cur = read();
      const old = cur.cards[id] ?? { box: 0, due: today(), seen: 0, right: 0 };
      const box = correct ? Math.min(old.box + 1, INTERVALS.length - 1) : 0;
      const card: Card = {
        box,
        due: today(INTERVALS[box]),
        seen: old.seen + 1,
        right: old.right + (correct ? 1 : 0),
      };
      write({
        ...cur,
        cards: { ...cur.cards, [id]: card },
        log: inReview ? bump(cur, "reviews") : cur.log,
      });
    },
    setTrack: (track: string | undefined) => {
      write({ ...read(), track });
    },
    vote: (key: string, v: 1 | -1) => {
      const cur = read();
      write({ ...cur, votes: { ...cur.votes, [key]: v } });
    },
  };
}
