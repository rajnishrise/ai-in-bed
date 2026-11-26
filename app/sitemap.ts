import type { MetadataRoute } from "next";
import { lessonKey, levels } from "@/content";
import { posts } from "@/content/blog";
import { everydayGuides } from "@/content/everyday";
import { glossary } from "@/content/glossary";
import { resourceGuides } from "@/content/resource-guides";
import { tracks } from "@/content/tracks";
import { termSlug } from "@/lib/glossary";
import { contentDates, lastUpdated, lessonModified, levelModified, termModified } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { pageSeo } from "@/content/seo";

const pageSeoTracks = Object.fromEntries(
  Object.keys(pageSeo)
    .filter((p) => p.startsWith("/tracks/"))
    .map((p) => [p.slice("/tracks/".length), true]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  // Real dates, not the build time or the newest release: search engines trust lastmod only when it
  // changes with the page's own content. See contentDates in lib/schema.ts.
  const updated = new Date(lastUpdated);
  const d = (date: string) => new Date(date);
  return [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/free-ai-courses"), lastModified: d(contentDates.freeCourses), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/free-ai-courses-with-certificates"), lastModified: d(contentDates.certificates), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: new Date(posts.map((p) => p.updated ?? p.published).sort().at(-1)!), changeFrequency: "weekly", priority: 0.9 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated ?? p.published),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/everyday-ai"), lastModified: new Date(everydayGuides.map((g) => g.updated ?? g.published).sort().at(-1)!), changeFrequency: "weekly", priority: 0.9 },
    ...everydayGuides.map((g) => ({
      url: absoluteUrl(`/everyday-ai/${g.slug}`),
      lastModified: new Date(g.updated ?? g.published),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/learn-ai-in-30-days"), lastModified: d(contentDates.plan), changeFrequency: "monthly", priority: 0.9 },
    ...levels.map((l) => ({
      url: absoluteUrl(`/level/${l.id}`),
      lastModified: d(levelModified(l.id, l.lessons.map((s) => lessonKey(l.id, s.slug)))),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...levels.flatMap((l) =>
      l.lessons.map((s) => ({
        url: absoluteUrl(`/learn/${l.id}/${s.slug}`),
        lastModified: d(lessonModified(lessonKey(l.id, s.slug))),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ),
    { url: absoluteUrl("/learn"), lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: d(contentDates.about), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/tracks"), lastModified: d(contentDates.tracks), changeFrequency: "monthly", priority: 0.8 },
    ...tracks.map((t) => ({
      url: absoluteUrl(`/tracks/${t.id}`),
      lastModified: d(t.id in pageSeoTracks ? contentDates.pageSeo : contentDates.tracks),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/resources"), lastModified: d(contentDates.library), changeFrequency: "monthly", priority: 0.7 },
    ...resourceGuides.map((g) => ({
      url: absoluteUrl(`/resources/${g.slug}`),
      lastModified: d(contentDates.libraryGuides),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/glossary"), lastModified: d(contentDates.glossary), changeFrequency: "monthly", priority: 0.6 },
    ...glossary.map((t) => ({
      url: absoluteUrl(`/glossary/${termSlug(t.term)}`),
      lastModified: d(termModified(t.term)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/new"), lastModified: updated, changeFrequency: "weekly", priority: 0.5 },
    { url: absoluteUrl("/contribute"), lastModified: d(contentDates.contribute), changeFrequency: "yearly", priority: 0.4 },
  ];
}
