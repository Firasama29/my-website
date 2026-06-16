# Accessibility Checklist (my-website)

Quick reference for WCAG 2.1 AA. Check before shipping changes to
navigation, the dark mode toggle, or blog rendering.

## Navigation & Mobile Menu

- [ ] `Navbar` / `MobileNav` links reachable via Tab, in visual order
- [ ] Mobile nav (Radix `Dialog`/`Sheet`) traps focus while open, returns
  focus to the trigger on close, closes on `Escape`
- [ ] Nav has `aria-label` (e.g. `aria-label="Main navigation"`)

## Dark Mode Toggle

- [ ] `ThemeToggle` has an `aria-label` describing the action (e.g. "Switch
  to dark mode" / "Switch to light mode" — update with current state)
- [ ] Both themes meet contrast ≥ 4.5:1 for body text, ≥ 3:1 for large
  text/UI components

## Blog Content (`content/posts/` → rendered HTML)

- [ ] Markdown produces one `<h1>` (post title) with no skipped heading
  levels (`##` → `###`, not `##` → `####`)
- [ ] Images referenced in posts have descriptive `alt` text in the
  markdown (`![alt text](...)`)
- [ ] `prose` typography styling maintains contrast in both light and dark
  themes

## Links

- [ ] Link text is descriptive (not "click here")
- [ ] External links (`target="_blank"`) are visually/semantically
  distinguishable (icon or `aria-label` noting "opens in new tab")

## General

- [ ] Page has a descriptive `<title>` and `lang="en"` on `<html>`
- [ ] Focus is visible on all interactive elements (don't remove outlines)
- [ ] Text resizable to 200% without breaking layout

## Testing

```bash
npx axe-core   # or Chrome DevTools → Lighthouse → Accessibility
```
