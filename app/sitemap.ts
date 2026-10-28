import type { MetadataRoute } from "next";
import { lessonKey, levels } from "@/content";
import { glossary } from "@/content/glossary";
import { tracks } from "@/content/tracks";
import { termSlug } from "@/lib/glossary";
import { lastUpdated, lessonPublished } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Real dates, not the build time: search engines trust lastmod only when it changes with the content.
  const updated = new Date(lastUpdated);
  return [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/free-ai-courses"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/free-ai-courses-with-certificates"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/learn-ai-in-30-days"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    ...levels.map((l) => ({
      url: absoluteUrl(`/level/${l.id}`),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...levels.flatMap((l) =>
      l.lessons.map((s) => ({
        url: absoluteUrl(`/learn/${l.id}/${s.slug}`),
        lastModified: new Date(lessonPublished(lessonKey(l.id, s.slug))),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
    { url: absoluteUrl("/tracks"), lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    ...tracks.map((t) => ({
      url: absoluteUrl(`/tracks/${t.id}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/resources"), lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/glossary"), lastModified: updated, changeFrequency: "monthly", priority: 0.6 },
    ...glossary.map((t) => ({
      url: absoluteUrl(`/glossary/${termSlug(t.term)}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/new"), lastModified: updated, changeFrequency: "weekly", priority: 0.5 },
    { url: absoluteUrl("/contribute"), lastModified: updated, changeFrequency: "yearly", priority: 0.4 },
  ];
}
