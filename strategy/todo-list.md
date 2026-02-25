# Task Tracking

> Quick reference for current work priorities. For detailed issue tracking use Beads (`bd list`).
> This file is for high-level planning; Beads handles granular task management.

## In Progress

_None currently._

## Up Next

### Immediate — Validate Pipeline
- [ ] Generate Drizzle migration, test against local Postgres
- [ ] Run `pnpm db:seed` to populate categories
- [ ] Run `pnpm ingest --fetch-only` to test RSS fetching
- [ ] Run full `pnpm ingest` end-to-end with Anthropic API key
- [ ] Run live for 48 hours, tune relevance threshold

### Week 3 — Frontend
- [ ] Homepage feed with article cards
- [ ] Article detail page
- [ ] Category navigation and ticker filtering
- [ ] SEO, loading states, mobile responsive

### Week 4 — Deploy & Harden
- [ ] Deploy to Vercel + Neon + Railway/Proxmox
- [ ] Implement caching strategy (target <200ms)
- [ ] Set up monitoring, alerting, error tracking
- [ ] Compliance audit (attribution, no trading advice)
- [ ] Soft launch with analytics

## Blocked

_None currently._

## Done (Recent)

- [x] Write AIMarketWire PRD — 2026-02-25
- [x] Populate CLAUDE.md with project details — 2026-02-25
- [x] Log initial architecture decisions (ADR-001 to ADR-006) — 2026-02-25
- [x] Create 30-day plan aligned with project workflow — 2026-02-25
- [x] Scaffold Next.js 16 project (TypeScript, App Router, pnpm, Tailwind) — 2026-02-25
- [x] Design DB schema (sources, raw_articles, articles, tickers, categories) — 2026-02-25
- [x] Build LLM provider abstraction layer (interface + Claude implementation) — 2026-02-25
- [x] Docker Compose for local Postgres — 2026-02-25
- [x] Environment config with zod validation — 2026-02-25
- [x] Initial commit and push to GitHub — 2026-02-25
- [x] Research and configure 7 RSS news sources — 2026-02-25
- [x] Build RSS ingestion service (fetch → dedup → store) — 2026-02-25
- [x] Build AI relevance scoring pipeline (0–100) — 2026-02-25
- [x] Build summary generation pipeline — 2026-02-25
- [x] Build API routes (articles feed, detail, ticker/category filters) — 2026-02-25
- [x] Build CLI ingest command (`pnpm ingest`) — 2026-02-25
- [x] Write tests (11 passing) — 2026-02-25
