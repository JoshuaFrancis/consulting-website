import { ImageResponse } from "next/og";

// Social share card (LinkedIn, iMessage, Slack, X). Generated on-brand so a
// shared link reinforces "established" instead of rendering blank.
export const alt =
  "Joshua Francis — Credibility-first websites for premium service brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#ffffff",
          backgroundColor: "#0b1029",
          backgroundImage:
            "radial-gradient(900px 520px at 82% 8%, rgba(37,99,255,0.38), transparent 60%), radial-gradient(760px 520px at 0% 105%, rgba(124,58,237,0.28), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Joshua Francis
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Credibility-first websites for premium service brands.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 860,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Look as established as you already are. One owner who designs and
            builds, no handoff.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
