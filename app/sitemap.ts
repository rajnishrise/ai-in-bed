import type { MetadataRoute } from "next";
import { levels } from "@/content";
import { tracks } from "@/content/tracks";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...levels.map((l) => ({
      url: absoluteUrl(`/level/${l.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...levels.flatMap((l) =>
      l.lessons.map((s) => ({
        url: absoluteUrl(`/learn/${l.id}/${s.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
    { url: absoluteUrl("/tracks"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...tracks.map((t) => ({
      url: absoluteUrl(`/tracks/${t.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/resources"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/glossary"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/new"), lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: absoluteUrl("/contribute"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
