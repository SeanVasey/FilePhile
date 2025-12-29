# FilePhile

FilePhile is a premium, single-page file generation studio for creating and downloading text-based files instantly.

## Features

- Format presets for `.txt`, `.md`, `.html`, `.json`, `.svg`, and custom extensions.
- Syntax highlighting with auto-detection for HTML, SVG, JSON, and Markdown.
- Find/replace with regex support, history of exports, and undo/redo.
- Drag-and-drop file import with size and extension validation.
- Zen mode, line numbers, word wrap, and adjustable font size.
- Built-in toast feedback, keyboard shortcuts, and printable output.

## Getting Started

No build step is required. Open the app directly in your browser:

```bash
open index.html
```

On Windows, you can double-click `index.html` or run:

```bash
start index.html
```

## Usage Tips

- Use **Ctrl+S** to download, **Ctrl+Shift+C** to copy, and **Ctrl+O** to open a file.
- Press **?** to view the full shortcut list.
- Preview HTML/SVG with **Ctrl+P**.

## Project Structure

- `index.html`: The complete application (HTML, CSS, and JS in one file).

## Notes on Structure

This repo intentionally ships as a single HTML file for easy deployment and offline use. If you plan to extend the app, consider splitting the CSS and JavaScript into separate files and adding a simple bundler (Vite, Parcel, etc.) for better maintainability.
