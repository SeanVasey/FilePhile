<div align="center">

![FilePhile Cover](cover.png)

# FilePhile v1.0

**Premium, single-page file generation studio**

Create and download text-based files instantly with powerful features and a beautiful interface.

[![GitHub](https://img.shields.io/badge/GitHub-FilePhile-00F0E6?style=for-the-badge&logo=github)](https://github.com/SeanVasey/FilePhile)
[![License](https://img.shields.io/badge/License-Apache%202.0-0077B6?style=for-the-badge)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Audited-50fa7b?style=for-the-badge)](docs/SECURITY_REVIEW.md)

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage-tips) • [Security](#-security) • [Contributing](#-contributing)

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
├── favicon.ico             # Favicon
├── browserconfig.xml       # Windows tile configuration
├── cover.png               # Repository cover image
├── icons/                  # Official FilePhile icons (all sizes)
│   ├── FilePhile-official.svg
│   ├── icon-*.png          # Various sizes (48-1024px)
│   ├── apple-touch-icon*.png
│   └── favicon-*.png
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

### Live Demo

Open in your browser and start creating files instantly. All processing happens client-side - no server required!

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

FilePhile has been thoroughly audited for security vulnerabilities. See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the complete audit report.

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

See [SECURITY_ENHANCEMENTS_SUMMARY.md](SECURITY_ENHANCEMENTS_SUMMARY.md) for enhancement details.

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

### Testing Checklist

See [SECURITY_ENHANCEMENTS_SUMMARY.md](SECURITY_ENHANCEMENTS_SUMMARY.md) for the complete testing checklist including:
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
