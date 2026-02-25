# Memory: Decisions

> Past choices made during this project for consistency. Dated entries.
> Claude adds here when a decision is made. Auto-loaded every session.

## Format

Each entry: `[YYYY-MM-DD] Decision — Rationale`

## Decisions

<!-- Claude: add new entries at the top -->

- [2026-02-25] Relevance threshold at 40/100 — will tune after Week 2 data, targeting <5% false positive rate
- [2026-02-25] Five AI categories at launch (Infrastructure, Regulation, Applications, Chips, Models) — expandable later
- [2026-02-25] Inngest first, BullMQ fallback for background jobs — evaluate during Week 1 implementation
- [2026-02-25] Drizzle ORM over Prisma — lighter weight, better edge runtime compatibility, no binary engine
- [2026-02-25] Neon serverless Postgres — native Vercel integration, connection pooling, generous free tier
- [2026-02-25] Next.js 15 App Router on Vercel with pnpm — SSR/ISR for <200ms page loads
