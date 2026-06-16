# Codebase Audit Findings — my-website
**Date:** 2026-06-15
**Audited:** `app/`, `components/`, `lib/` — 32 files, ~1,839 lines
**Branch:** feature/codebase-audit
**Method:** Build/lint baseline + two parallel review agents (correctness & structure/quality)

---

## Build & Lint Baseline

### `npm run build`
```
✓ Compiled successfully in 4.0s
✓ Linting and checking validity of types ...

./components/CodeWindow.tsx
  111:9  Warning: 'cm' is assigned a value but never used
  113:9  Warning: 'fn' is assigned a value but never used

./lib/posts.ts
  132:20  Warning: '_score' is defined but never used

✓ Generating static pages (45/45)
Exit code: 0
```

Build passes. 3 lint warnings (unused variables). No type errors.

**Notable:** `/blog` renders as Dynamic (ƒ — server-rendered on demand) rather than SSG, while all other pages are static. This may be intentional if the blog list needs fresh data, but worth confirming.

### `npm run lint`
```
3 problems (0 errors, 3 warnings)
  components/CodeWindow.tsx:111  'cm' assigned but never used
  components/CodeWindow.tsx:113  'fn' assigned but never used
  lib/posts.ts:132               '_score' defined but never used
Exit code: 0
```

---

## Summary

| Category | High | Medium | Low | Total |
|---|---|---|---|---|
| Bug / Correctness | 0 | 2 | 4 | **6** |
| Duplication | 0 | 4 | 0 | **4** |
| Dead Code | 4 | 2 | 1 | **7** |
| Structure | 0 | 2 | 1 | **3** |
| Convention | 0 | 0 | 2 | **2** |
| **Total** | **4** | **10** | **8** | **22** |

---

## Findings by File

---

### `app/globals.css`

- **[DEAD][H]** Lines 5–17: The `--background` / `--foreground` CSS custom properties and the `.dark {}` override block are defined but never referenced outside this file. All dark-mode theming in the rest of the codebase uses Tailwind's `dark:` utilities directly. Additionally, the `body { ... font-family: Arial, Helvetica, sans-serif }` rule overrides Tailwind's `font-sans` and the `Geist` font loaded in `layout.tsx`. **Fix direction:** Remove the `--background`/`--foreground` variables and the `.dark` block. Replace the `body` font rule with a reference to `var(--font-geist-sans)` (which `layout.tsx` already injects onto `<html>`).

---

### `app/layout.tsx`

- **[DEAD][M]** Lines 7–9, 46: The `Geist` sans font is imported, loaded, and its CSS variable (`--font-geist-sans`) is injected on `<html>`, but `--font-geist-sans` is never referenced anywhere — not in `globals.css`, not in any component, not in `tailwind.config.ts`. The `globals.css` body rule overwrites with Arial anyway. **Fix direction:** Either reference `var(--font-geist-sans)` in `globals.css` (replacing the Arial rule), or remove the `Geist` import and variable from `layout.tsx`.

---

### `app/blog/[slug]/page.tsx`

- **[DUPL][M]** Lines 38–42: Date formatting (`new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })`) is copy-pasted identically from `components/BlogCard.tsx` (lines 24–28). A third near-identical copy exists in `components/GitHubActivity.tsx` (`formatDate`, differing only in `month: "short"`). **Fix direction:** Extract a `formatPostDate(date: string): string` helper into `lib/utils.ts` and import it in `BlogCard.tsx` and `blog/[slug]/page.tsx`. Extend it with a `month` option for `GitHubActivity.tsx`.

---

### `app/blog/tags/[tag]/page.tsx`

- **[DUPL][M]** Lines 10, 15, 26: `getAllTags()` is called three separate times within the same file (once in `generateStaticParams`, once in `generateMetadata`, once in the page component). The `getAllTags().find(t => slugifyTag(t) === tag)` lookup is duplicated between `generateMetadata` and the page body. **Fix direction:** Extract a `findTagBySlug(slug: string)` helper into `lib/tags.ts` that encapsulates the `getAllTags().find(...)` pattern and call it in both places.

---

### `components/BlogCard.tsx`

- **[DUPL][M]** Lines 24–28: Identical date formatting to `app/blog/[slug]/page.tsx`. See finding above. **Fix direction:** Use a shared `formatPostDate` utility from `lib/utils.ts`.

---

### `components/CodeWindow.tsx`

- **[DEAD][H]** Line 111: `cm` is declared inside `buildJavaHtml()` but never used — the Java snippet has no comments. This is the `CodeWindow.tsx:111` lint warning. **Fix direction:** Remove the `cm` declaration from `buildJavaHtml`.

- **[DEAD][H]** Line 113: `fn` is declared inside `buildJavaHtml()` but never used — the Java snippet has no function call. This is the `CodeWindow.tsx:113` lint warning. **Fix direction:** Remove the `fn` declaration from `buildJavaHtml`.

- **[DUPL][M]** Lines 107–210: Each of the four `buildXHtml()` functions independently redeclares `kw`, `str`, `cm`, `fn`, `cls`, `num` as identical tagged-span helpers, differing only in which subset is used. The same inline wrapper pattern is repeated ~20 times across four functions. **Fix direction:** Extract a `makeSpanHelpers(styles)` factory at module scope that returns all helpers keyed by token type, then call it once at the top of each builder. Alternatively, hoist the helpers to module scope since they only depend on the module-level `styles` import.

---

### `components/Contact.tsx`

- **[BUG][L]** Line 24: `target="_blank"` links have no indicator that they open in a new tab. The accessibility checklist (`docs/accessibility-checklist.md`) explicitly flags this — screen reader and keyboard users get no warning. **Fix direction:** Add `aria-label` text noting "opens in new tab" (e.g. `aria-label="GitHub profile (opens in new tab)"`) or a visually-hidden `<span className="sr-only"> (opens in new tab)</span>` inside each link.

---

### `components/GitHubActivity.tsx`

- **[BUG][M]** Line 52: `Math.max(...calendar.weeks.flatMap(...))` will produce `-Infinity` if the GitHub API returns a calendar with zero weeks (empty `weeks` array). The `getLevel(count, max)` guard at line 20 only checks `max === 0`, not `max === -Infinity`, so any non-zero contribution count falls through to ratio-based bucketing with `count / -Infinity = -0`. This silently miscolors all contribution tiles. **Fix direction:** Change the guard to `if (count === 0 || max <= 0) return 0`, or clamp: `const safeMax = max <= 0 ? 1 : max`.

- **[BUG][L]** Lines 74, 154, 190: `target="_blank"` links with no new-tab indicator. Same issue as `Contact.tsx`. **Fix direction:** Same as above — `aria-label` or `sr-only` span per link.

- **[STRUCT][M]** Lines 1–210: This file mixes four distinct concerns: GitHub API fetching (delegated to `lib/github.ts` — good), contribution calendar grid rendering, repo card rendering, and private utility functions (`getCellClass`, `getLevel`, `buildMonthLabels`, `formatDate`). **Fix direction:** Not urgent for a static site, but consider splitting the calendar grid into a `ContributionCalendar` sub-component and extracting `formatDate` into `lib/utils.ts` (it's a generic date formatter used nowhere else currently).

- **[CONV][L]** Lines 204–209: `formatDate` is a third copy of a date-formatting pattern, differing from the blog date format only in `month: "short"` vs `"long"`. **Fix direction:** Centralize in `lib/utils.ts` with a `monthStyle?: "long" | "short"` option.

---

### `components/Hero.tsx`

- **[CONV][L]** Lines 2–3: `CodeWindow` is imported via a relative path (`"./CodeWindow"`) instead of the `@/` alias required by CLAUDE.md. (`"./Hero.module.css"` is acceptable — CSS module imports are conventionally relative.) **Fix direction:** Change line 3 to `import CodeWindow from "@/components/CodeWindow"`.

---

### `components/MobileNav.tsx`

- **[BUG][L]** Line 22: The `<nav>` inside the mobile `Sheet` has no `aria-label`. On blog post pages, there are three simultaneous `<nav>` landmarks (`Navbar`, `PostNavigation`, `MobileNav`) and multiple unlabelled navs violate WCAG 2.4.1. **Fix direction:** Add `aria-label="Mobile navigation"` to the `<nav>` element.

---

### `components/Navbar.tsx`

- **[BUG][L]** Line 7: The main `<nav>` element has no `aria-label`. Multiple unlabelled `<nav>` landmarks on the same page (blog post pages have at least three) make screen-reader navigation ambiguous. Explicitly flagged in `docs/accessibility-checklist.md`. **Fix direction:** Add `aria-label="Main navigation"` to the `<nav>`.

---

### `components/Projects.tsx`

- **[BUG][L]** Lines 58, 67: `target="_blank"` links with no new-tab indicator. Same issue as `Contact.tsx` and `GitHubActivity.tsx`. **Fix direction:** Same fix.

- **[STRUCT][L]** Lines 1–7: The `Project` interface and the `projects` data array are defined directly inside the component file. Per CLAUDE.md, data types and static data belong in `lib/`. **Fix direction:** Move `Project` and `projects` to `lib/projects.ts` and import them.

---

### `components/ThemeToggle.tsx`

- **[BUG][L]** Line 35: `aria-label="Toggle dark mode"` is a static string regardless of current theme state. The accessibility checklist requires the label to reflect the action the button will take. **Fix direction:** Make it dynamic: `aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}`.

> **Note (Agent B):** `ThemeToggle` IS imported and used in `app/layout.tsx` (lines 5, 60). It is **not** dead code. Dark mode is live.

---

### `components/ui/button.tsx`

- **[DEAD][H]** Lines 1–54: `Button` and `buttonVariants` are exported but never imported anywhere in the codebase — no component or page references `@/components/ui/button`. **Fix direction:** Remove the file entirely, or retain it only if a Button component is planned for near-term use (not mentioned in CLAUDE.md future work).

- **[BUG][L]** Line 1: `"use client"` is present despite the component having no `useState`, `useEffect`, `useRef`, or browser-only APIs. `React.forwardRef` and `@radix-ui/react-slot` are both server-safe. (Secondary concern given the file is unused — resolve by deleting the file per the finding above.)

---

### `lib/github.ts`

- **[BUG][M]** Line 36: `return await res.json()` casts the response directly to `GitHubRepo[]` without shape validation. A malformed or unexpected 200 response body (e.g. GitHub error envelope) returns a non-array, causing `repos.length` in `GitHubActivity.tsx` (lines 49, 147) to throw `TypeError: Cannot read properties of undefined`. **Fix direction:** Add an `Array.isArray` guard: `const data = await res.json(); return Array.isArray(data) ? data : [];`.

---

### `lib/posts.ts`

- **[DUPL][M]** Lines 38, 58: `readingTime` is computed with the identical expression (`Math.ceil(content.trim().split(/\s+/).length / 200)`) in both `getAllPosts()` and `getPostBySlug()`. **Fix direction:** Extract a private `computeReadingTime(content: string): number` helper at the top of the file and call it in both places.

- **[DEAD][M]** Line 132: `_score` is the underscore-prefixed destructure in `getRelatedPosts` to intentionally discard the score field. The lint warning suggests the prefix convention isn't suppressing the rule here. This is intentional but the lint warning creates noise. **Fix direction:** Either configure ESLint to ignore `_`-prefixed vars, or restructure: `.map((p) => { const { score: _, ...rest } = p; return rest; })` with explicit discard.

- **[DEAD][L]** Line 139: The `AdjacentPosts` interface is exported but never imported by any file outside `lib/posts.ts`. Consumers use the inferred return type of `getAdjacentPosts` rather than importing the type by name. **Fix direction:** Remove the `export` keyword to make it a local type, or retain it as a documented public API type — minor either way.

---

### `lib/tags.ts`

- **[STRUCT][M]** Global: `getAllTags()` is defined in `lib/posts.ts` (line 135) but its natural home is `lib/tags.ts`, which already owns all other tag logic (`slugifyTag`, `getTagColorClasses`, `TAG_CATEGORIES`). Callers must currently know to import `getAllTags` from `lib/posts` while importing `slugifyTag` from `lib/tags` — a confusing split. **Fix direction:** Move `getAllTags` into `lib/tags.ts`. It already calls `getAllPosts()`, which can be imported from `lib/posts`. Update call sites (`app/blog/tags/[tag]/page.tsx`, `app/blog/page.tsx`) to import `getAllTags` from `@/lib/tags`.

---

## Files with No Findings

The following files were reviewed by both agents and have no findings:

- `app/page.tsx`
- `app/layout.tsx` *(one DEAD finding above)*
- `components/BlogList.tsx`
- `components/BlogPagination.tsx`
- `components/CodeBlock.tsx`
- `components/PostNavigation.tsx`
- `components/RelatedPosts.tsx`
- `components/Skills.tsx`
- `components/TableOfContents.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `components/ui/sheet.tsx`
- `lib/utils.ts`

---

## Triage Guide

Go through findings together. For each item:

- **Fix now** → open a `feature/<name>` branch, `npm run build` before committing, `/code-review` before push
- **Fix later** → open a GitHub issue labeled `tech-debt` or `code-quality`
- **Not worth fixing** → note here as acknowledged and close without action

### Quick wins (low effort, clear value)
- `Navbar.tsx` + `MobileNav.tsx` aria-labels (2 lines each)
- `Hero.tsx` `@/` import fix (1 line)
- `components/ui/button.tsx` delete (entire file)
- `CodeWindow.tsx:111,113` remove unused vars (2 lines)
- `lib/github.ts` Array.isArray guard (2 lines)
- `GitHubActivity.tsx:52` Math.max guard (1 line)
- `ThemeToggle.tsx` dynamic aria-label (1 line)

### Medium effort, good payoff
- Date formatting utility in `lib/utils.ts` (consolidates 3 copies)
- Move `getAllTags` to `lib/tags.ts`
- `readingTime` helper in `lib/posts.ts`
- `globals.css` CSS variable cleanup

### Larger refactors (evaluate carefully)
- `CodeWindow.tsx` span helper factory (reduces ~20 repeated patterns)
- `GitHubActivity.tsx` split into sub-components
- `target="_blank"` new-tab indicators (scattered across 3 components)
- `Projects.tsx` data → `lib/projects.ts`
