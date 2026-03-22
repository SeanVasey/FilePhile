# Changelog

All notable changes to FilePhile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
