# Codebase Audit Design — my-website

**Date:** 2026-06-14
**Status:** Approved

## Context

The portfolio site (`my-website`) has grown through several feature PRs (blog system, tags, GitHub activity, hero code editor, etc.). Firas wants a major review to surface potential bugs and "spaghetti code" / structural issues before continuing to build new features, and to decide whether cleanup is warranted.

## Scope

- Limited to the `my-website` repo only (not the wider monorepo).
- Covers `app/`, `components/`, `lib/` (~1,839 lines across 32 files as of 2026-06-14).
- Blind full sweep — no specific area flagged in advance.
- Read-only analysis only; no production code changes in this pass.

## Approach

### 1. Baseline checks (run directly, not via agent)

- `npm run build` — surfaces TypeScript/type errors and build failures.
- Check for an ESLint config; if present, run lint and capture output.

### 2. Two concern-based review agents (parallel, read-only)

- **Agent A — Correctness**: scans `app/`, `components/`, `lib/` for actual/potential bugs — logic errors, edge cases, incorrect Next.js 15 patterns (e.g. unguarded `params` access), broken data flow, accessibility issues.
- **Agent B — Structure & quality**: same codebase, looks for spaghetti-code signals — duplicated logic/components, dead code/unused exports, files doing too much, naming inconsistencies, deviations from CLAUDE.md conventions (Tailwind palette, `@/` alias, app/components/lib separation).

### 3. Consolidated findings report

- Merge both agents' findings + baseline build/lint output into one markdown report: `docs/codebase-review-2026-06-14.md`.
- Each finding includes: file + line numbers, category (bug / duplication / dead-code / structure / convention), severity (high/medium/low), description, suggested direction.
- Grouped by file/area, with a summary table at the top (counts by category/severity).
- Committed on branch `feature/codebase-audit`, opened as its own PR (report only — no production code changes).

### 4. Triage & follow-up

- Once the report PR is up, Firas and Claude go through findings together.
- Each item to act on becomes its own small `feature/<name>` branch + PR (build → `/code-review` → push, per existing CLAUDE.md conventions) — one item or tightly-related group per branch.
- Items not worth doing stay documented in the report as acknowledged, not silently dropped.

## Out of scope

- No production code edits as part of this audit pass.
- Does not cover `menu-visualizer` or other repos in the monorepo.

## Verification

- Audit report PR is up, build/lint baseline included, all findings have file/line references and severity.
- Firas reviews the report and selects items for follow-up work.
