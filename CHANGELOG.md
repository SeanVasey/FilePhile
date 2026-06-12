# Changelog

All notable changes to FilePhile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.2] - 2026-06-12

### Fixed
- Mobile safe areas now match the active theme: the `.light` class moved from `<body>` to `<html>`, so the root canvas (iOS status bar / Dynamic Island and home-indicator regions under `black-translucent`, plus overscroll bounce) paints the light `--bg` instead of staying dark
- `theme-color` now reflects the in-app theme instead of the OS preference: the app forces a dark start, so the old `prefers-color-scheme` media variants gave OS-light users a mismatched light status-bar strip; replaced with a single dark default that JS syncs to the computed `--bg` token on theme toggle (also fixes the light value, which was `#f5f5f7` rather than the design token `#f0f2f5`)

### Changed
- Bumped Service Worker cache to v1.9 so installed clients pick up the new `index.html`

## [1.1.1] - 2026-06-11

### Fixed
- Service Worker now registers and precaches via relative URLs, fixing offline/PWA support when hosted at a subpath (e.g. GitHub Pages project sites); previously absolute paths (`/sw.js`, `/index.html`) 404'd and the worker never installed
- Help modal now respects iOS safe areas (`env(safe-area-inset-*)`), preventing overlap with the notch and home indicator in landscape
- App container uses `100dvh` fallback for correct height with iOS Safari's dynamic toolbar
- CI version-consistency check was inert (case-sensitive grep never matched the `filephile-v*` cache name; manifest had no `version` field) — it now asserts that the `VERSION` constant, page title, and manifest version match and that the cache name is present

### Changed
- Added `version` field to `manifest.webmanifest`
- Bumped Service Worker cache to v1.8 so installed clients pick up the new `index.html`
- Removed duplicate `filephile.svg` from repo root (byte-identical, unreferenced copy of `icons/FilePhile-official.svg`)
- Refreshed CLAUDE.md and README architecture notes (line counts, code layout ranges, cache name)

## [1.1] - 2026-03-22

### Changed
- Updated app icon to final design (teal folder with document and heart badge)
- Fixed SVG viewBox to square dimensions (`974x974`) for consistent rendering in all icon contexts
- Regenerated all PNG icons (favicon, apple-touch-icon, PWA icons, Windows tiles) from corrected square SVG
- Added missing Windows tile icon sizes (72, 144, 384) for `browserconfig.xml`
- Updated `cover.png` marketing banner with new icon
- Simplified icon set: SVG favicon, single transparent `apple-touch-icon.png`, minimal PWA PNGs
- Transparent apple-touch-icon lets iOS/Safari Add to Home Screen display correctly
- Replaced inline SVG logo in header with `<img>` reference to external SVG
- Bumped Service Worker cache to v1.5
- Bumped app version from 1.0-final to 1.1 across all files and documentation

## [1.0-final] - 2025-12-29

### Added
- Premium single-page file generation studio with glassmorphism UI
- Multiple format presets: `.txt`, `.md`, `.html`, `.json`, `.svg`, and 40+ custom extensions
- Syntax highlighting for HTML, SVG, JSON, and Markdown
- Find & Replace with regex support and match navigation
- 50-level undo/redo stack
- Drag & drop file import with size and extension validation
- Zen mode for distraction-free editing
- Optional line numbers with current line highlight
- Adjustable font size and word wrap toggle
- Full keyboard shortcut suite (Ctrl+S, Ctrl+O, Ctrl+F, etc.)
- Print-optimized styles
- Auto-save via LocalStorage persistence
- Live character, word, and line count statistics
- Dark/light theme switching with CSS custom properties
- PWA support with Service Worker (cache-first, offline capable)
- Vercel deployment config with security headers
- GitHub Actions CI pipeline (HTML validation, security checks, JS syntax)
- GitHub Pages deployment workflow

### Security
- Content Security Policy (`default-src 'self'`; no `unsafe-eval`)
- Comprehensive XSS detection (9 vectors) with user warnings on HTML preview
- Filename sanitization (path traversal, Windows reserved names, special chars)
- File size limits (10MB upload, 5MB content, 4MB localStorage)
- Extension whitelist (40+ safe types)
- Download rate limiting (100ms)
- Blob URL revocation after 30 seconds
- Referrer policy on external resources
