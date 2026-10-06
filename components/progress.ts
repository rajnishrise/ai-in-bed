"use client";

import { useSyncExternalStore } from "react";

/** Reading progress lives only in this browser (localStorage). */
const KEY = "aib-progress-v1";

type Progress = { done: string[] };

let cache: Progress | null = null;
const listeners = new Set<() => void>();
const EMPTY: Progress = { done: [] };

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Progress) : { done: [] };
  } catch {
    cache = { done: [] };
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
  return () => listeners.delete(l);
}

export function useProgress() {
  const p = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    done: p.done,
    isDone: (key: string) => p.done.includes(key),
    markDone: (key: string) => {
      const cur = read();
      if (!cur.done.includes(key)) write({ done: [...cur.done, key] });
    },
    unmark: (key: string) => {
      const cur = read();
      write({ done: cur.done.filter((k) => k !== key) });
    },
    reset: () => write({ done: [] }),
  };
}
