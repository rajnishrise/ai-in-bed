"use client";

import Link from "next/link";
import { Icon } from "./Icon";
import { useProgress } from "./progress";

export type TrackStep = { key: string; href: string; title: string; summary: string; levelName: string; minutes: number };

/** A track drawn as a path of stops, with finished stops filled in. */
export function TrackPath({ trackId, steps }: { trackId: string; steps: TrackStep[] }) {
  const { isDone, progress, setTrack } = useProgress();
  const doneCount = steps.filter((s) => isDone(s.key)).length;
  const next = steps.find((s) => !isDone(s.key));
  const following = progress.track === trackId;
  return (
    <>
      <div className="track-actions">
        {next ? (
          <Link href={next.href} className="btn btn-primary">
            {doneCount ? "Continue" : "Start"}: {next.title} <Icon name="arrow" size={18} />
          </Link>
        ) : (
          <span className="btn btn-ghost">Track complete</span>
        )}
        <button className="btn btn-ghost" onClick={() => setTrack(following ? undefined : trackId)} aria-pressed={following}>
          {following ? (
            <>
              <Icon name="check" size={17} /> Following
            </>
          ) : (
            "Follow on home page"
          )}
        </button>
      </div>
      <p className="muted small">
        {doneCount} of {steps.length} finished
      </p>
      <ol className="track-path">
        {steps.map((s, i) => {
          const done = isDone(s.key);
          const isNext = s === next;
          return (
            <li key={s.key} className={`${done ? "done" : ""} ${isNext ? "next" : ""}`}>
              <span className="stop" aria-hidden>
                {done ? <Icon name="check" size={14} /> : i + 1}
              </span>
              <Link href={s.href} className="stop-body">
                <span className="stop-meta">
                  {s.levelName} · {s.minutes} min{isNext ? " · up next" : ""}
                </span>
                <span className="stop-title">{s.title}</span>
                <span className="stop-summary">{s.summary}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export function TrackMeter({ steps }: { steps: string[] }) {
  const { isDone } = useProgress();
  const n = steps.filter(isDone).length;
  return (
    <div className="meter" aria-label={`${n} of ${steps.length} lessons finished`}>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${(n / steps.length) * 100}%` }} />
      </div>
      <span className="meter-label">
        {n}/{steps.length}
      </span>
    </div>
  );
}
