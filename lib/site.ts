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

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
