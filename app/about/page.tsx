import type { Metadata } from "next";
import Link from "next/link";
import { levels, totalLessons } from "@/content";
import { glossary } from "@/content/glossary";
import { resources } from "@/content/resources";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs, organization } from "@/lib/schema";
import { INSTAGRAM_URL, REPO_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "About AI in Bed: Free, Open-Source AI Lessons";
const description = `What AI in Bed is: a free, open-source site that teaches AI in ten-minute lessons on your phone, with ${totalLessons} lessons, a ${glossary.length}-term glossary and a library of ${resources.length} free courses and books.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description, url: "/about" },
};

const sections: { href: string; text: string; label: string }[] = [
  { href: "/learn", text: `${totalLessons} lessons in ${levels.length} levels, beginner to advanced`, label: "Learn" },
  { href: "/tracks", text: "Guided paths for work, building and ML engineering", label: "Tracks" },
  { href: "/glossary", text: `${glossary.length} AI terms explained in plain English`, label: "Glossary" },
  { href: "/everyday-ai", text: "Practical guides to using AI tools for everyday jobs", label: "Everyday AI" },
  { href: "/blog", text: "Answers to the questions people ask about AI", label: "Blog" },
  { href: "/resources", text: `${resources.length} free courses, books, papers and tools from other teachers`, label: "Library" },
];

/** Says plainly who and what AI in Bed is, so search engines can tie the name to the site. */
export default function AboutPage() {
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              name: title,
              description,
              url: absoluteUrl("/about"),
              isPartOf: { "@id": absoluteUrl("/#website") },
              about: { "@id": organization["@id"] },
              mainEntity: { "@id": organization["@id"] },
            },
            breadcrumbs(["About", "/about"]),
          ],
        }}
      />
      <p className="kicker">About</p>
      <h1>About AI in Bed</h1>
      <p className="lead">
        AI in Bed is a free website for learning artificial intelligence in calm, ten-minute lessons, made to be read on
        a phone before you sleep. No sign-up, no paywall, and no ads in lessons.
      </p>

      <h2 className="section-title" style={{ marginTop: 36 }}>
        What you&apos;ll find here
      </h2>
      <ul className="link-list">
        {sections.map((s) => (
          <li key={s.href}>
            <Link href={s.href}>
              <span>{s.text}</span>
              <span className="muted">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="section-title" style={{ marginTop: 36 }}>
        How the lessons are made
      </h2>
      <p>
        Every lesson is an original, short summary of one idea, with a drawn or interactive explainer and a few quick
        checks that come back on a spaced schedule so you remember them. Each lesson credits and links to the open and
        free material it draws on, such as courses from Stanford, fast.ai, Google and Hugging Face, so you can go deeper.
      </p>
      <p>
        Your progress is saved in your own browser, not on a server. Pages you visit work offline, and the site can be
        installed on your phone&apos;s home screen.
      </p>

      <h2 className="section-title" style={{ marginTop: 36 }}>
        Open source
      </h2>
      <p>
        The whole site is open source on <a href={REPO_URL}>GitHub</a>. Anyone can report a mistake, suggest a topic or
        write a lesson. See <Link href="/contribute">how to contribute</Link>.
      </p>

      <h2 className="section-title" style={{ marginTop: 36 }}>
        Find us
      </h2>
      <p>
        AI in Bed lives at <a href={absoluteUrl("/")}>aiinbed.com</a>. Short lessons also go out on Instagram at{" "}
        <a href={INSTAGRAM_URL} rel="me noopener">
          @aiinbed
        </a>
        .
      </p>
    </div>
  );
}
