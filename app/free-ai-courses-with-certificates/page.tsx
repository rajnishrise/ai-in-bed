import type { Metadata } from "next";
import Link from "next/link";
import { certCourses, noCertCourses } from "@/content/certificates";
import { certificateFaqs } from "@/content/faq";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { lastUpdated, publisher } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const year = lastUpdated.slice(0, 4);
const path = "/free-ai-courses-with-certificates";
const title = `Free AI Courses with Certificates (${year})`;
const description = `${certCourses.length} genuinely free AI courses that give a certificate or badge, from Harvard, the University of Helsinki, IBM, Kaggle and Hugging Face, compared by level, coding and what you get.`;

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: path },
  openGraph: { siteName: SITE_NAME, type: "article", locale: "en", title, description, url: path },
};

export default function CertificatesPage() {
  const url = absoluteUrl(path);
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
              datePublished: "2026-10-26",
              dateModified: lastUpdated,
              author: publisher,
              publisher,
              inLanguage: "en",
            },
            {
              "@type": "ItemList",
              name: `Free AI courses with certificates (${year})`,
              itemListElement: certCourses.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Course",
                  name: c.title,
                  url: c.url,
                  description: c.why,
                  provider: { "@type": "Organization", name: c.by },
                  isAccessibleForFree: true,
                  educationalCredentialAwarded: c.certificate,
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Free AI courses", item: absoluteUrl("/free-ai-courses") },
                { "@type": "ListItem", position: 3, name: "With certificates", item: url },
              ],
            },
          ],
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/free-ai-courses">Free AI courses</Link>
        <span aria-hidden> / </span>
        <span aria-current="page">With certificates</span>
      </nav>
      <p className="kicker">Guide · Checked October {year}</p>
      <h1>Free AI courses with certificates</h1>
      <p className="lead">
        Yes, you can earn an AI certificate for free. The best free options are Elements of AI from the University of
        Helsinki for beginners, Harvard&apos;s CS50 AI course if you can code in Python, and Kaggle Learn for quick
        hands-on certificates. Here are all {certCourses.length}, compared.
      </p>

      <div className="table-scroll">
        <table className="compare">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Level</th>
              <th scope="col">Coding</th>
              <th scope="col">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {certCourses.map((c) => (
              <tr key={c.title}>
                <th scope="row">
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.title}
                  </a>
                  <span className="muted">{c.by}</span>
                </th>
                <td>{c.level}</td>
                <td>{c.coding ? "Yes" : "No"}</td>
                <td>{c.certificate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        The courses
      </h2>
      <ol className="course-picks">
        {certCourses.map((c) => (
          <li key={c.title} className="course-pick">
            <p className="pick-for">
              {c.level} · {c.coding ? "Some coding" : "No coding"}
            </p>
            <h3>
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.title} <Icon name="external" size={14} />
              </a>
            </h3>
            <p>
              {c.by} · {c.why}
            </p>
            <p className="cert-line">
              <Icon name="check" size={14} /> {c.certificate}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        Great free courses without a free certificate
      </h2>
      <ul className="lesson-ul">
        {noCertCourses.map((c) => (
          <li key={c.title}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.title}
            </a>{" "}
            · {c.by} · {c.note}
          </li>
        ))}
      </ul>

      <section className="term-box term-box-soft" style={{ marginTop: 32 }}>
        <p className="term-label">Before you start</p>
        <p>
          New to AI? Read the free <Link href="/level/beginner">AI in Bed Beginner level</Link> or follow the{" "}
          <Link href="/learn-ai-in-30-days">30-day plan</Link> first: the certificate courses go much faster once the
          ideas are familiar. Certificate terms change, so confirm on each course&apos;s site before you enrol.
        </p>
      </section>

      <h2 className="section-title" style={{ marginTop: 48 }}>
        Questions about free AI certificates
      </h2>
      <Faq faqs={certificateFaqs} />
    </div>
  );
}
