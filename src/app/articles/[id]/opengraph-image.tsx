import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIMarketWire Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

interface ArticleBrief {
  title: string;
  relevanceScore: number;
  sourceName: string;
  categories: { slug: string; name: string }[];
  tickers: { symbol: string }[];
}

function scoreColor(score: number): string {
  if (score >= 80) return "#34d399";
  if (score >= 60) return "#fbbf24";
  return "#a1a1aa";
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let article: ArticleBrief | null = null;
  try {
    const res = await fetch(`${APP_URL}/api/articles/${id}`);
    if (res.ok) article = await res.json();
  } catch {
    // fallback to generic
  }

  const title = article?.title ?? "AI Market News";
  const score = article?.relevanceScore ?? 0;
  const source = article?.sourceName ?? "";
  const category = article?.categories?.[0]?.name ?? "AI News";
  const tickers = article?.tickers?.map((t) => t.symbol).slice(0, 4) ?? [];
  const color = scoreColor(score);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#09090b",
          padding: "48px 60px",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: color,
          }}
        />

        {/* Header row: logo + score */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#34d399",
                fontFamily: "monospace",
              }}
            >
              AI
            </span>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#fafafa",
                fontFamily: "monospace",
              }}
            >
              MarketWire
            </span>
          </div>

          {score > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#71717a",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Relevance
              </span>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  color,
                  fontFamily: "monospace",
                }}
              >
                {score}
              </span>
            </div>
          )}
        </div>

        {/* Category badge */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            gap: "12px",
          }}
        >
          <div
            style={{
              padding: "6px 16px",
              border: "1px solid #3f3f46",
              borderRadius: "3px",
              color: "#a1a1aa",
              fontSize: "14px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: 600,
            color: "#fafafa",
            lineHeight: 1.25,
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {title.length > 120 ? title.slice(0, 117) + "..." : title}
        </div>

        {/* Bottom row: source + tickers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: "20px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#71717a",
              fontFamily: "monospace",
            }}
          >
            {source && `Source: ${source}`}
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            {tickers.map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 12px",
                  border: "1px solid #3f3f46",
                  borderRadius: "3px",
                  color: "#fafafa",
                  fontSize: "16px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
