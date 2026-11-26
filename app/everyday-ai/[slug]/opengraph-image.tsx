import { everydayGuides, getEverydayGuide } from "@/content/everyday";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed: an Everyday AI guide";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return everydayGuides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getEverydayGuide((await params).slug)!;
  return ogImage({ kicker: `Everyday AI · ${g.topic}`, title: g.title, subtitle: g.card });
}
