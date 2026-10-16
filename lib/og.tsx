import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");

/** The shared look of every share image: dark sky, gold moon, serif title. */
export async function ogImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  const [serif, serifItalic] = await Promise.all([
    readFile(join(fontDir, "InstrumentSerif-Regular.ttf")),
    readFile(join(fontDir, "InstrumentSerif-Italic.ttf")),
  ]);
  const titleSize = title.length > 48 ? 76 : title.length > 28 ? 92 : 112;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 0%, #2a2440 0%, #0a0a0f 60%)",
          color: "#f2f0eb",
          position: "relative",
        }}
      >
        <svg
          width="420"
          height="420"
          viewBox="0 0 32 32"
          style={{ position: "absolute", right: -40, top: -30, opacity: 0.9 }}
        >
          <path d="M14.04 4.16A12 12 0 1 0 27.84 17.96A10 10 0 0 1 14.04 4.16Z" fill="#e3c38f" fillOpacity="0.16" />
          <path d="M20.6 8.4 26.4 6.2M20.6 8.4 24.6 12.8M26.4 6.2 24.6 12.8" stroke="#f2f0eb" strokeOpacity="0.25" strokeWidth="0.2" />
          <circle cx="20.6" cy="8.4" r="0.6" fill="#f2f0eb" fillOpacity="0.5" />
          <circle cx="26.4" cy="6.2" r="0.45" fill="#f2f0eb" fillOpacity="0.5" />
          <circle cx="24.6" cy="12.8" r="0.5" fill="#f2f0eb" fillOpacity="0.5" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
            <path d="M14.04 4.16A12 12 0 1 0 27.84 17.96A10 10 0 0 1 14.04 4.16Z" fill="#e3c38f" />
            <path d="M20.6 8.4 26.4 6.2M20.6 8.4 24.6 12.8M26.4 6.2 24.6 12.8" stroke="#f2f0eb" strokeOpacity="0.7" strokeWidth="0.9" />
            <circle cx="20.6" cy="8.4" r="1.45" fill="#f2f0eb" />
            <circle cx="26.4" cy="6.2" r="1.15" fill="#f2f0eb" />
            <circle cx="24.6" cy="12.8" r="1.25" fill="#f2f0eb" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 44 }}>
            AI&nbsp;<span style={{ fontFamily: "SerifItalic", color: "#e3c38f" }}>in</span>&nbsp;Bed
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#e3c38f", marginBottom: 20 }}>
            {kicker}
          </div>
          <div style={{ fontFamily: "Serif", fontSize: titleSize, lineHeight: 1.02, letterSpacing: -1 }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: 30, lineHeight: 1.35, color: "#a9a7b6", marginTop: 26, maxWidth: 900 }}>{subtitle}</div>
          )}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "SerifItalic", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
