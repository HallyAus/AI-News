import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  const result = await sql`UPDATE raw_articles SET processed = false WHERE processed = true AND id NOT IN (SELECT raw_article_id FROM articles)`;
  console.log("Reset stuck articles:", result);

  const counts = await sql`SELECT processed, count(*)::int as c FROM raw_articles GROUP BY processed`;
  console.log("Article counts:", counts);
}

main().catch(console.error);
