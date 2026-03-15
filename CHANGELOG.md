# Changelog

All notable changes to FilePhile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1] - 2026-03-15

### Changed
- Updated app icon to final design (teal folder with document and heart badge)
- Regenerated all PNG icons (16–1024px), apple-touch-icons, favicon.ico from final `FilePhile-icon.svg`
- Replaced inline SVG logo in header with `<img>` reference to external SVG
- Updated `icons/FilePhile-official.svg` with final icon design
- Apple-touch-icons use transparent backgrounds for proper light/dark mode support on iOS Home Screen
- Added `html` root element background for notched screen safe area coverage in standalone PWA mode
- Bumped Service Worker cache version to v1.1 to bust cached old icons
- Removed redundant SVG files from repository root (consolidated to `icons/FilePhile-official.svg`)

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
