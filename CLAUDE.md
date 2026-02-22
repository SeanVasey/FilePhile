# CLAUDE.md — FilePhile

## Project Overview

FilePhile is a premium, single-page file generation studio for creating, editing, and downloading text-based files. It's a Progressive Web App (PWA) built as a single HTML file with zero dependencies.

- **Author:** VASEY/AI
- **License:** Apache 2.0
- **Version:** 1.0-final
- **Status:** Production Ready (Security Audited)

## Architecture

Single `index.html` file containing all HTML, CSS, and JavaScript. No build process, no bundler, no npm packages.

```
index.html              # Entire application (~1,460 lines)
sw.js                   # Service Worker for offline/PWA support
manifest.webmanifest    # PWA manifest
icons/                  # App icons (SVG, PNG at various sizes)
docs/                   # Security audit, PWA setup docs
```

## Tech Stack

- Vanilla JavaScript (ES6+), no frameworks
- Pure CSS3 with CSS custom properties for theming
- Google Fonts: Outfit (UI) + JetBrains Mono (editor)
- PWA with Service Worker (cache-first strategy)
- LocalStorage for persistence

## Development

**No build step required.** Open `index.html` in a browser:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

All code lives in `index.html` (~1,490 lines):
- Lines 48-300: CSS (styles, themes, animations, scrollbars, responsive)
- Lines 302-472: HTML structure (editor, toolbar, panels, modals)
- Lines 474-1475: JavaScript (IIFE, state management, all logic)
- Lines 1478-1491: Service Worker registration

## Key Conventions

- State object `st` holds all mutable state (format, undo stack, history, etc.)
- Element references cached in `el` object via `$(id)` helper
- CSS variables define all colors — dark theme is default, `.light` class overrides
- Glassmorphism design: `backdrop-filter: blur()` with transparent backgrounds
- All user input is validated/sanitized (filenames, extensions, file size, content)
- HTML escaping via `escHtml()` — never use `innerHTML` with raw user content

## Important Files

| File | Purpose |
|------|---------|
| `index.html` | Complete application |
| `sw.js` | Service Worker (cache: `FilePhile-v1.0`) |
| `manifest.webmanifest` | PWA config, icon references |
| `docs/SECURITY_REVIEW.md` | Full security audit report |
| `docs/SECURITY_ENHANCEMENTS_SUMMARY.md` | Security fixes summary |
| `docs/PWA_SETUP.md` | PWA installation guide |

## Security Notes

- CSP: `default-src 'self'; script-src 'unsafe-inline'` (no `unsafe-eval`)
- XSS detection on HTML preview (9 vectors checked with user warning)
- Filename sanitization: path traversal, Windows reserved names, special chars
- File size limits: 10MB upload, 5MB content, 4MB localStorage payload
- 40+ safe file extensions whitelist
- Rate limiting on downloads (100ms)
- Blob URLs revoked after 30 seconds

## Testing

No automated test suite. Manual testing checklist in `docs/SECURITY_ENHANCEMENTS_SUMMARY.md`:
- XSS detection, CSP validation
- Performance with large files and rapid typing
- All keyboard shortcuts (Ctrl+S, Ctrl+O, Ctrl+F, etc.)
- PWA install flow on iOS/Android/Desktop
- Dark/light theme switching
- Drag-and-drop file import
- Find/replace with regex

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+S | Download file |
| Ctrl+Shift+C | Copy text |
| Ctrl+O | Open file |
| Ctrl+F | Find/Replace |
| Ctrl+P | Preview HTML/SVG |
| Ctrl+L | Toggle line numbers |
| Alt+Z | Toggle word wrap |
| Ctrl+Shift+X | Clear editor |
| Ctrl+Z / Ctrl+Y | Undo / Redo |
| ? | Show help modal |
