# Changelog

All notable changes to FilePhile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- `filephile-icon-ios.svg`: master app icon — a self-contained, opaque, square (1024×1024) glass icon (rounded body, cyan edge glow, sheen) with the FilePhile mark composited inside the adaptive safe zone. This is now the single source of truth for every Home Screen / PWA / favicon raster.

### Changed
- iOS Add-to-Home-Screen and PWA install icons now render the new opaque app icon instead of a transparent glyph — no more black-square-behind-glyph on iOS <18 and no dependence on the system backplate. All `icons/icon-*.png`, `icons/icon-512-maskable.png`, `icons/apple-touch-icon.png`, and `favicon.ico` were re-rendered from `filephile-icon-ios.svg`
- `scripts/generate-icons.mjs` now rasterizes the opaque master icon full-bleed (maskable variant gets an opaque `#04090B` backplate for spec compliance); the transparent `icons/FilePhile-official.svg` is intentionally reserved for the in-app logo and SVG browser-tab favicon, where a transparent background is ideal
- `manifest.webmanifest` scalable icon entry now points to the opaque `filephile-icon-ios.svg` so installers that prefer SVG still get an opaque Home Screen icon; the icon is precached by the Service Worker
- Icon cache-busters bumped to `?v=1.9` across `index.html`, `manifest.webmanifest`, `sw.js`, and `browserconfig.xml`; Service Worker cache bumped to `filephile-v1.12` so installed clients pick up the new icon set. Note: iOS caches the Home Screen icon per install — remove and re-add the web clip to see the change

## [1.2.0] - 2026-07-12

### Added
- Liquid Glass design system: tokenized blur scale (`--blur-sm/md/lg/xl`), saturation boost (`--sat`) on true-glass surfaces (main panel, dropdown menu, help modal, toast), specular top-edge highlights (`--glass-edge`) and a refraction sheen overlay (`--glass-sheen`) on the main slab, layered fake-glass gradients on nested surfaces (toolbar, find/history panels, format selector) — nested `backdrop-filter` is avoided because WebKit does not compose it
- Sheen-sweep hover animation on the primary Download button; inset specular highlights on secondary buttons, toolbar buttons, segmented control, and version badge; recessed-glass inputs
- `scripts/generate-icons.mjs`: reproducible icon pipeline (Chromium/Playwright render of the official SVG + pure-Node PNG-embedded ICO writer) with a built-in transparency/coverage self-check

### Fixed
- PWA icons no longer carry ~20% excess transparent padding: artwork now fills ~90% of standard icons (was ~60%), ~80% of the apple-touch-icon, and ~68% (safe zone) of the maskable icon, all centered on a square canvas despite the SVG's non-square 974×925 viewBox
- iOS Add-to-Home-Screen icon: the transparent glyph is now sized for iOS 18+'s automatic adaptive backplate (white in light mode, dark in dark mode). Note: iOS caches the icon per install — remove and re-add the web clip to see the fix
- `favicon.ico` is now a proper multi-size icon (16+32+48 px); it previously contained only a 16 px image while being declared as 32 px

### Changed
- Icon cache-busters bumped to `?v=1.8` across `index.html`, `manifest.webmanifest`, `sw.js`, and `browserconfig.xml`; manifest icons now declare explicit `purpose` values
- Bumped Service Worker cache to v1.11 so installed clients pick up the new styles and icons

## [1.1.3] - 2026-06-12

### Fixed
- Content no longer scrolls visibly through the iOS status bar / notch / Dynamic Island: a fixed top scrim (`height: env(safe-area-inset-top)`, `pointer-events: none`) now sits above page content. It uses the app's glass idiom — a translucent `var(--bg)` tint (`color-mix`) plus `backdrop-filter: blur(var(--blur))` — so the fixed background blobs continue through the safe area without a seam in either theme, while scrolling content blurs and fades out beneath the system status icons; engines without `color-mix` fall back to an opaque `var(--bg)` mask

### Changed
- Bumped Service Worker cache to v1.10 so installed clients pick up the new `index.html`

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
