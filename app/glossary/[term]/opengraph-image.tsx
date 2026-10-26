import { glossary } from "@/content/glossary";
import { getTerm, termInSentence, termSlug } from "@/lib/glossary";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed glossary term";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return glossary.map((t) => ({ term: termSlug(t.term) }));
}

export default async function Image({ params }: { params: Promise<{ term: string }> }) {
  const t = getTerm((await params).term)!;
  return ogImage({ kicker: "AI glossary · In plain English", title: `What is ${termInSentence(t.term)}?`, subtitle: t.def });
}
