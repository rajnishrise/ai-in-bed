import { releases } from "@/content/changelog";
import { termSeo } from "@/content/glossary-seo";
import { pageSeo } from "@/content/seo";
import { INSTAGRAM_URL, REPO_URL, SITE_ALT_NAMES, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

/** Shared schema.org pieces so every page describes the site the same way. */

export const LAUNCH_DATE = "2026-10-06";

export const organization = {
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  alternateName: SITE_ALT_NAMES,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icons/512"),
  sameAs: [INSTAGRAM_URL, REPO_URL],
};

export const website = {
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: SITE_NAME,
  alternateName: SITE_ALT_NAMES,
  url: absoluteUrl("/"),
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": absoluteUrl("/#organization") },
};

export const publisher = { "@id": absoluteUrl("/#organization") };

/** The fields Google's Course rich result asks for: free offer, online, self-paced. */
export function courseDetails(minutes: number, schedule?: { nights: number; minutesPerNight: number }) {
  return {
    provider: publisher,
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: [{ "@type": "Offer", category: "Free", price: 0, priceCurrency: "USD" }],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: `PT${Math.max(1, Math.round(minutes / 60))}H`,
        ...(schedule && {
          courseSchedule: {
            "@type": "Schedule",
            repeatFrequency: "Daily",
            repeatCount: schedule.nights,
            duration: `PT${schedule.minutesPerNight}M`,
          },
        }),
      },
    ],
  };
}

/** When a lesson first appeared, from the release notes (launch lessons aren't listed there). */
export function lessonPublished(key: string) {
  return [...releases].reverse().find((r) => r.lessons.includes(key))?.date ?? LAUNCH_DATE;
}

/** The newest release date: the site's "last updated". */
export const lastUpdated = releases[0].date;

/*
 * When each kind of page last really changed. Sitemap lastmod and schema dateModified use these
 * instead of the newest release date: if every page claims to change on every release, Google
 * stops trusting lastmod and has less reason to come back for pages it hasn't crawled yet.
 * Bump the matching date when you edit that content.
 */
export const contentDates = {
  /** Terms, definitions and examples (content/glossary*.ts). */
  glossary: "2026-10-26",
  /** Question titles and answers in content/glossary-seo.ts, unless an entry sets its own date. */
  glossarySeo: "2026-11-18",
  /** Search answers and FAQs in content/seo.ts. */
  pageSeo: "2026-11-18",
  tracks: "2026-10-16",
  library: "2026-10-06",
  libraryGuides: "2026-11-18",
  freeCourses: "2026-10-26",
  certificates: "2026-10-26",
  plan: "2026-10-26",
  contribute: "2026-10-16",
  about: "2026-11-26",
};

const newest = (...dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1)!;

/** A lesson changes when it's published and when its search answer (content/seo.ts) changes. */
export function lessonModified(key: string) {
  return newest(lessonPublished(key), pageSeo[`/learn/${key}`] && contentDates.pageSeo);
}

/** A level page changes when a lesson is added to it. */
export function levelModified(levelId: string, lessonKeys: string[]) {
  return newest(...lessonKeys.map(lessonPublished), pageSeo[`/level/${levelId}`] && contentDates.pageSeo);
}

export function termModified(term: string) {
  const seo = termSeo[term];
  return seo ? newest(contentDates.glossary, seo.updated ?? contentDates.glossarySeo) : contentDates.glossary;
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A BreadcrumbList from the home page down. Pass [name, path] pairs after Home. */
export function breadcrumbs(...trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [[SITE_NAME, "/"] as [string, string], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
