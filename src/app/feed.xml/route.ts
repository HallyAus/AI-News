const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const BASE_URL = "https://aimarketwire.ai";

interface FeedArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  sourceName: string;
  originalUrl: string;
  publishedAt: string | null;
  createdAt: string;
  categories: { slug: string; name: string }[];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let articles: FeedArticle[] = [];

  try {
    const res = await fetch(`${APP_URL}/api/articles?limit=50`);
    if (res.ok) {
      const data = await res.json();
      articles = data.articles;
    }
  } catch {
    // API unavailable
  }

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${BASE_URL}/articles/${a.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/articles/${a.slug}</guid>
      <description>${escapeXml(a.summary)}</description>
      <pubDate>${new Date(a.publishedAt ?? a.createdAt).toUTCString()}</pubDate>
      <source url="${escapeXml(a.originalUrl)}">${escapeXml(a.sourceName)}</source>${a.categories.map((c) => `\n      <category>${escapeXml(c.name)}</category>`).join("")}
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AIMarketWire — AI Trading News</title>
    <link>${BASE_URL}</link>
    <description>AI-relevant market news for traders and investors. Every article scored for relevance, summarised by AI, with market impact analysis.</description>
    <language>en-au</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
