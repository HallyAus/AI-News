# AIMarketWire — 30 Day Plan

> Goal: Working MVP deployed to Vercel with live AI news ingestion, relevance scoring, LLM summaries, and a real-time feed.
>
> **Workflow:** Each phase starts by loading the relevant `.claude/skills/` file. Tasks are tracked in Beads (`bd list`). Decisions logged as ADRs in `specs/decisions.md`. Learnings captured in `strategy/learnings.md` as they happen.

---

## Pre-Work (Day 0)

Before any code, get the project infrastructure right.

- [ ] Run `setup.sh` to initialise git and Beads
- [ ] Confirm CLAUDE.md is populated (done)
- [ ] Log initial architecture decisions as ADRs in `specs/decisions.md` (done)
- [ ] Populate `strategy/todo-list.md` with Week 1 tasks (done)
- [ ] Create Beads issues for Week 1 deliverables
- [ ] Update `memory/HANDOFF.md` with starting state

---

## Week 1 — Foundation (Days 1–7)

> Load: `.claude/skills/coding-patterns/SKILL.md` before scaffolding

### Phase 1A: Project Scaffolding (Days 1–2)

| Task | Beads |
|------|-------|
| Initialise Next.js 15 project with TypeScript, App Router, pnpm | `bd-XXXX` |
| Set up Docker Compose for local dev (Postgres 16, app) | `bd-XXXX` |
| Configure Drizzle ORM with initial schema migrations | `bd-XXXX` |
| Design DB schema: `sources`, `raw_articles`, `articles`, `tickers`, `categories`, `article_tickers`, `article_categories` | `bd-XXXX` |
| Build LLM provider abstraction layer (interface + Claude implementation) | `bd-XXXX` |
| Set up environment config with validation (zod) | `bd-XXXX` |
| Configure ESLint, Prettier, Husky pre-commit hooks | `bd-XXXX` |

**ADR required:** DB schema design → log in `specs/decisions.md`

### Phase 1B: News Ingestion Pipeline (Days 3–4)

| Task | Beads |
|------|-------|
| Research and select 3–5 initial news sources (RSS feeds, news APIs) | `bd-XXXX` |
| Build ingestion service: fetch → deduplicate → store raw articles | `bd-XXXX` |
| Implement background job scheduler (Inngest or BullMQ) | `bd-XXXX` |
| Set up 5-minute polling cycle per source | `bd-XXXX` |
| Store source attribution metadata (publisher, original URL, publish time) | `bd-XXXX` |
| Add ingestion error handling and retry logic | `bd-XXXX` |

**ADR required:** News source selection → log in `specs/decisions.md`
**ADR required:** Background job approach → log in `specs/decisions.md`

### Phase 1C: AI Relevance Scoring (Days 5–7)

> Load: `.claude/skills/testing/SKILL.md` — write tests for scoring pipeline

| Task | Beads |
|------|-------|
| Design scoring prompt — structured output, 0–100 score + reasoning | `bd-XXXX` |
| Build scoring pipeline: raw article → LLM call → score + rationale | `bd-XXXX` |
| Store scores and classification rationale in DB | `bd-XXXX` |
| Set initial relevance threshold at 40 for publication | `bd-XXXX` |
| Add logging for LLM call failures and latency | `bd-XXXX` |
| Run first batch, manually validate accuracy, tune prompt | `bd-XXXX` |
| Write unit tests for scoring service | `bd-XXXX` |

**Milestone:** Articles flowing in, scored, and stored in Postgres. No frontend yet.
**Update:** `memory/HANDOFF.md`, `strategy/learnings.md` with any prompt tuning discoveries.

---

## Week 2 — Content Generation & API (Days 8–14)

> Load: `.claude/skills/coding-patterns/SKILL.md` before API work

### Phase 2A: LLM Summary Generation (Days 8–9)

| Task | Beads |
|------|-------|
| Design summary prompt — concise, factual, no trading advice | `bd-XXXX` |
| Build summary pipeline: scored article → summary + "Why It Matters" | `bd-XXXX` |
| Build ticker extraction — identify impacted ASX/NYSE/NASDAQ tickers | `bd-XXXX` |
| Build category tagging (Infrastructure, Regulation, Applications, Chips, Models) | `bd-XXXX` |
| Store generated content linked to source articles | `bd-XXXX` |
| Add compliance check — reject summaries containing trading advice language | `bd-XXXX` |

**ADR required:** AI category taxonomy → log in `specs/decisions.md`

### Phase 2B: API Layer (Days 10–11)

| Task | Beads |
|------|-------|
| `GET /api/articles` — paginated feed, sorted by publish time | `bd-XXXX` |
| `GET /api/articles/[id]` — single article detail | `bd-XXXX` |
| `GET /api/tickers` — list all tagged tickers | `bd-XXXX` |
| `GET /api/articles?ticker=NVDA` — filter by ticker | `bd-XXXX` |
| `GET /api/articles?category=chips` — filter by category | `bd-XXXX` |
| Response caching headers (stale-while-revalidate) | `bd-XXXX` |
| Rate limiting middleware | `bd-XXXX` |
| Write API integration tests | `bd-XXXX` |

### Phase 2C: Pipeline Integration (Days 12–14)

| Task | Beads |
|------|-------|
| Wire full pipeline: ingest → score → filter → summarise → tag → publish | `bd-XXXX` |
| Add pipeline status tracking (processing, published, rejected) | `bd-XXXX` |
| Build admin health endpoint (articles/hour, error rate, avg score) | `bd-XXXX` |
| Run end-to-end with live sources for 48 hours | `bd-XXXX` |
| Tune relevance threshold based on false positive rate | `bd-XXXX` |
| Write integration tests for full pipeline | `bd-XXXX` |

**Milestone:** Full backend pipeline running autonomously. Articles queryable via API.
**Update:** `memory/HANDOFF.md`, `strategy/learnings.md`, tune any prompts.

---

## Week 3 — Frontend & Design (Days 15–21)

> Load: `.claude/skills/coding-patterns/SKILL.md` before component work

### Phase 3A: Homepage Feed (Days 15–17)

| Task | Beads |
|------|-------|
| Design and build homepage layout — clean, financial aesthetic | `bd-XXXX` |
| Article card component: headline, summary snippet, score badge, tickers, timestamp | `bd-XXXX` |
| Server-side rendering with ISR (revalidate every 60s) | `bd-XXXX` |
| Infinite scroll or "Load More" pagination | `bd-XXXX` |
| Auto-refresh indicator (new articles available) | `bd-XXXX` |
| Mobile responsive layout | `bd-XXXX` |

### Phase 3B: Article Detail Page (Days 18–19)

| Task | Beads |
|------|-------|
| Full summary with "Why It Matters" section | `bd-XXXX` |
| Clickable ticker tags (filter feed by ticker) | `bd-XXXX` |
| Category badges | `bd-XXXX` |
| Source attribution with link to original article | `bd-XXXX` |
| Relevance score visualisation | `bd-XXXX` |
| Related articles (same tickers or category) | `bd-XXXX` |

### Phase 3C: Navigation & Polish (Days 20–21)

| Task | Beads |
|------|-------|
| Category navigation bar (All, Infrastructure, Regulation, Chips, Models, Applications) | `bd-XXXX` |
| Ticker search / filter | `bd-XXXX` |
| Header with branding | `bd-XXXX` |
| Footer with disclaimer (not financial advice) | `bd-XXXX` |
| Loading states and error boundaries | `bd-XXXX` |
| SEO: meta tags, Open Graph, structured data | `bd-XXXX` |
| Favicon and brand assets | `bd-XXXX` |

**Milestone:** Fully functional frontend displaying live AI news. Browsable by category and ticker.

---

## Week 4 — Deployment, Caching & Hardening (Days 22–30)

### Phase 4A: Deployment (Days 22–23)

| Task | Beads |
|------|-------|
| Deploy frontend to Vercel (SSR + ISR) | `bd-XXXX` |
| Deploy Postgres to Neon | `bd-XXXX` |
| Deploy background worker (Railway or Proxmox Docker) | `bd-XXXX` |
| Configure environment variables across environments | `bd-XXXX` |
| Set up custom domain and SSL | `bd-XXXX` |

### Phase 4B: Performance & Caching (Days 24–25)

| Task | Beads |
|------|-------|
| CDN edge caching for feed pages | `bd-XXXX` |
| Database query caching (Vercel KV / Redis) | `bd-XXXX` |
| LLM response caching for identical articles | `bd-XXXX` |
| Verify page load times under 200ms | `bd-XXXX` |
| Compression (gzip/brotli) | `bd-XXXX` |
| Lighthouse audit — target 90+ performance | `bd-XXXX` |

### Phase 4C: Monitoring & Reliability (Days 26–27)

> Load: `.claude/skills/debugging/SKILL.md` — set up observability

| Task | Beads |
|------|-------|
| Error tracking (Sentry) | `bd-XXXX` |
| Pipeline health dashboard (articles/hour, error rate, avg score) | `bd-XXXX` |
| Uptime monitoring | `bd-XXXX` |
| Alerting for pipeline failures (ingestion stalls, LLM errors) | `bd-XXXX` |
| Graceful degradation when LLM provider is down | `bd-XXXX` |

### Phase 4D: Quality & Compliance (Days 28–29)

| Task | Beads |
|------|-------|
| Audit all articles for source attribution compliance | `bd-XXXX` |
| Review summaries for accidental trading advice language | `bd-XXXX` |
| Test relevance scoring accuracy — target <5% false positive rate | `bd-XXXX` |
| Add disclaimer banner and terms of use page | `bd-XXXX` |
| Manual QA pass across desktop and mobile | `bd-XXXX` |

### Phase 4E: Launch (Day 30)

| Task | Beads |
|------|-------|
| Final end-to-end test of full pipeline | `bd-XXXX` |
| Set up analytics (Plausible or PostHog) | `bd-XXXX` |
| Verify success metrics are measurable (time-to-publish, FP rate, session duration, return rate) | `bd-XXXX` |
| Soft launch to test group | `bd-XXXX` |
| Document known issues and V2 backlog in Beads | `bd-XXXX` |

**Milestone:** AIMarketWire live in production, ingesting and publishing AI market news autonomously.

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| LLM costs blow out from high article volume | High | Pre-filter with cheap keyword check before LLM, batch processing, cache responses |
| News source APIs change or rate limit | Medium | Multiple sources, RSS as fallback, ingestion retries with backoff |
| False positives erode trust | High | Two-stage scoring (keyword pre-filter + LLM deep score), weekly accuracy reviews |
| Publisher attribution complaints | High | Always link original, never reproduce full text, only use LLM summaries |
| Vercel cold starts slow SSR | Low | ISR with short revalidation, edge caching |
| Prompt drift degrades quality over time | Medium | Version prompts, log outputs, periodic manual review |

---

## Post-30 Day (V2 Backlog)

Track in Beads as low-priority issues:

1. Email/push alerts for high-relevance articles
2. User accounts with saved ticker watchlists
3. Historical trend charts (AI news volume over time)
4. API access for programmatic consumers
5. Premium tier scoping
6. Regional market filters

---

## Session Workflow Reminders

Every coding session on this project:

1. `/start-session` — loads HANDOFF.md, checks Beads
2. Load relevant skill before coding
3. Update `strategy/learnings.md` when you discover something
4. Log decisions in `specs/decisions.md` as ADRs
5. Commit format: `type(scope): description (bd-XXXX)`
6. `/end-session` — updates HANDOFF.md, closes Beads issues
