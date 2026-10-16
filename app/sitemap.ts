import type { MetadataRoute } from "next";
import { levels } from "@/content";
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
    { url: absoluteUrl("/resources"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/glossary"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
