/**
 * Full ingestion pipeline: fetch → deduplicate → score → summarise → publish.
 *
 * Usage:
 *   pnpm ingest              # run full pipeline
 *   pnpm ingest --fetch-only # only fetch, don't score
 */

import { fetchAllSources, upsertSource, storeRawArticles, DEFAULT_SOURCES } from "@/lib/ingestion";
import { scoreUnprocessedArticles } from "@/lib/pipeline";

async function main() {
  const fetchOnly = process.argv.includes("--fetch-only");
  const startTime = Date.now();

  console.log(`[ingest] Starting pipeline at ${new Date().toISOString()}`);
  console.log(`[ingest] Sources: ${DEFAULT_SOURCES.length}`);

  // 1. Ensure all sources exist in DB
  const sourceIdMap = new Map<string, string>();
  for (const source of DEFAULT_SOURCES) {
    const id = await upsertSource(source);
    sourceIdMap.set(source.url, id);
  }
  console.log(`[ingest] Sources registered: ${sourceIdMap.size}`);

  // 2. Fetch all RSS feeds
  console.log("[ingest] Fetching feeds...");
  const { articles, errors } = await fetchAllSources(DEFAULT_SOURCES);

  if (errors.length > 0) {
    for (const err of errors) {
      console.error(`[ingest] Feed error: ${err.source} — ${err.error}`);
    }
  }
  console.log(`[ingest] Fetched ${articles.length} articles (${errors.length} feed errors)`);

  // 3. Store raw articles (dedup by URL)
  const stored = await storeRawArticles(articles, sourceIdMap);
  console.log(`[ingest] Stored ${stored} new articles (${articles.length - stored} duplicates skipped)`);

  if (fetchOnly) {
    console.log("[ingest] --fetch-only mode, skipping scoring");
    return;
  }

  // 4. Score and publish
  console.log("[ingest] Scoring unprocessed articles...");
  const results = await scoreUnprocessedArticles(20);

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => r.error).length;

  // Log errors for debugging
  for (const r of results) {
    if (r.error) {
      console.error(`[ingest] Scoring error for ${r.rawArticleId}: ${r.error}`);
    }
  }

  console.log(
    `[ingest] Scored ${results.length} articles: ${passed} published, ${results.length - passed - failed} rejected, ${failed} errors`
  );

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`[ingest] Pipeline complete in ${elapsed}s`);
}

main().catch((err) => {
  console.error("[ingest] Fatal error:", err);
  process.exit(1);
});
