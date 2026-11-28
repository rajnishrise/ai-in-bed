import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { INSTAGRAM_URL, REPO_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "Privacy policy";
const description = `How ${SITE_NAME} handles your data: progress stays in your browser, privacy-friendly visit counts, and Google ads on some pages.`;
const UPDATED = "2026-11-28";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", title, description, url: "/privacy" },
};

/** Plain-English privacy policy. Required by Google AdSense; keep it in step with what the site actually does. */
export default function PrivacyPage() {
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebPage", name: `${title} · ${SITE_NAME}`, description, url: absoluteUrl("/privacy"), dateModified: UPDATED },
            breadcrumbs(["Privacy", "/privacy"]),
          ],
        }}
      />
      <p className="kicker">Privacy</p>
      <h1>Privacy policy</h1>
      <p className="lead">
        {SITE_NAME} has no accounts and asks for nothing about you. This page explains the little data the site does
        touch, and the ads shown on some pages.
      </p>
      <p className="muted small">
        Last updated <time dateTime={UPDATED}>28 November 2026</time>
      </p>

      <h2 className="section-title">Your progress stays on your device</h2>
      <p>
        Lessons you finish, quiz answers, review cards, your theme and reading settings are saved in your own
        browser&apos;s local storage. They are never sent to us. Clearing your browser&apos;s site data removes them. If
        you save lessons for offline reading, copies of those pages are kept in your browser&apos;s cache.
      </p>

      <h2 className="section-title">Visit counts</h2>
      <p>
        We use Vercel Web Analytics to count page views and see which pages are useful, including the &ldquo;clear or
        confusing&rdquo; buttons under lessons. It does not use cookies and does not identify you or follow you across
        other sites.
      </p>

      <h2 className="section-title">Advertising</h2>
      <p>
        Some blog, Everyday AI and glossary pages show ads from Google AdSense. Lessons never show ads. Google and its
        partners may use cookies or similar technology to show ads based on your visits to this and other websites, and
        to measure how ads perform.
      </p>
      <ul className="lesson-ul">
        <li>
          You can turn off personalised ads in{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google&apos;s Ad Settings
          </a>
          , or opt out of some third-party ad cookies at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>
          .
        </li>
        <li>
          Read how Google uses information from sites that use its services:{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            policies.google.com/technologies/partner-sites
          </a>
          .
        </li>
        <li>
          If you are in the European Economic Area, the UK or Switzerland, you will be asked for consent before
          personalised ads are shown, and you can change your choice at any time.
        </li>
      </ul>

      <h2 className="section-title">Links to other sites</h2>
      <p>
        Lessons link to free courses, books and tools on other websites, and &ldquo;Suggest an edit&rdquo; opens GitHub.
        Those sites have their own privacy policies.
      </p>

      <h2 className="section-title">Children</h2>
      <p>The site is for a general audience and does not knowingly collect information from children.</p>

      <h2 className="section-title">Questions</h2>
      <p>
        Open an issue on{" "}
        <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        or message us on{" "}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        . See also <Link href="/about">About {SITE_NAME}</Link>.
      </p>
    </div>
  );
}
