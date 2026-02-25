import Parser from "rss-parser";
import type { SourceConfig } from "./sources";

const parser = new Parser({
  timeout: 15_000,
  headers: {
    "User-Agent": "AIMarketWire/1.0 (news aggregator)",
  },
});

export interface FetchedArticle {
  sourceName: string;
  sourceUrl: string;
  externalId: string | null;
  title: string;
  content: string;
  summary: string;
  url: string;
  author: string | null;
  publishedAt: Date | null;
}

export async function fetchRSSFeed(
  source: SourceConfig
): Promise<FetchedArticle[]> {
  const feed = await parser.parseURL(source.url);

  return (feed.items ?? []).map((item) => ({
    sourceName: source.name,
    sourceUrl: source.url,
    externalId: item.guid ?? item.link ?? null,
    title: item.title ?? "Untitled",
    content: stripHtml(item["content:encoded"] ?? item.content ?? ""),
    summary: stripHtml(item.contentSnippet ?? item.summary ?? ""),
    url: item.link ?? "",
    author: item.creator ?? item.author ?? null,
    publishedAt: item.pubDate ? new Date(item.pubDate) : null,
  }));
}

export async function fetchAllSources(
  sources: SourceConfig[]
): Promise<{ articles: FetchedArticle[]; errors: Array<{ source: string; error: string }> }> {
  const results = await Promise.allSettled(
    sources.map((source) => fetchRSSFeed(source))
  );

  const articles: FetchedArticle[] = [];
  const errors: Array<{ source: string; error: string }> = [];

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      errors.push({
        source: sources[i].name,
        error: result.reason?.message ?? String(result.reason),
      });
    }
  });

  return { articles, errors };
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
