import { getLesson, levels } from "@/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed lesson";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return levels.flatMap((l) => l.lessons.map((s) => ({ level: l.id, slug: s.slug })));
}

export default async function Image({ params }: { params: Promise<{ level: string; slug: string }> }) {
  const { level, slug } = await params;
  const { level: lv, lesson, index } = getLesson(level, slug)!;
  return ogImage({
    kicker: `${lv.name} · Lesson ${index + 1} · ${lesson.minutes} min`,
    title: lesson.title,
    subtitle: lesson.summary,
  });
}
