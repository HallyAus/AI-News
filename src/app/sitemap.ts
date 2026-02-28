import type { MetadataRoute } from "next";

// Regenerate sitemap on each request (API not available at build time)
export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = "https://aimarketwire.ai";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

interface SitemapArticle {
  id: string;
  slug: string;
  publishedAt: string | null;
  createdAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = [
    "infrastructure",
    "regulation",
    "applications",
    "chips",
    "models",
  ];

  const categoryPages = categories.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  // Fetch published articles for sitemap
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${APP_URL}/api/articles?limit=500`);
    if (res.ok) {
      const data = await res.json();
      articlePages = data.articles.map((a: SitemapArticle) => ({
        url: `${BASE_URL}/articles/${a.slug}`,
        lastModified: new Date(a.publishedAt ?? a.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // API unavailable — skip article pages
  }

  const staticPages = [
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, priority: 0.3 },
    { url: `${BASE_URL}/terms`, priority: 0.3 },
  ].map((p) => ({
    ...p,
    lastModified: new Date("2026-02-28"),
    changeFrequency: "monthly" as const,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 1,
    },
    ...categoryPages,
    ...staticPages,
    ...articlePages,
  ];
}
