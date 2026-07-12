# FilePhile — Lessons Learned

Accumulated patterns from corrections and mistakes. Review at session start.

---

## Session: 2026-07-12

### Patterns
- Never nest `backdrop-filter` surfaces: WebKit does not compose a blurred child inside a blurred parent. True glass (blur+saturate) only on top-level layers (main slab, dropdown, modal box, toast); nested panels use "fake glass" (top-light gradient + inset `--glass-edge` highlight).
- iOS caches the home-screen web-clip icon at install time. Bumping `?v=` fixes new installs only — existing users must remove and re-add the icon. Since iOS 18, a transparent apple-touch-icon gets a system backplate (white/dark per appearance); pre-18 it composites to black.
- A valid `.ico` can simply embed PNG blobs (ICONDIR + 16-byte entries + PNG data) — no ImageMagick/Pillow needed; ~30 lines of Node.
- The official SVG's viewBox is non-square (974×925); any rasterization must center it on a square canvas or icons come out visibly off-center.
- `main::before` overlays need `pointer-events:none` and children need `position:relative;z-index:1`, or the sheen layer eats clicks/paints over content.

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
