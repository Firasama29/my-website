# Codebase Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run a full read-only audit of `my-website` (app/, components/, lib/) — baseline build/lint + two parallel review agents — and produce a consolidated findings report committed on a feature branch PR for triage.

**Architecture:** Two concern-based agents read the same 32-file codebase in parallel: Agent A hunts correctness bugs, Agent B hunts structural/quality issues. Their outputs are merged with build/lint results into a single markdown report. No production code is changed in this pass — the PR contains only the findings report and the audit spec doc.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, ESLint (eslint.config.mjs with `eslint-config-next/core-web-vitals` + `typescript` rules), Node 19.8.1

> **Note:** This is an analysis/reporting task. There is no application code to write and no TDD cycle. Steps are: run command → capture output → compile report.

**Node PATH:** Prepend to every `npm`/`node` command:
```bash
export PATH="/home/firas/node_modules/node/bin:$PATH"
```

---

### Task 1: Set up feature branch and run baseline checks

**Files:**
- No code files modified
- Captures: build output and lint output (used in Task 4)

- [ ] **Step 1: Sync main and create feature branch**

```bash
git checkout main && git pull
git checkout -b feature/codebase-audit
```

Expected: branch `feature/codebase-audit` checked out, clean working tree.

- [ ] **Step 2: Run build and capture output**

```bash
export PATH="/home/firas/node_modules/node/bin:$PATH"
npm run build 2>&1 | tee /tmp/audit-build.txt
echo "Exit code: $?"
```

Expected: either `✓ Compiled successfully` (no findings) or TypeScript/build errors to include as HIGH bug findings in the report.

- [ ] **Step 3: Run lint and capture output**

```bash
export PATH="/home/firas/node_modules/node/bin:$PATH"
npm run lint -- app components lib 2>&1 | tee /tmp/audit-lint.txt
echo "Exit code: $?"
```

Expected: either `✔ No ESLint warnings or errors` or a list of lint warnings/errors to include in the report.

---

### Task 2: Run Agent A — Correctness Review

**Can run in parallel with Task 3.**

- [ ] **Step 1: Dispatch Agent A with this exact prompt**

Dispatch a general-purpose agent (read-only, no file edits) with the prompt below. Collect its full markdown output for Task 4.

---
**AGENT A PROMPT:**

You are a code correctness reviewer for a Next.js 15 portfolio website. Scan the codebase for bugs, potential runtime errors, and correctness issues. Do NOT edit any files — read only and report findings.

Working directory: `/home/firas/private-projects/claude/repositories/my-website`

**Read every file listed below:**
```
app/blog/page.tsx
app/blog/[slug]/page.tsx
app/blog/tags/[tag]/page.tsx
app/globals.css
app/layout.tsx
app/page.tsx
components/BlogCard.tsx
components/BlogList.tsx
components/BlogPagination.tsx
components/CodeBlock.tsx
components/CodeWindow.tsx
components/Contact.tsx
components/GitHubActivity.tsx
components/Hero.tsx
components/MobileNav.tsx
components/Navbar.tsx
components/PostNavigation.tsx
components/Projects.tsx
components/RelatedPosts.tsx
components/Skills.tsx
components/TableOfContents.tsx
components/ThemeToggle.tsx
components/ui/badge.tsx
components/ui/button.tsx
components/ui/card.tsx
components/ui/sheet.tsx
lib/github.ts
lib/posts.ts
lib/tags.ts
lib/utils.ts
```

**What to look for:**

1. **Next.js 15 `params`/`searchParams` not awaited** — In Next.js 15 these are Promises. Any page/component that destructures them directly without `await` is broken at runtime. Example of broken pattern: `const { slug } = props.params` — must be `const { slug } = await props.params`.

2. **Logic bugs** — Incorrect conditions, off-by-one errors, wrong variable referenced, return values ignored.

3. **Missing null/undefined guards on external data** — `lib/github.ts` makes GitHub API calls. Check for missing error handling, null checks on response fields, unhandled rejected promises, no fallback if rate-limited or API is down.

4. **Missing error handling in `lib/posts.ts`** — File I/O and markdown parsing can fail. Check for try/catch gaps and malformed frontmatter scenarios.

5. **Unnecessary `"use client"` directives** — If a component marked `"use client"` has no `useState`, `useEffect`, `useRef`, event handlers, or browser-only APIs (`window`, `document`, etc.), it should be a Server Component. Flag these.

6. **Accessibility issues** — `<img>` tags missing `alt`, interactive elements (`<button>`, `<a>`) missing discernible text or `aria-label`, missing `role` attributes where needed.

7. **Type assertions masking errors** — `as SomeType` casts that could hide a genuine type mismatch.

8. **Dead/unreachable code** — Branches that can never execute given the types and logic.

9. **React `key` prop missing in `.map()` calls.**

**Output format — return as plain markdown, no preamble or summary, just this structure:**

```
## Agent A — Correctness Findings

### app/blog/[slug]/page.tsx
- **[BUG][H]** Line 12: `props.params` is destructured without `await`. In Next.js 15 params is a Promise — this will throw at runtime. **Fix direction:** Change to `const { slug } = await props.params`.

### lib/github.ts
- **[BUG][M]** Line 34: No null check on `data.viewer` before accessing `.repositories`. If the API returns an unexpected shape the component will crash. **Fix direction:** Add a guard `if (!data?.viewer) return null` before accessing nested fields.
```

Category: BUG (all Agent A findings are correctness bugs).
Severity: H = will cause a runtime crash or data loss, M = likely bug or edge-case failure, L = minor or theoretical issue.
Omit files with zero findings. If the entire codebase is clean, write "No correctness findings."

---

- [ ] **Step 2: Verify Agent A returned findings in the correct format**

Check that the output starts with `## Agent A — Correctness Findings` and each finding has `[H]`, `[M]`, or `[L]` severity. If the format is wrong, ask the agent to reformat before proceeding to Task 4.

---

### Task 3: Run Agent B — Structure & Quality Review

**Can run in parallel with Task 2.**

- [ ] **Step 1: Dispatch Agent B with this exact prompt**

Dispatch a general-purpose agent (read-only, no file edits) with the prompt below. Collect its full markdown output for Task 4.

---
**AGENT B PROMPT:**

You are a code quality and architecture reviewer for a Next.js 15 portfolio website. Scan the codebase for spaghetti code, duplication, dead code, and convention violations. Do NOT edit any files — read only and report findings.

Working directory: `/home/firas/private-projects/claude/repositories/my-website`

**Read every file listed below, plus `CLAUDE.md` for project conventions:**
```
CLAUDE.md
app/blog/page.tsx
app/blog/[slug]/page.tsx
app/blog/tags/[tag]/page.tsx
app/globals.css
app/layout.tsx
app/page.tsx
components/BlogCard.tsx
components/BlogList.tsx
components/BlogPagination.tsx
components/CodeBlock.tsx
components/CodeWindow.tsx
components/Contact.tsx
components/GitHubActivity.tsx
components/Hero.tsx
components/MobileNav.tsx
components/Navbar.tsx
components/PostNavigation.tsx
components/Projects.tsx
components/RelatedPosts.tsx
components/Skills.tsx
components/TableOfContents.tsx
components/ThemeToggle.tsx
components/ui/badge.tsx
components/ui/button.tsx
components/ui/card.tsx
components/ui/sheet.tsx
lib/github.ts
lib/posts.ts
lib/tags.ts
lib/utils.ts
```

**What to look for:**

1. **Duplication [DUPL]** — Logic or UI patterns repeated in ≥2 files that could be unified. Examples: identical data-fetching calls, the same Tailwind class combinations copy-pasted, utility functions reimplemented in multiple places.

2. **Dead code / unused exports [DEAD]** — Functions, components, types, or variables that are exported but never imported anywhere in the codebase. Pay special attention to `components/ThemeToggle.tsx` (dark mode is listed as "not yet implemented" in CLAUDE.md — is this component actually used?). Also check for unused props in component interfaces.

3. **Structure / doing too much [STRUCT]** — Files over ~100 lines where unrelated concerns are mixed. Business logic or data fetching inside UI components that belongs in `lib/`. Components that render multiple distinct UI sections and should be split. Per CLAUDE.md: pages should be thin (delegate to components), lib/ handles data.

4. **Convention violations [CONV]** per CLAUDE.md:
   - All internal imports must use the `@/` alias (not `../../` relative paths)
   - Tailwind palette: page background `bg-white`, primary text `text-slate-800`, secondary `text-slate-500`/`text-slate-400`, accent `text-blue-600`/`bg-blue-600`, tag chips `bg-blue-50 text-blue-600`, cards `bg-white border border-slate-100 rounded-xl shadow-sm`, max width `max-w-5xl mx-auto px-6` for pages / `max-w-3xl mx-auto px-6` for blog posts
   - One component per file, filename matches component name (PascalCase)
   - Only add `"use client"` when genuinely needed for browser APIs/state/event handlers

5. **Naming inconsistencies [CONV]** — Components or functions named differently from their files, prop names that don't follow a consistent pattern across similar components.

**Output format — return as plain markdown, no preamble or summary, just this structure:**

```
## Agent B — Structure & Quality Findings

### components/ThemeToggle.tsx
- **[DEAD][H]** Global: Component is exported but never imported in any other file. Dark mode is noted as unimplemented in CLAUDE.md. **Fix direction:** Remove the file or add a TODO comment linking to the planned dark mode work.

### components/GitHubActivity.tsx
- **[STRUCT][M]** Lines 1–210: Component fetches data, formats dates, and renders both the heatmap and the stats section. The data-fetching/transformation logic should live in lib/github.ts and the two visual sections could be split into sub-components. **Fix direction:** Extract data prep to lib/github.ts; split into GitHubHeatmap and GitHubStats sub-components.
```

Severity: H = clear problem worth fixing soon, M = worth fixing but not urgent, L = minor polish.
Omit files with zero findings. If the entire codebase is clean, write "No structure/quality findings."

---

- [ ] **Step 2: Verify Agent B returned findings in the correct format**

Check that the output starts with `## Agent B — Structure & Quality Findings` and each finding has a `[CATEGORY]` tag and `[H]`, `[M]`, or `[L]` severity. If the format is wrong, ask the agent to reformat before proceeding to Task 4.

---

### Task 4: Compile consolidated findings report

**Files:**
- Create: `docs/codebase-review-2026-06-15.md`

- [ ] **Step 1: Read baseline output**

```bash
cat /tmp/audit-build.txt
cat /tmp/audit-lint.txt
```

Note whether build/lint passed cleanly or produced errors. Build errors = HIGH bug findings. Lint warnings = CONV findings.

- [ ] **Step 2: Write the consolidated report**

Create `docs/codebase-review-2026-06-15.md` with this structure, filling in real data from the build/lint output and both agents' findings:

```markdown
# Codebase Audit Findings — my-website
**Date:** 2026-06-15
**Audited:** `app/`, `components/`, `lib/` — 32 files, ~1,839 lines
**Branch:** feature/codebase-audit

---

## Build & Lint Baseline

### npm run build
[paste full output, or "✓ Build passed with no errors"]

### npm run lint
[paste full output, or "✓ No ESLint warnings or errors"]

---

## Summary

| Category | High | Medium | Low | Total |
|---|---|---|---|---|
| Bug / Correctness | | | | |
| Duplication | | | | |
| Dead Code | | | | |
| Structure | | | | |
| Convention | | | | |
| **Total** | | | | |

---

## Findings by File

[Merge Agent A and Agent B findings here, grouped by filename.
If both agents flagged the same file, list all findings together under one heading.
Sort files: app/ first, then components/, then lib/.
Each finding keeps its original format: severity, line, description, fix direction.]

---

## Files with No Findings

[List any files that both agents reported as clean, for completeness.]
```

- [ ] **Step 3: Fill in the summary table**

Count findings from both agents by category and severity. Fill in the table cells. If build/lint had errors, count them under Bug/Correctness.

---

### Task 5: Commit report and open PR

**Files:**
- Add (untracked): `docs/superpowers/specs/2026-06-14-codebase-audit-design.md`
- Add (new): `docs/codebase-review-2026-06-15.md`

- [ ] **Step 1: Stage both files and commit**

```bash
git add docs/superpowers/specs/2026-06-14-codebase-audit-design.md
git add docs/codebase-review-2026-06-15.md
git commit -m "$(cat <<'EOF'
docs: add codebase audit spec and findings report

Full read-only audit of app/, components/, lib/ (~1,839 lines).
Includes build/lint baseline, correctness review, and structure/quality
review. No production code changes — findings are for triage only.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 2: Push and open PR**

```bash
git push -u origin feature/codebase-audit
gh pr create \
  --title "docs: codebase audit findings — my-website (2026-06-15)" \
  --body "$(cat <<'EOF'
## Summary

- Full read-only audit of \`app/\`, \`components/\`, \`lib/\` (~1,839 lines, 32 files)
- Two parallel review agents: correctness bugs + structure/quality issues
- Build/lint baseline included
- **No production code changes in this PR** — findings are for triage only

## Next steps

Review the findings in \`docs/codebase-review-2026-06-15.md\`. Each item to act on will become its own \`feature/<name>\` branch + PR.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Check out main**

```bash
git checkout main && git pull
```

---

## Triage guide (post-PR)

After the PR is merged, go through findings together:

- **Fix now** → open a `feature/<name>` branch, run build before commit, `/code-review` before push
- **Fix later** → open a GitHub issue labeled `tech-debt` or `code-quality`
- **Not worth fixing** → note in the findings doc as acknowledged, close without action
