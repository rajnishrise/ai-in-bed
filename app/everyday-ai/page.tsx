import type { Metadata } from "next";
import Link from "next/link";
import { everydayGuides, everydayMinutes, freeToolCount, openToolCount } from "@/content/everyday";
import type { Faq as FaqItem } from "@/content/faq";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { EVERYDAY_PATH, everydayPath, toolHref } from "@/lib/everyday";
import { publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "How to Use AI for Everyday Work: The Best AI Tools for Every Job";
const description =
  "Practical, free guides to using AI for everyday work: making videos, editing photos, generating images, writing, email, presentations, research, spreadsheets, meeting notes, audio, building apps and studying. The best tools for each, open-source options first.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: EVERYDAY_PATH },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description, url: EVERYDAY_PATH },
};

const faqs: FaqItem[] = [
  { q: "What is the best AI tool for everyday use?", a: "A general chatbot, such as ChatGPT, Claude or Gemini, covers most everyday jobs on its free plan: writing, email, summaries, planning, studying and simple data work. For video, photos, audio and slides, a specialist tool from the guides on this page will do the job better." },
  { q: "Are there free AI tools for everyday work?", a: "Yes. Every guide here lists free options first, and most jobs can be done with free plans or open-source tools such as Whisper for transcription, Upscayl for upscaling photos, Kdenlive for video, Marp for slides and Ollama for running a private chatbot on your own computer." },
  { q: "What does open source mean for AI tools?", a: "An open-source tool publishes its code under a licence that lets anyone use, change and share it. An open-weights model publishes the trained model itself so you can run it on your own computer, though its licence may limit some uses. Both let you work for free and keep your files private." },
  { q: "How do I start using AI at work?", a: "Pick one dull, repeated task, such as summarising meeting notes or drafting replies, and try it with a free chatbot for a week. Use tools your employer approves for anything confidential, and check the results before you share them." },
];

/** The first free and the first open pick in a guide, for the quick-picks table. */
const quick = (g: (typeof everydayGuides)[number]) => ({
  free: g.tools.find((t) => t.cost === "free" || t.cost === "free-plan"),
  open: g.tools.find((t) => (t.cost === "open-source" || t.cost === "open-weights") && !t.url.startsWith("/")),
});

export default function EverydayIndex() {
  const url = absoluteUrl(EVERYDAY_PATH);
  return (
    <div className="wrap section everyday-hub">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${url}#hub`,
              name: title,
              description,
              url,
              inLanguage: "en",
              publisher,
              mainEntity: {
                "@type": "ItemList",
                name: "Everyday AI guides",
                itemListElement: everydayGuides.map((g, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: g.title,
                  url: absoluteUrl(everydayPath(g)),
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Everyday AI", item: url },
              ],
            },
          ],
        }}
      />
      <div className="narrow-head">
        <p className="kicker">Everyday AI</p>
        <h1>Use AI for everyday work</h1>
        <p className="lead">
          Practical guides to the jobs people actually do with AI, from better videos to a tidy inbox. Each one names the
          best tools for the job, free and open-source picks first, with a simple workflow and prompts you can copy.
        </p>
        <section className="term-box" aria-label="Short answer">
          <p className="term-label">Short answer</p>
          <p className="term-answer">
            For most everyday work, a free chatbot like ChatGPT, Claude or Gemini is the place to start. For video,
            photos, audio and slides, a specialist tool does better: CapCut or Kdenlive for video, Google Photos or
            Upscayl for photos, Whisper for transcripts, Gamma or Marp for slides. Pick the guide for your job below.
          </p>
        </section>
      </div>

      <ul className="everyday-grid">
        {everydayGuides.map((g) => (
          <li key={g.slug}>
            <Link href={everydayPath(g)} className="blog-card everyday-card">
              <p className="pick-for">
                {g.topic} · {everydayMinutes(g)} min
              </p>
              <h2>{g.title}</h2>
              <p className="muted">{g.card}</p>
              <p className="everyday-counts">
                {g.tools.length} tools · {freeToolCount(g)} free · {openToolCount(g)} open
              </p>
              <span className="text-link">
                Read the guide <Icon name="arrow" size={15} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="narrow-head">
        <h2 className="section-title" style={{ marginTop: 56 }}>
          Quick picks: free and open source
        </h2>
        <p className="muted">The first free pick and the first open-source pick from each guide.</p>
        <div className="table-scroll">
          <table className="compare quick-picks">
            <thead>
              <tr>
                <th scope="col">Job</th>
                <th scope="col">Free pick</th>
                <th scope="col">Open-source pick</th>
              </tr>
            </thead>
            <tbody>
              {everydayGuides.map((g) => {
                const q = quick(g);
                return (
                  <tr key={g.slug}>
                    <th scope="row">
                      <Link href={everydayPath(g)}>{g.topic}</Link>
                    </th>
                    <td>{q.free ? <a href={toolHref(q.free.url)} target="_blank" rel="noopener noreferrer">{q.free.name}</a> : "–"}</td>
                    <td>{q.open ? <a href={toolHref(q.open.url)} target="_blank" rel="noopener noreferrer">{q.open.name}</a> : "–"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 className="section-title" style={{ marginTop: 56 }}>
          Questions
        </h2>
        <Faq faqs={faqs} />

        <p className="muted small" style={{ marginTop: 28 }}>
          Want to know how these tools actually work? Start the free{" "}
          <Link href="/learn/beginner/everyday-ai">lesson on everyday AI</Link>, follow the{" "}
          <Link href="/tracks/ai-for-everyone">AI for everyone</Link> track, or read{" "}
          <Link href="/blog/prompt-engineering-for-beginners">how to write better prompts</Link>.
        </p>
      </div>
    </div>
  );
}
