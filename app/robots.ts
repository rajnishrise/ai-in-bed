import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const disallow = ["/review", "/offline", "/md/"];

/*
 * AI search and assistant crawlers, named so it's explicit they're welcome:
 * being read by them is how lessons get cited in ChatGPT, Claude, Perplexity,
 * Gemini and Copilot answers. A bot that matches a named group ignores "*",
 * so each group repeats the same rules.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
