import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories } from "./schema";

const INITIAL_CATEGORIES = [
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description: "AI data centres, cloud compute, energy, and scaling",
  },
  {
    slug: "regulation",
    name: "Regulation",
    description:
      "Government policy, AI safety legislation, and compliance requirements",
  },
  {
    slug: "applications",
    name: "Applications",
    description:
      "Enterprise AI adoption, new AI products, and real-world deployments",
  },
  {
    slug: "chips",
    name: "Chips",
    description:
      "Semiconductors, GPU supply, custom silicon, and chip manufacturing",
  },
  {
    slug: "models",
    name: "Models",
    description:
      "Foundation models, training breakthroughs, benchmarks, and open-source releases",
  },
];

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("Seeding categories...");
  await db
    .insert(categories)
    .values(INITIAL_CATEGORIES)
    .onConflictDoNothing({ target: categories.slug });

  console.log("Done.");
}

seed().catch(console.error);
