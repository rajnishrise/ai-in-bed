import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Everyday AI: practical guides to the best AI tools for everyday work";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Everyday AI · Free and open-source tools first",
    title: "Use AI for everyday work",
    subtitle: "Video, photos, writing, email, slides, research, spreadsheets, meetings, audio, apps and studying.",
  });
}
