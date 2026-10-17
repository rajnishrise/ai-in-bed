import type { Metadata } from "next";
import Link from "next/link";
import { levels, totalLessons } from "@/content";
import { coursesFaqs } from "@/content/faq";
import { resources, type Resource } from "@/content/resources";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { lastUpdated, publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const year = lastUpdated.slice(0, 4);
const title = `The Best Free AI Courses in ${year}, for Every Level`;
const description =
  "A hand-picked guide to the best free AI courses online: for beginners with no coding, for using AI at work, and for machine learning, deep learning and LLMs. Includes free courses with certificates.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/free-ai-courses" },
  openGraph: { siteName: SITE_NAME, type: "article", locale: "en", title, description, url: "/free-ai-courses" },
};

type Pick = { for: string; title: string; href: string; by: string; why: string; ours?: boolean };

const byTitle = (t: string) => resources.find((r) => r.title === t)!;
const ext = (t: string, forWho: string, why: string): Pick => {
  const r = byTitle(t);
  return { for: forWho, title: r.title, href: r.url, by: r.by, why };
};

const picks: Pick[] = [
  {
    for: "Complete beginners, no maths",
    title: "AI in Bed: Beginner level",
    href: "/level/beginner",
    by: SITE_NAME,
    why: "Ten-minute lessons on a phone, with pictures, quick quizzes and spaced review. No sign-up.",
    ours: true,
  },
  ext("Elements of AI", "Beginners who want a certificate", "A longer, gentle course from the University of Helsinki with a free certificate."),
  {
    for: "Using AI at work",
    title: "AI in Bed: AI at work track",
    href: "/tracks/ai-at-work",
    by: SITE_NAME,
    why: "Picking the right tasks, prompting well, checking output and knowing the limits.",
    ours: true,
  },
  ext("Machine Learning Crash Course", "Your first hands-on machine learning", "Google's practical course with interactive exercises. Openly licensed."),
  ext("Practical Deep Learning for Coders", "Coders who want to build models", "fast.ai's top-down course: you train real models from the first lesson."),
  ext("Neural Networks video series", "Visual intuition", "3Blue1Brown's animations make neural networks and transformers click."),
  ext("Neural Networks: Zero to Hero", "Understanding LLMs from scratch", "Andrej Karpathy builds backpropagation, then a GPT, in plain Python."),
  ext("Hugging Face LLM Course", "Building with LLMs", "Transformers, tokenisers, fine-tuning and LLM apps with open tools."),
];

const LEVELS: Resource["level"][] = ["Beginner", "Intermediate", "Advanced"];
const courseLike = resources.filter((r) => r.format === "Course" || r.format === "Video" || r.format === "Book");

export default function FreeAiCoursesPage() {
  const url = absoluteUrl("/free-ai-courses");
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: title,
              description,
              url,
              datePublished: lastUpdated,
              dateModified: lastUpdated,
              author: publisher,
              publisher,
              inLanguage: "en",
            },
            {
              "@type": "ItemList",
              name: `Best free AI courses (${year})`,
              itemListElement: picks.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: p.href.startsWith("/") ? absoluteUrl(p.href) : p.href,
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Free AI courses", item: url },
              ],
            },
          ],
        }}
      />
      <p className="kicker">Guide · Updated {year}</p>
      <h1>The best free AI courses, for every level</h1>
      <p className="lead">
        You can learn artificial intelligence without paying anything. These are the free AI courses we trust most,
        picked by goal, from a first look at what AI is to building large language models. Every one is free to
        study online.
      </p>

      <h2 className="section-title" style={{ marginTop: 40 }}>
        Our picks by goal
      </h2>
      <ol className="course-picks">
        {picks.map((p) => (
          <li key={p.title} className={`course-pick ${p.ours ? "ours" : ""}`}>
            <p className="pick-for">{p.for}</p>
            <h3>
              {p.href.startsWith("/") ? (
                <Link href={p.href}>{p.title}</Link>
              ) : (
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {p.title} <Icon name="external" size={14} />
                </a>
              )}
            </h3>
            <p>
              {p.by} · {p.why}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        A free AI course in ten-minute lessons
      </h2>
      <p>
        {SITE_NAME} turns the material below into {totalLessons} short lessons you can read in bed: three levels, each
        ending in a final check, plus tracks for a goal. It&apos;s a friendly first step before the longer courses.
      </p>
      <ul className="lesson-ul">
        {levels.map((l) => (
          <li key={l.id}>
            <Link href={`/level/${l.id}`}>
              Free {l.name.toLowerCase()} AI course
            </Link>{" "}
            · {l.lessons.length} lessons · {l.tagline}
          </li>
        ))}
      </ul>

      {LEVELS.map((lv) => (
        <section key={lv}>
          <h2 className="section-title" style={{ marginTop: 48 }}>
            Free {lv.toLowerCase()} AI courses
          </h2>
          <ul className="res-list">
            {courseLike
              .filter((r) => r.level === lv)
              .map((r) => (
                <li key={r.url} className="res">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="res-title">
                    {r.title} <Icon name="external" size={14} />
                  </a>
                  <span className="res-meta">
                    <span className="chip">{r.format}</span>
                    {r.license && <span className="chip chip-soft">{r.license}</span>}
                    <span className="muted">{r.by}</span>
                  </span>
                  <span className="res-blurb">{r.blurb}</span>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <p className="muted" style={{ marginTop: 24 }}>
        Looking for articles, papers and interactive tools too? The <Link href="/resources">Library</Link> has all{" "}
        {resources.length}.
      </p>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        Questions about free AI courses
      </h2>
      <Faq faqs={coursesFaqs} />
    </div>
  );
}
