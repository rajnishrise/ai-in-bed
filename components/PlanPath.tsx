"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PlanDay } from "@/content/plan";
import { Icon } from "./Icon";
import { today, useProgress } from "./progress";

const dayDone = (d: PlanDay, isDone: (k: string) => boolean) => d.kind === "lessons" && d.lessons.every((l) => isDone(l.key));

/** The 30 nights as a path, with finished nights filled in from this browser's progress. */
export function PlanPath({ days }: { days: PlanDay[] }) {
  const { isDone } = useProgress();
  const next = days.find((d) => d.kind === "lessons" && !dayDone(d, isDone));
  const nextLesson = next?.kind === "lessons" ? next.lessons.find((l) => !isDone(l.key)) : undefined;
  const doneNights = days.filter((d) => dayDone(d, isDone)).length;
  const lessonNights = days.filter((d) => d.kind === "lessons").length;
  const weeks = [days.slice(0, 7), days.slice(7, 14), days.slice(14, 21), days.slice(21, 28), days.slice(28)];

  return (
    <>
      <div className="track-actions">
        {nextLesson ? (
          <Link href={nextLesson.href} className="btn btn-primary">
            {doneNights ? `Continue with day ${next!.day}` : "Start day 1"} <Icon name="arrow" size={18} />
          </Link>
        ) : (
          <span className="btn btn-ghost">Every lesson night done</span>
        )}
      </div>
      <p className="muted small">
        {doneNights} of {lessonNights} lesson nights finished
      </p>
      {weeks.map((week, w) => (
        <section key={w} className="plan-week">
          <h2 className="section-title">{w < 4 ? `Week ${w + 1}` : "The last two nights"}</h2>
          <ol className="track-path">
            {week.map((d) => {
              const done = dayDone(d, isDone);
              const isNext = d === next;
              return (
                <li key={d.day} id={`day-${d.day}`} className={`${done ? "done" : ""} ${isNext ? "next" : ""}`}>
                  <span className="stop" aria-hidden>
                    {done ? <Icon name="check" size={14} /> : d.day}
                  </span>
                  <div className="stop-body">
                    <span className="stop-meta">
                      Day {d.day} · {d.kind === "lessons" ? d.levelName : d.title} · {d.minutes} min
                      {isNext ? " · tonight" : ""}
                    </span>
                    {d.kind === "lessons" ? (
                      <ul className="plan-lessons">
                        {d.lessons.map((l) => (
                          <li key={l.key}>
                            <Link href={l.href} className={isDone(l.key) ? "is-done" : undefined}>
                              {l.title}
                            </Link>
                            <span className="muted"> · {l.minutes} min</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <Link href={d.href} className="stop-title">
                          {d.kind === "review" ? "Open tonight's review" : "Choose your next course"}
                        </Link>
                        <span className="stop-summary">{d.text}</span>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </>
  );
}

/* ---------- Calendar file ---------- */

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** iCalendar lines must be folded at 75 octets; continuation lines start with a space. */
function fold(line: string) {
  const out: string[] = [];
  let rest = line;
  // 60 characters leaves room for multi-byte characters like "·".
  while (rest.length > 60) {
    out.push(rest.slice(0, 60));
    rest = " " + rest.slice(60);
  }
  out.push(rest);
  return out.join("\r\n");
}

const stamp = (d: Date) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;

function calendar(days: PlanDay[], start: string, time: string, origin: string) {
  const [y, m, dd] = start.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const now = new Date();
  const utc = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AI in Bed//30-day AI plan//EN", "CALSCALE:GREGORIAN", "X-WR-CALNAME:Learn AI in 30 days"];
  for (const d of days) {
    // Floating local time: the reminder stays at the chosen hour wherever you are.
    const at = new Date(y, m - 1, dd + d.day - 1, hh, mm);
    const what = d.kind === "lessons" ? d.lessons.map((l) => l.title).join(" + ") : d.title;
    const links = d.kind === "lessons" ? d.lessons.map((l) => `${l.title}: ${origin}${l.href}`) : [`${d.text} ${origin}${d.href}`];
    lines.push(
      "BEGIN:VEVENT",
      `UID:aib-30-day-${start}-${d.day}@aiinbed`,
      `DTSTAMP:${utc}`,
      `DTSTART:${stamp(at)}`,
      `DURATION:PT${d.minutes}M`,
      fold(`SUMMARY:${esc(`AI in Bed · Day ${d.day}: ${what}`)}`),
      fold(`DESCRIPTION:${esc(links.join("\n"))}`),
      `URL:${origin}/learn-ai-in-30-days#day-${d.day}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Tonight's AI lesson",
      "TRIGGER:PT0M",
      "END:VALARM",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

/** Downloads the plan as a calendar file, one reminder a night, made entirely in the browser. */
export function PlanCalendar({ days }: { days: PlanDay[] }) {
  const [start, setStart] = useState("");
  // Set after mount: the server doesn't know the reader's date.
  useEffect(() => setStart(today(1)), []);
  const [time, setTime] = useState("21:30");
  const download = () => {
    const blob = new Blob([calendar(days, start, time, window.location.origin)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "learn-ai-in-30-days.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div className="plan-calendar">
      <p className="term-label">Add it to your calendar</p>
      <p className="muted small">One reminder a night with tonight&apos;s lessons. Works with Google, Apple and Outlook calendars.</p>
      <div className="plan-calendar-row">
        <label>
          <span>Start</span>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
        </label>
        <label>
          <span>Time</span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <button type="button" className="btn btn-ghost" onClick={download} disabled={!start || !time}>
          <Icon name="download" size={17} /> Calendar file
        </button>
      </div>
    </div>
  );
}
