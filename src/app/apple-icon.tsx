import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1726",
          borderRadius: "40px",
        }}
      >
        <span
          style={{
            color: "#38bdf8",
            fontSize: "110px",
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          G
        </span>
      </div>
    ),
    { ...size }
  );
}
