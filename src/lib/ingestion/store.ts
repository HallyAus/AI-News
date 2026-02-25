import { db } from "@/db";
import { sources, rawArticles } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { FetchedArticle } from "./rss-fetcher";
import type { SourceConfig } from "./sources";

/** Ensure a source exists in the DB and return its ID. */
export async function upsertSource(config: SourceConfig): Promise<string> {
  const existing = await db.query.sources.findFirst({
    where: eq(sources.url, config.url),
  });

  if (existing) {
    return existing.id;
  }

  const [inserted] = await db
    .insert(sources)
    .values({
      name: config.name,
      url: config.url,
      type: config.type,
      active: true,
    })
    .returning({ id: sources.id });

  return inserted.id;
}

/** Store fetched articles, skipping duplicates by URL. Returns count of new articles. */
export async function storeRawArticles(
  articles: FetchedArticle[],
  sourceIdMap: Map<string, string>
): Promise<number> {
  let stored = 0;

  for (const article of articles) {
    if (!article.url) continue;

    const sourceId = sourceIdMap.get(article.sourceUrl);
    if (!sourceId) continue;

    try {
      await db
        .insert(rawArticles)
        .values({
          sourceId,
          externalId: article.externalId,
          title: article.title,
          content: article.content || null,
          summary: article.summary || null,
          url: article.url,
          author: article.author,
          publishedAt: article.publishedAt,
          processed: false,
        })
        .onConflictDoNothing({ target: rawArticles.url });

      stored++;
    } catch (err) {
      // Duplicate URL — skip silently (expected during dedup)
      if (
        err instanceof Error &&
        err.message.includes("unique")
      ) {
        continue;
      }
      throw err;
    }
  }

  return stored;
}
