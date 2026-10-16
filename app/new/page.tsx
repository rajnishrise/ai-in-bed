import type { Metadata } from "next";
import Link from "next/link";
import { getLesson } from "@/content";
import { releases } from "@/content/changelog";

export const metadata: Metadata = {
  title: "What's new",
  description: "New lessons and features on AI in Bed, newest first.",
  alternates: { canonical: "/new" },
};

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function WhatsNewPage() {
  return (
    <div className="wrap narrow section">
      <p className="kicker">Changelog</p>
      <h1>What&apos;s new</h1>
      <p className="lead">New lessons and features, newest first.</p>
      {releases.map((r) => (
        <section key={r.title} className="release">
          <time dateTime={r.date}>{fmt(r.date)}</time>
          <h2>{r.title}</h2>
          <ul>
            {r.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          {r.lessons.length > 0 && (
            <ul className="release-lessons">
              {r.lessons.map((key) => {
                const [lv, slug] = key.split("/");
                const found = getLesson(lv, slug);
                if (!found) return null;
                return (
                  <li key={key}>
                    <Link href={`/learn/${key}`}>
                      <span>{found.lesson.title}</span>
                      <span className="muted">
                        {found.level.name} · {found.lesson.minutes} min
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
