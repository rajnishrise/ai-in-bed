/** Public site settings shared by metadata, the sitemap and share images. */
export const SITE_NAME = "AI in Bed";
export const SITE_TAGLINE = "Understand AI, one quiet night at a time.";
export const SITE_DESCRIPTION =
  "Free, bite-sized AI lessons for beginners, intermediate and advanced learners, with infographics, quick quizzes and spaced review. Built on the best open-source learning material.";

/**
 * The canonical origin. Set NEXT_PUBLIC_SITE_URL once you have a custom
 * domain; on Vercel it falls back to the project's production URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
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
