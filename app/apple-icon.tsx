import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M14.04 4.16A12 12 0 1 0 27.84 17.96A10 10 0 0 1 14.04 4.16Z" fill="#e3c38f" />
          <path d="M20.6 8.4 26.4 6.2M20.6 8.4 24.6 12.8M26.4 6.2 24.6 12.8" stroke="#f2f0eb" strokeOpacity="0.7" strokeWidth="0.9" />
          <circle cx="20.6" cy="8.4" r="1.45" fill="#f2f0eb" />
          <circle cx="26.4" cy="6.2" r="1.15" fill="#f2f0eb" />
          <circle cx="24.6" cy="12.8" r="1.25" fill="#f2f0eb" />
        </svg>
      </div>
    ),
    size,
  );
}
