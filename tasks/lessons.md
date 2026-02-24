# FilePhile — Lessons Learned

Accumulated patterns from corrections and mistakes. Review at session start.

---

## Session: 2026-02-24 (Initial)

### Patterns
- This is a zero-dependency, single-HTML-file project. There is no `package.json`, no bundler, and no npm install step. CI validation is shell-script-based.
- Version identifiers live in three places: `index.html` (JS `VERSION` constant), `manifest.webmanifest` (`version` field), and `sw.js` (cache name). All three must be updated together.
- The CI workflow (`ci.yml`) uses `node -e` to validate JavaScript syntax by extracting script blocks from `index.html`. Changes to script structure must preserve parsability.
- `innerHTML` usage is audited by CI. Any new `innerHTML` assignment must be added to the allowlist in `ci.yml` or use `escHtml()`.
