@AGENTS.md

# Portfolio Website — Claude Instructions

## Running the project

Node.js is not on the default PATH. Always prepend this before any `npm` or `node` command:

```bash
export PATH="/home/firas/node_modules/node/bin:$PATH"
```

Then:
```bash
npm run dev     # starts dev server on :3001 (port 3000 is taken by another app)
npm run build   # production build — run this to verify before committing
```

---

## Git & branching

- **Branch naming**: `feature/<short-description>` (e.g. `feature/related-posts`)
- **One feature per branch** — keep changes focused and reviewable
- **Always run `npm run build` before committing** — catches type errors that tests won't
- **PRs target `main`** by default unless intentionally stacking on another feature branch
- **Netlify auto-deploys on every push to `main`** — no manual deploy steps needed after the initial site setup
- **Conventional Commits** — prefix every commit message: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`. Subject line under 72 chars, imperative mood (e.g. `feat: add GitHub activity section`)
- **Semantic versioning** — tag significant milestones as releases: `git tag v1.0.0`. Bump MINOR for new sections, PATCH for fixes, MAJOR for full redesigns

---

## Stack — critical version constraints

| Package | Version | Why it matters |
|---|---|---|
| Next.js | 15.x | NOT 16 — Node 19 can't run Next.js 16 (requires Node 20+) |
| Tailwind CSS | **v3** | NOT v4 — v4's `@tailwindcss/oxide` Rust binary has no Node 19 build |
| React | 19.x | |
| Node.js | 19.8.1 (at `/home/firas/node_modules/node/bin/node`) | |

**Never upgrade Tailwind to v4 or Next.js to 16** without first upgrading Node to 20+.

If adding new npm packages, use `--legacy-peer-deps` only if needed. Do NOT install `@netlify/plugin-nextjs` locally — it conflicts with `/home/firas/node_modules`; it only runs during Netlify's cloud build.

---

## Next.js 15 conventions (read AGENTS.md first)

Always read `node_modules/next/dist/docs/` before implementing Next.js features — the API may differ from training data.

Key differences in Next.js 15:

- **`params` is a Promise** — always `await` it:
  ```ts
  // CORRECT
  const { slug } = await props.params;

  // WRONG — will break
  const { slug } = props.params;
  ```

- **Route props use global helpers** — no imports needed:
  ```ts
  export default async function Page(props: PageProps<'/blog/[slug]'>) { ... }
  export default function Layout(props: LayoutProps<'/dashboard'>) { ... }
  ```

- **All components are Server Components by default** — they run at build time, have filesystem access, no client JS shipped. Only add `"use client"` at the top of a file if you genuinely need browser APIs, event handlers, or React state (`useState`, `useEffect`). Avoid it unless necessary.

- **New pages need `generateStaticParams`** if they use dynamic route segments, otherwise they won't be pre-rendered:
  ```ts
  export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
  }
  ```

- **SEO metadata**: export a `generateMetadata` function (async, receives same props as the page) or a static `metadata` object. Always set title + description.

---

## Project structure conventions

```
app/          ← pages only (one page.tsx per route)
components/   ← reusable UI pieces, named in PascalCase
lib/          ← data-fetching and pure utility functions (no JSX)
content/posts/← markdown blog articles with frontmatter
public/       ← static assets (images, icons)
```

- **Components**: one component per file, filename = component name (e.g. `BlogCard.tsx` exports `BlogCard`).
- **Pages**: keep page files thin — delegate rendering to components, data fetching to `lib/`.
- **New data types**: define interfaces in `lib/posts.ts` (or a new `lib/*.ts` file) and export them. Import into pages/components.
- **`@/` alias** = project root. Use it for all internal imports: `@/components/Foo`, `@/lib/posts`.

---

## Tailwind CSS conventions (v3)

The design palette — stay consistent:

| Role | Classes |
|---|---|
| Page background | `bg-white` |
| Primary text | `text-slate-800` |
| Secondary/muted text | `text-slate-500`, `text-slate-400` |
| Accent / links | `text-blue-600`, `bg-blue-600` |
| Tag chips | `bg-blue-50 text-blue-600` |
| Card backgrounds | `bg-white border border-slate-100 rounded-xl shadow-sm` |
| Hover interaction | `hover:shadow-md hover:border-blue-100 transition-all` |
| Section backgrounds | alternate `bg-white` and `bg-slate-50` |
| Max content width | `max-w-5xl mx-auto px-6` (pages), `max-w-3xl mx-auto px-6` (blog posts) |

- **Do NOT use** `@import "tailwindcss"` or `@plugin` (that's Tailwind v4 syntax). Use `@tailwind base/components/utilities` in `globals.css`.
- **Do NOT add** a `tailwind.config.js` — the config is `tailwind.config.ts`.
- The `prose` class (from `@tailwindcss/typography`) is used on blog post article bodies. Apply it as: `prose prose-slate prose-lg max-w-none`.

---

## Blog system conventions

**Frontmatter schema** — every file in `content/posts/` must have:
```yaml
---
title: "Article Title Here"
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2"]
excerpt: "One or two sentence summary under ~160 chars."
---
```

**Slug** = the filename without `.md` (e.g. `guide-to-npe.md` → `/blog/guide-to-npe`).

**Adding a new article**: drop a `.md` file into `content/posts/` with the frontmatter above. No other changes needed — `getAllPosts()` and `generateStaticParams()` pick it up automatically.

**`lib/posts.ts` functions**:
- `getAllPosts()` — returns all posts sorted newest first (for the listing page)
- `getPostBySlug(slug)` — returns one post with rendered HTML (for the post page)
- `getAllSlugs()` — returns slug list for `generateStaticParams`
- `getRelatedPosts(slug, tags)` — returns top 3 posts by tag overlap, excludes current post (for the related posts section)

Do not add database or network calls here — this is a static site; all data comes from the filesystem at build time.

---

## What does NOT exist yet (planned future work)

- Projects / side-projects section
- Blog images (articles referencing GitHub-hosted images will have broken image links until images are copied to `public/` and paths updated)
- Dark mode
- LinkedIn link in Contact section
- **Dedicated About section** — fuller bio beyond the hero tagline; include photo, background story, what drives you (2-3 paragraphs)
- **GitHub activity / stats section** — embed contribution graph or stats badge to show active development
- **Resume / CV download** — a downloadable PDF linked from the hero or nav
- **CI/CD pipeline** — GitHub Actions workflow that runs `npm run build` on every PR to catch build failures before merge
