/** Public site settings shared by metadata, the sitemap and share images. */
export const SITE_NAME = "AI in Bed";
export const SITE_TAGLINE = "Understand AI, one quiet night at a time.";
export const SITE_DESCRIPTION =
  "A free AI course in ten-minute lessons, from beginner to advanced. Learn AI online with visual explainers, quizzes and the best open courses from Stanford, Google and fast.ai. No sign-up.";

/** The home page's search title: what people type, then the brand. */
export const HOME_TITLE = "Free AI Course: Learn AI in 10-Minute Lessons · AI in Bed";

/**
 * The canonical origin: https://www.aiinbed.com. NEXT_PUBLIC_SITE_URL overrides it;
 * on Vercel the project's production domain is used.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://www.aiinbed.com"
      : "http://localhost:3000")
).replace(/\/$/, "");

/** The public source repository, used for "suggest an edit" and the contributor guide. */
export const REPO_URL = "https://github.com/rajnishrise/ai-in-bed";

/** A pre-filled GitHub issue for reporting a mistake or suggesting an improvement. */
export function suggestEditUrl(title: string, path: string) {
  const body = [
    `Page: ${absoluteUrl(path)}`,
    "",
    "What could be better? (a mistake, something unclear, a missing idea, a better source)",
    "",
    "",
  ].join("\n");
  const q = new URLSearchParams({ title: `Lesson: ${title}`, body, labels: "content" });
  return `${REPO_URL}/issues/new?${q}`;
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
