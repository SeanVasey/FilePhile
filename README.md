<div align="center">

![FilePhile Cover](cover.png)

# FilePhile v1.0

**Premium, single-page file generation studio**

Create and download text-based files instantly with powerful features and a beautiful interface.

[![GitHub](https://img.shields.io/badge/GitHub-FilePhile-00F0E6?style=for-the-badge&logo=github)](https://github.com/SeanVasey/FilePhile)
[![License](https://img.shields.io/badge/License-Apache%202.0-0077B6?style=for-the-badge)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Audited-50fa7b?style=for-the-badge)](docs/SECURITY_REVIEW.md)
[![CI](https://img.shields.io/github/actions/workflow/status/SeanVasey/FilePhile/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white)](https://github.com/SeanVasey/FilePhile/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/github/actions/workflow/status/SeanVasey/FilePhile/deploy-pages.yml?branch=main&style=for-the-badge&label=Deploy&logo=github&logoColor=white&color=00C4E6)](https://github.com/SeanVasey/FilePhile/actions/workflows/deploy-pages.yml)
[![Version](https://img.shields.io/badge/Version-1.0--final-00F0E6?style=for-the-badge)](https://github.com/SeanVasey/FilePhile)
[![PWA](https://img.shields.io/badge/PWA-Ready-0077B6?style=for-the-badge&logo=pwa&logoColor=white)](docs/PWA_SETUP.md)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-50fa7b?style=for-the-badge)](https://github.com/SeanVasey/FilePhile)

[Features](#-features) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Usage](#-usage-tips) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- **📝 Multiple Format Presets** - `.txt`, `.md`, `.html`, `.json`, `.svg`, and custom extensions
- **🎨 Syntax Highlighting** - Auto-detection for HTML, SVG, JSON, and Markdown
- **🔍 Find & Replace** - Regex support with match navigation
- **↩️ Undo/Redo** - Full edit history with 50-level undo stack
- **📂 Drag & Drop** - File import with size and extension validation
- **🧘 Zen Mode** - Distraction-free editing experience
- **🔢 Line Numbers** - Optional line numbering with current line highlight
- **📏 Word Wrap** - Toggle word wrapping for long lines
- **🔤 Adjustable Font Size** - Customize editor font size
- **⌨️ Keyboard Shortcuts** - Complete keyboard navigation
- **🖨️ Print Support** - Optimized print styles
- **💾 Auto-Save** - LocalStorage persistence
- **📊 Live Statistics** - Character, word, and line counts
- **🔒 Security First** - Comprehensive XSS protection and CSP
- **📱 PWA Ready** - Progressive Web App support

## 📁 Project Structure

```
FilePhile/
├── index.html              # Main application (single-page app)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker for offline support
├── vercel.json             # Vercel deployment config
├── favicon.ico             # Favicon
├── browserconfig.xml       # Windows tile configuration
├── cover.png               # Repository cover image
├── CLAUDE.md               # Development guide & standards
├── CHANGELOG.md            # Version history (Keep a Changelog)
├── SECURITY.md             # Vulnerability reporting policy
├── .editorconfig           # Consistent editor settings
├── icons/                  # Official FilePhile icons (all sizes)
│   ├── FilePhile-official.svg
│   ├── icon-*.png          # Various sizes (48-1024px)
│   ├── apple-touch-icon*.png
│   └── favicon-*.png
├── .github/workflows/      # CI/CD pipelines
│   ├── ci.yml              # Validation & testing
│   └── deploy-pages.yml    # GitHub Pages deployment
├── tasks/                  # Task tracking
│   ├── todo.md             # Active task plan
│   └── lessons.md          # Accumulated patterns
└── docs/                   # Documentation
    ├── PWA_SETUP.md
    ├── SECURITY_REVIEW.md
    └── SECURITY_ENHANCEMENTS_SUMMARY.md
```

## 🚀 Getting Started

FilePhile is a modern single-page application with PWA support.

### Quick Start

**macOS/Linux:**
```bash
open index.html
```

**Windows:**
```bash
start index.html
```

Or simply **double-click** `index.html` to launch.

### Install as PWA

FilePhile works as a Progressive Web App. See the full [PWA Setup Guide](docs/PWA_SETUP.md).

- **iOS:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Menu → Install App
- **Desktop:** Chrome/Edge → address bar install icon

## 🌐 Deployment

FilePhile requires **no build step**. Deploy the repository root directly.

### GitHub Pages

Deployment is automated via GitHub Actions. On every push to `main`, the site is deployed to GitHub Pages.

1. Go to **Settings → Pages** in your repository
2. Under **Source**, select **GitHub Actions**
3. Pushes to `main` will auto-deploy via the `deploy-pages.yml` workflow

Your site will be live at: `https://<username>.github.io/FilePhile/`

### Vercel

A `vercel.json` is included with security headers and caching rules.

1. Import the repository at [vercel.com/new](https://vercel.com/new)
2. Framework Preset: **Other**
3. Build Command: *(leave empty)*
4. Output Directory: `.`
5. Deploy

The config provides:
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- Service Worker cache-control (`no-cache` for `sw.js`)
- Long-term caching for static icon assets
- Clean URL routing

### Netlify

No configuration needed. Drag the repository folder into [Netlify Drop](https://app.netlify.com/drop) or connect via Git.

### Any Static Host

Upload all files to any static file host (S3, Cloudflare Pages, Firebase Hosting, etc.). No server-side processing is required.

### Local Development Server

For testing Service Worker and PWA features locally:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx, no install needed)
npx serve .
```

Then open `http://localhost:8000`.

## 🔄 Versioning

The current version is **v1.0-final**. Version identifiers are maintained in three locations:

| Location | Key |
|----------|-----|
| `index.html` | `VERSION` constant in JavaScript |
| `manifest.webmanifest` | `version` field |
| `sw.js` | Cache name (`FilePhile-v1.0`) |

When releasing a new version, update all three files and the service worker cache name to trigger cache invalidation on existing installs.

## 💡 Usage Tips

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Download | `Ctrl+S` |
| Copy Text | `Ctrl+Shift+C` |
| Open File | `Ctrl+O` |
| Find/Replace | `Ctrl+F` |
| Preview HTML/SVG | `Ctrl+P` |
| Line Numbers | `Ctrl+L` |
| Word Wrap | `Alt+Z` |
| Clear Editor | `Ctrl+Shift+X` |
| Help | `?` |

### Supported File Types

**Built-in Presets:**
- `.txt` - Plain text
- `.md` - Markdown
- `.html` - HTML documents
- `.json` - JSON data
- `.svg` - SVG graphics

**Custom Extensions:**
Over 40 file types supported including: `.js`, `.ts`, `.py`, `.css`, `.xml`, `.yml`, `.sql`, `.php`, `.rb`, `.go`, `.rs`, `.java`, `.c`, `.cpp`, `.swift`, `.kt`, and more!

## 🔒 Security

FilePhile has been thoroughly audited for security vulnerabilities. To report a vulnerability, see [SECURITY.md](SECURITY.md). For the complete audit report, see [SECURITY_REVIEW.md](docs/SECURITY_REVIEW.md).

### Security Features

- ✅ **Content Security Policy** - Strict CSP with minimal necessary permissions
- ✅ **XSS Protection** - Comprehensive detection of 9 XSS attack vectors
- ✅ **Input Sanitization** - Path traversal protection, dangerous character filtering
- ✅ **File Validation** - Size limits (10MB), extension whitelist, type checking
- ✅ **Rate Limiting** - Download rate limiting to prevent abuse
- ✅ **Privacy Protection** - No-referrer policy on external resources
- ✅ **Safe Preview** - Warning system for dangerous HTML content

**Risk Level:** LOW (after security audit)
**Security Status:** ✅ Production Ready

See [SECURITY_ENHANCEMENTS_SUMMARY.md](docs/SECURITY_ENHANCEMENTS_SUMMARY.md) for enhancement details.

## 🏗️ Architecture

FilePhile is intentionally built as a **single HTML file** for:
- ✅ **Easy Deployment** - Drop anywhere, no build process
- ✅ **Offline Use** - Works without internet after initial load
- ✅ **Portability** - Share a single file
- ✅ **Zero Dependencies** - No npm packages or external scripts

For larger projects, consider splitting into separate CSS/JS files with a bundler (Vite, Parcel, etc.).

## 🎨 Features in Detail

### Syntax Highlighting

Automatic language detection and highlighting for:
- **HTML/XML** - Tags, attributes, comments
- **Markdown** - Headers, code blocks, links, bold text
- **JSON** - Keys, strings, booleans, numbers
- **SVG** - Full XML syntax support

### File Management

- **Import** - Drag & drop or file picker with validation
- **Export** - Download with proper MIME types
- **History** - Track recent exports with timestamps
- **Validation** - Extension whitelist, size limits, type checking

### Editor Features

- **Auto-Indentation** - Smart indentation on Enter key
- **Auto-Pairing** - Brackets, quotes, and parentheses
- **Tab Support** - Tab key inserts 2 spaces
- **Scroll Sync** - Line numbers sync with editor scroll
- **Search** - Find with regex support and match highlighting

## 🛠️ Development

### Code Quality

- **Clean Architecture** - Well-organized code with clear separation of concerns
- **Modern JavaScript** - ES6+ features, no legacy code
- **Comprehensive Comments** - Inline documentation for security decisions
- **Performance Optimized** - Debounced highlighting, efficient regex usage

### Continuous Integration

The CI pipeline (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

- **HTML Structure** - DOCTYPE, meta tags, lang attribute validation
- **Security Checks** - CSP validation, no `unsafe-eval`, referrer policy, innerHTML audit
- **PWA Assets** - Manifest JSON validity, service worker, icons present
- **Version Consistency** - Cross-checks version across HTML, manifest, and service worker
- **File Size** - Ensures index.html stays under 200KB
- **JavaScript Syntax** - Validates all inline script blocks parse correctly

### Testing Checklist

See [SECURITY_ENHANCEMENTS_SUMMARY.md](docs/SECURITY_ENHANCEMENTS_SUMMARY.md) for the complete testing checklist including:
- Security testing (XSS detection, CSP validation)
- Performance testing (large files, rapid typing)
- Functionality testing (all features and shortcuts)

## 🤝 Contributing

Contributions are welcome! Please ensure:

1. **Security First** - Run security checks for any new features
2. **Test Thoroughly** - Verify all functionality works
3. **Document Changes** - Update README and inline comments
4. **Follow Style** - Match existing code style and conventions

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design** - Modern glassmorphism UI with dark/light themes
- **Fonts** - [Google Fonts](https://fonts.google.com/) (Outfit, JetBrains Mono)
- **Icons** - Custom SVG icons
- **Security Audit** - Comprehensive security review and enhancements

---

<div align="center">

**Built with ❤️ by [VASEY/AI](https://github.com/SeanVasey)**

[⭐ Star on GitHub](https://github.com/SeanVasey/FilePhile) • [🐛 Report Bug](https://github.com/SeanVasey/FilePhile/issues) • [💡 Request Feature](https://github.com/SeanVasey/FilePhile/issues)

</div>
