# Project: AIMarketWire

> AI-driven trading news platform that filters, scores, and summarises only AI-relevant market news for traders and investors.

## Owner

Daniel — Printforge (printforge.com.au) — Linux / Proxmox / Docker

## Quick Reference

| Need | Location |
|------|----------|
| Full PRD / product spec | `strategy/AIMarketWire-project-prd.md` |
| 30-day launch plan | `strategy/30-day-plan.md` |
| Project memory & learnings | `strategy/learnings.md` |
| Task tracking | `strategy/todo-list.md` |
| Architecture decisions | `specs/decisions.md` |
| Known bugs | `specs/bugs/` |
| My profile & preferences | `.claude/rules/memory-*.md` (auto-loaded) |
| Coding patterns | `.claude/skills/coding-patterns/SKILL.md` |
| Testing approach | `.claude/skills/testing/SKILL.md` |
| Debugging playbook | `.claude/skills/debugging/SKILL.md` |
| Documentation standards | `.claude/skills/documentation/SKILL.md` |
| Session handoff state | `memory/HANDOFF.md` |

## Stack

- **Runtime:** Node 20 (LTS)
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** PostgreSQL (Neon serverless)
- **ORM:** Drizzle ORM
- **Package Manager:** pnpm
- **LLM:** Claude API via abstraction layer (swappable)
- **Caching:** Vercel KV (Redis)
- **Background Jobs:** Inngest (serverless) or BullMQ on Railway
- **Deployment:** Vercel (frontend/API) + Railway or Proxmox Docker (workers)

## Commands

```bash
pnpm dev               # dev server
pnpm test              # tests
pnpm lint              # lint / format
pnpm build             # build
pnpm db:migrate        # run database migrations
pnpm db:studio         # open Drizzle Studio
pnpm ingest            # manual ingestion run
```

## Beads (Agent Memory / Issue Tracking)

```bash
bd list                        # all open issues
bd ready --json                # next actionable task
bd create "description" -p 1   # create P1 issue
bd close bd-XXXX               # close completed issue
```

## Workflow

1. **Session start:** Read `memory/HANDOFF.md`, run `bd ready --json`
2. **Before coding:** Read relevant skill in `.claude/skills/`
3. **During work:** Update memory files AS YOU GO (see below)
4. **After changes:** Run tests, update beads
5. **Session end:** Update `memory/HANDOFF.md`, commit

## Commit Format

`type(scope): description (bd-XXXX)`
Types: feat, fix, refactor, docs, test, chore

## Key Warnings

- ⚠️ Never output trading advice, price targets, or buy/sell recommendations in generated content
- ⚠️ Always include source attribution and link to original article — publisher compliance is non-negotiable
- ⚠️ LLM provider must stay behind abstraction layer — never call Claude/OpenAI directly from business logic
- ⚠️ Always update HANDOFF.md before ending a session
- ⚠️ Always include beads issue ID in commit messages

---

### Auto-Update Memory (MANDATORY)

**Update memory files AS YOU GO, not at the end.** When you learn something new, update immediately.

| Trigger | Action |
|---------|--------|
| User shares a fact about themselves | → Update `.claude/rules/memory-profile.md` |
| User states a preference | → Update `.claude/rules/memory-preferences.md` |
| A decision is made | → Update `.claude/rules/memory-decisions.md` with date |
| Completing substantive work | → Add to `.claude/rules/memory-sessions.md` |
| Discovery, gotcha, or workaround | → Add to `strategy/learnings.md` |
| Bug found | → Create file in `specs/bugs/` |
| Architecture decision | → Add entry to `specs/decisions.md` |

**Skip:** Quick factual questions, trivial tasks with no new info.

**DO NOT ASK. Just update the files when you learn something.**

---

### Progressive Disclosure

Do NOT read everything upfront. Load context as needed:
- Product questions → `strategy/AIMarketWire-project-prd.md`
- Architecture → `specs/decisions.md`
- Coding how-to → `.claude/skills/[topic]/SKILL.md`
- Current priorities → `bd ready --json`
- Where we left off → `memory/HANDOFF.md`
- What we've learned → `strategy/learnings.md`
