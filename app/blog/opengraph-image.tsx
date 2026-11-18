import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "The AI in Bed blog: AI explained simply";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Blog · Free and plain English",
    title: "AI, explained simply",
    subtitle: "How ChatGPT works, how to learn AI for free, hallucinations, prompting and agents.",
  });
}
