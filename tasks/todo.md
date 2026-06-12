# FilePhile — Task Plan

## Session: 2026-06-12

### Completed
- [x] Mobile safe-area audit — found root canvas theming gap: `.light` lived on `<body>` so `<html>` (which paints status-bar/home-indicator regions and overscroll) stayed dark in light theme; moved class to `documentElement`
- [x] Fix `theme-color` strategy — app forces dark start, so `prefers-color-scheme` media variants mismatched for OS-light users; single dark default now synced from computed `--bg` on toggle
- [x] Release v1.1.2 — version bumped across index.html, manifest; SW cache bumped to v1.9; CHANGELOG entry added; docs synced
- [x] Top safe-area scrim — fixed `.safe-top` layer (`height: env(safe-area-inset-top)`, z-index 250, `pointer-events: none`) masks content scrolling under the iOS status bar / notch; glass treatment (`color-mix` tint of `--bg` + `blur(var(--blur))`) keeps the fixed bg blobs seamless through the safe area; opaque `--bg` fallback where `color-mix` is unsupported
- [x] Release v1.1.3 — version bumped across index.html, manifest; SW cache bumped to v1.10; CHANGELOG entry added; docs synced

### Review
Safe-area audit follow-up to v1.1.1: insets were already complete; the remaining defects were theme/ownership bugs (html canvas color + browser-chrome color source), both now derived from the `--bg` token. Follow-up scrim pass: no fixed header owns the top edge (the page header scrolls away), so a single fixed scrim was the right shape; `.app` keeps its existing one-time `env(safe-area-inset-top)` padding — the scrim is a paint-only overlay, so the inset is still applied exactly once. Needs an on-device sanity check (mobile Safari + installed PWA, both themes).

---

## Session: 2026-06-11

### Completed
- [x] Audit iOS safe areas — added `env(safe-area-inset-*)` padding to help modal, `100dvh` fallback on app container (toolbar, toast, zen mode already covered)
- [x] Fix Service Worker for subpath hosting — relative registration path and relative precache URLs (GitHub Pages project sites previously got a 404 on `/sw.js`)
- [x] Repair CI version-consistency step (case-sensitive grep never matched; now asserts VERSION ↔ manifest ↔ title)
- [x] Add `version` field to manifest.webmanifest
- [x] Remove duplicate `filephile.svg` from root (re-uploaded after prior cleanup)
- [x] Release v1.1.1 — version bumped across index.html, manifest; SW cache bumped to v1.8; CHANGELOG entry added
- [x] Update CLAUDE.md and README to match actual code layout (~1,565 lines, current section ranges, cache v1.8)
- [x] Run all CI validation checks locally before push

### Review
Maintenance pass: PWA now works at both domain root and subpaths, iOS safe areas complete, CI version gate actually enforces consistency, docs match reality.

---

## Session: 2026-03-23

### Completed
- [x] Update CLAUDE.md with new standards template (merged generic best practices with FilePhile-specific details)
- [x] Update README.md — accurate project structure, added Tech Stack table, reorganized sections per spec, removed emojis from headings, fixed badge ordering (CI/Deploy first), corrected icon file listing
- [x] Remove duplicate SVG files from root (FilePhile-icon.svg, filephile.svg — unused copies of icons/FilePhile-official.svg)
- [x] Commit and push changes

### Review
CLAUDE.md updated with cleaner structure: "boring is beautiful" principle, consolidated standards, streamlined workflow orchestration. README restructured with accurate project tree, dedicated Tech Stack table, and proper section ordering per the README spec. Removed 2 unused duplicate SVG files (~61KB).

---

## Session: 2026-02-24

### Completed
- [x] Update CLAUDE.md with comprehensive development standards
- [x] Create tasks/ directory with todo.md and lessons.md
- [x] Create CHANGELOG.md
- [x] Create SECURITY.md
- [x] Create .editorconfig
- [x] Update .gitignore
- [x] Update README.md with new repo file references
- [x] Run CI validation checks locally
- [x] Commit and push all changes

### Review
All required repo scaffolding files created. CI checks validated locally. Repository documentation brought up to standard.
