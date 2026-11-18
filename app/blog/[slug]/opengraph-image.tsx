import { getPost, posts } from "@/content/blog";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed blog post";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug)!;
  return ogImage({ kicker: `Blog · ${p.topic}`, title: p.title, subtitle: p.description });
}
