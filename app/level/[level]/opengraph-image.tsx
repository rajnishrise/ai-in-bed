import { getLevel, levels } from "@/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed level overview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return levels.map((l) => ({ level: l.id }));
}

export default async function Image({ params }: { params: Promise<{ level: string }> }) {
  const level = getLevel((await params).level)!;
  const mins = level.lessons.reduce((n, l) => n + l.minutes, 0);
  return ogImage({
    kicker: `${level.name} · ${level.lessons.length} lessons · ${mins} min`,
    title: level.tagline,
    subtitle: level.description,
  });
}
