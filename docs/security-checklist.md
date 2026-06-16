# Security Checklist (my-website)

This is a fully static Next.js site (no API routes, no server runtime, no
auth, no user data) deployed to Netlify. Most "web app" security concerns
don't apply — this checklist covers what's actually relevant.

## Dependency Security

```bash
npm audit
npm audit --audit-level=critical
```

- [ ] Lockfile committed; installs use `npm ci`
- [ ] New dependencies reviewed for maintenance + `postinstall` scripts

## Markdown Content (`content/posts/`)

- [ ] Blog content stays developer-authored (not user-submitted) — if that
  ever changes, sanitize HTML output from `remark-html` before rendering
- [ ] No raw `dangerouslySetInnerHTML` outside the existing markdown→HTML
  pipeline in `lib/posts.ts`

## External Links

- [ ] Links with `target="_blank"` use `rel="noopener noreferrer"`
  (prevents the new tab from accessing `window.opener`)

## Client-Side Storage

- [ ] Dark mode preference (`ThemeToggle`, localStorage) — no sensitive data
  stored client-side; this is fine as-is, just don't extend localStorage
  usage to anything sensitive

## Build & Deploy

- [ ] `npm run build` passes before merging (catches type errors and broken
  static generation)
- [ ] No secrets needed for this site — if a future feature introduces an
  API key (e.g. a contact form provider), add it via Netlify environment
  variables, never commit it
