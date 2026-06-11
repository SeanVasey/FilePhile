# FilePhile — Lessons Learned

Accumulated patterns from corrections and mistakes. Review at session start.

---

## Session: 2026-06-11

### Patterns
- Service Worker paths must be relative (`register('sw.js')`, `./` precache URLs) because the app is deployed both at domain root (Vercel) and at a subpath (GitHub Pages project site). Absolute `/...` paths silently break the PWA on Pages.
- Bump the `sw.js` cache name whenever `index.html` changes — the cache-first strategy otherwise serves the stale app to installed clients indefinitely.
- The `?v=1.7` query strings on icon URLs are icon-revision cache busters, independent of the app version; only change them when icon files change, and keep `index.html`/`browserconfig.xml`/`sw.js` in sync.
- Files removed during cleanup can reappear via GitHub web uploads ("Add files via upload" commits) — re-check for duplicates during maintenance passes.

---

## Session: 2026-02-24 (Initial)

### Patterns
- This is a zero-dependency, single-HTML-file project. There is no `package.json`, no bundler, and no npm install step. CI validation is shell-script-based.
- Version identifiers live in three places: `index.html` (JS `VERSION` constant), `manifest.webmanifest` (`version` field), and `sw.js` (cache name). All three must be updated together.
- The CI workflow (`ci.yml`) uses `node -e` to validate JavaScript syntax by extracting script blocks from `index.html`. Changes to script structure must preserve parsability.
- `innerHTML` usage is audited by CI. Any new `innerHTML` assignment must be added to the allowlist in `ci.yml` or use `escHtml()`.
