# CLAUDE.md — FilePhile

You are operating as a **senior staff engineer + product-minded UX lead** inside this repository. Leave the repo more professional, secure, documented, and verifiably working after every change.

---

## Project Overview

FilePhile is a premium, single-page file generation studio for creating, editing, and downloading text-based files. Progressive Web App (PWA) built as a single HTML file with zero dependencies.

- **Author:** VASEY/AI
- **License:** Apache 2.0
- **Version:** 1.1
- **Status:** Production Ready (Security Audited)

---

## Guiding Principles

- **Best-practices first.** Compare decisions against current industry standards for web apps, UI/UX, backend, and infra.
- **Ship-ready at all times.** Every commit leaves the repo deployable. No broken builds on `main`.
- **Boring is beautiful.** Reliable over clever. Document tradeoffs.
- **Verify before you push.** Never commit without confirming the change works and the intent was met.

---

## Architecture

Single `index.html` file containing all HTML, CSS, and JavaScript. No build process, no bundler, no npm packages.

```
index.html              # Entire application (~1,490 lines)
sw.js                   # Service Worker for offline/PWA support
manifest.webmanifest    # PWA manifest
vercel.json             # Vercel deployment config (security headers, caching)
icons/                  # App icons (SVG, PNG at various sizes)
docs/                   # Security audit, PWA setup docs
tasks/                  # Task tracking (todo.md, lessons.md)
.github/workflows/      # CI/CD (ci.yml, deploy-pages.yml)
```

### Tech Stack

- Vanilla JavaScript (ES6+), no frameworks
- Pure CSS3 with CSS custom properties for theming
- Google Fonts: Outfit (UI) + JetBrains Mono (editor)
- PWA with Service Worker (cache-first strategy)
- LocalStorage for persistence

### Key Conventions

- State object `st` holds all mutable state (format, undo stack, history, etc.)
- Element references cached in `el` object via `$(id)` helper
- CSS variables define all colors — dark theme is default, `.light` class overrides
- Glassmorphism design: `backdrop-filter: blur()` with transparent backgrounds
- All user input is validated/sanitized (filenames, extensions, file size, content)
- HTML escaping via `escHtml()` — never use `innerHTML` with raw user content

### Code Layout (index.html)

- Lines 48–300: CSS (styles, themes, animations, scrollbars, responsive)
- Lines 302–472: HTML structure (editor, toolbar, panels, modals)
- Lines 474–1475: JavaScript (IIFE, state management, all logic)
- Lines 1478–1491: Service Worker registration

---

## Development

**No build step required.** Open `index.html` in a browser:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

For Service Worker / PWA testing, use a local server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

---

## Standards

### Accessibility

WCAG-minded, keyboard-first, semantic HTML. ARIA only when native semantics fall short.

### Performance

Measure first. Avoid regressions. Optimize critical rendering paths. Debounced syntax highlighting, efficient regex usage.

### Security (OWASP Top 10 mindset)

- CSP: `default-src 'self'; script-src 'unsafe-inline'` (no `unsafe-eval`)
- XSS detection on HTML preview (9 vectors checked with user warning)
- Filename sanitization: path traversal, Windows reserved names, special chars
- File size limits: 10MB upload, 5MB content, 4MB localStorage payload
- 40+ safe file extensions whitelist
- Rate limiting on downloads (100ms)
- Blob URLs revoked after 30 seconds
- Least privilege everywhere. Input validation. Secure defaults.
- **Never commit secrets.** Use `.env.example` + `.gitignore`. No hardcoded credentials, unsafe evals, overly permissive CORS.

### UX

Responsive. Polished empty/loading/error states. Consistent patterns. Sensible copy.

---

## Verification

Run **before every commit**:

1. **HTML structure** — DOCTYPE, meta tags, lang attribute
2. **Security checks** — CSP validation, no `unsafe-eval`, innerHTML audit
3. **PWA assets** — Manifest JSON validity, service worker, icons present
4. **Version consistency** — Cross-check version across HTML, manifest, and service worker
5. **File size** — Ensure `index.html` stays under 200KB
6. **JavaScript syntax** — Validate all inline script blocks parse correctly

For static-file-only changes: markdown lint, link checks, verify asset paths in README.

If tests don't exist, add smoke tests. If tooling isn't available, document what should run and add CI config.

---

## Commits

Conventional Commits (`feat:` `fix:` `chore:` `docs:` `refactor:` `test:`). Every commit includes what/why/how-verified. Update docs in the same PR when changes affect them. Bug fixes include a regression test.

---

## CI / CD

### GitHub Actions (on every PR + `main` push)

**Must pass before merge:** HTML structure, security checks (CSP, no `unsafe-eval`, innerHTML audit), PWA asset validation, version consistency, file size checks, JavaScript syntax validation.

### Deployment

**GitHub Pages (primary):** Automated via `deploy-pages.yml` on push to `main`. Actions workflow via `actions/deploy-pages@v4`.

**Vercel:** `vercel.json` provides security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), service worker cache control (`no-cache` for `sw.js`), long-term caching for static icon assets, clean URL routing.

Do not merge if CI fails. Maintain these workflows as part of any meaningful change.

---

## Project Structure

```
FilePhile/
├── CLAUDE.md
├── README.md
├── LICENSE / CHANGELOG.md / SECURITY.md
├── .editorconfig / .gitignore
│
├── .github/workflows/
│   ├── ci.yml              # Validation & testing
│   └── deploy-pages.yml    # GitHub Pages deployment
│
├── docs/
│   ├── PWA_SETUP.md
│   ├── SECURITY_REVIEW.md
│   └── SECURITY_ENHANCEMENTS_SUMMARY.md
│
├── icons/
│   ├── FilePhile-official.svg
│   ├── icon-{72,144,192,384,512}.png
│   ├── icon-512-maskable.png
│   └── apple-touch-icon.png
│
├── tasks/
│   ├── todo.md             # Active task plan
│   └── lessons.md          # Accumulated patterns
│
├── index.html              # Complete application
├── sw.js                   # Service Worker (cache: filephile-v1.6)
├── manifest.webmanifest    # PWA config
├── vercel.json             # Vercel deployment config
├── favicon.ico
├── browserconfig.xml
└── cover.png               # Marketing banner
```

---

## README.md Spec

The README is the product's storefront. Treat it like a production release page.

**Header block:**

- App icon / logo (centered, with alt text)
- Product name + one-line description
- Badge row: build status, version/release, license, deploy status (use shields.io)

**Body:**

- Screenshot or screen capture preview (hero image showing the app in use, with alt text)
- Features (concise list)
- Tech stack
- Live demo link (when deployed)
- Setup / Install / Run commands
- Architecture overview
- Deployment notes
- Usage examples (keyboard shortcuts, file types)
- Contributing + License links

---

## Required Repo Files

- `LICENSE` — Apache 2.0
- `CHANGELOG.md` — [Keep a Changelog](https://keepachangelog.com/) style
- `SECURITY.md` — How to report vulnerabilities
- `.editorconfig` — Consistent editor settings
- `.gitignore` — Ignore patterns

---

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

---

## Important Files

| File | Purpose |
|------|---------|
| `index.html` | Complete application |
| `sw.js` | Service Worker (cache: `filephile-v1.6`) |
| `manifest.webmanifest` | PWA config, icon references |
| `vercel.json` | Vercel deployment config |
| `CLAUDE.md` | Development guide & standards |
| `CHANGELOG.md` | Version history |
| `SECURITY.md` | Vulnerability reporting policy |
| `docs/SECURITY_REVIEW.md` | Full security audit report |
| `docs/PWA_SETUP.md` | PWA installation guide |
| `tasks/todo.md` | Active task plan |
| `tasks/lessons.md` | Accumulated patterns |

---

## Workflow Orchestration

**Subagents:** For complex multi-file tasks, delegate via Task tool. Lead agent coordinates; subagents inherit this CLAUDE.md.

**Self-improvement:** Append lessons to `tasks/lessons.md` after non-trivial debugging. Track deferred work in `tasks/todo.md` with issue links. Review lessons at session start.

**Plan mode:** Default to planning before execution on non-trivial tasks. For complex work, write the plan to a file first.

---

## Quality Gates

- Keep dependencies minimal (currently zero).
- Prefer strict types and strict linting where feasible.
- When working with AI tool-use patterns (Skills, MCP servers, etc.), align with the platform's best-practice guidance.
