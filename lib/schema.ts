import { releases } from "@/content/changelog";
import { REPO_URL, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

/** Shared schema.org pieces so every page describes the site the same way. */

export const LAUNCH_DATE = "2026-10-06";

export const organization = {
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icons/512"),
  sameAs: [REPO_URL],
};

export const website = {
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: SITE_NAME,
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
