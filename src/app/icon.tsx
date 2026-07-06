import { ImageResponse } from "next/og";

// Favicon — "JF" monogram on the wordmark's violet→blue gradient.
export const size = { width: 64, height: 64 };
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
          background: "linear-gradient(135deg, #7c3aed, #2563ff)",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        JF
      </div>
    ),
    { ...size },
  );
}
