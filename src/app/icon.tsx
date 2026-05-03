import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <span
          style={{
            color: "#38bdf8",
            fontSize: "22px",
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: "-1px",
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
