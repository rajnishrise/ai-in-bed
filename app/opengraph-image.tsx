import { SITE_TAGLINE } from "@/lib/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "AI in Bed: free, bite-sized AI lessons";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Free AI lessons · Beginner to advanced",
    title: SITE_TAGLINE,
    subtitle: "Ten-minute lessons with pictures, quick checks and spaced review.",
  });
}
