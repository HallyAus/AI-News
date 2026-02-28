import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIMarketWire — AI Trading News & Market Analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#09090b",
          padding: "60px",
        }}
      >
        {/* Decorative top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #34d399, #059669, #34d399)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#34d399",
              fontFamily: "monospace",
            }}
          >
            AI
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              letterSpacing: "-1px",
              color: "#fafafa",
              fontFamily: "monospace",
            }}
          >
            MarketWire
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            fontFamily: "monospace",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          AI-Driven Trading News — Signal, Not Noise
        </div>

        {/* Categories */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Chips", "Models", "Infrastructure", "Regulation", "Applications"].map(
            (cat) => (
              <div
                key={cat}
                style={{
                  padding: "8px 20px",
                  border: "1px solid #3f3f46",
                  borderRadius: "4px",
                  color: "#a1a1aa",
                  fontSize: "16px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {cat}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          aimarketwire.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
