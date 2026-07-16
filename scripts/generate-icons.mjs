#!/usr/bin/env node
/**
 * FilePhile icon generator
 * ------------------------
 * Re-renders the app icon into every PWA / home-screen raster asset, plus a
 * multi-size favicon.ico (PNG-embedded ICO — no ImageMagick/Pillow required).
 *
 * Usage:
 *   npm install playwright-core        # once (browsers not needed if Chromium exists)
 *   node scripts/generate-icons.mjs [--exe=/path/to/chromium]
 *
 * In environments with Playwright's managed browsers, PLAYWRIGHT_BROWSERS_PATH
 * is honored automatically; otherwise pass --exe (e.g. --exe=/opt/pw-browsers/chromium).
 *
 * Design decisions (v1.2.0 icon refresh):
 * - SOURCE OF TRUTH is `filephile-icon-ios.svg` — a fully self-contained,
 *   square (1024x1024) "app icon": a FULL-BLEED opaque border plate (edge-to-
 *   edge cyan gradient border), a glass body with sheen and inner cyan edge
 *   glow, and the FilePhile mark composited at ~78% (inside the adaptive safe
 *   zone). This is what iOS pins to the Home Screen and what Android/PWA
 *   installs use, so every raster below renders it FULL-BLEED (no re-padding).
 *   Baking an opaque, edge-to-edge background in fixes the old transparent-
 *   web-clip problem where iOS <18 rendered a black square behind a floating
 *   glyph, and lets the platform apply its own squircle mask cleanly — light/
 *   dark mode never shows through the corners.
 * - `icons/FilePhile-official.svg` (the transparent, background-less mark)
 *   remains the "optimized" icon and is intentionally NOT rasterized here: it
 *   is used only where a transparent background is ideal — the in-app logo and
 *   the SVG browser-tab favicon (it adapts to any tab background).
 * - icon-*.png / apple-touch-icon.png / favicon.ico are rendered edge-to-edge
 *   opaque (the source's own border plate fills the tile); iOS/browsers apply
 *   their own corner mask to taste.
 * - icon-512-maskable.png is composited on an OPAQUE backplate (#04090B, the
 *   body's darkest gradient stop) so it stays edge-to-edge per the maskable
 *   spec; the mark stays within the ~80% safe zone.
 * - iOS caches Home Screen icons per install — bump the `?v=` cache-bust query
 *   in index.html / manifest / sw.js and re-add the web clip to force a refresh.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SVG = readFileSync(join(ROOT, 'filephile-icon-ios.svg'), 'utf8');
const svgData = `data:image/svg+xml;base64,${Buffer.from(SVG).toString('base64')}`;

// Deepest stop of the body gradient — used as the opaque backplate for the
// maskable icon so its corners blend seamlessly into the design.
const MASK_BG = '#04090B';

const exeArg = process.argv.find(a => a.startsWith('--exe='))?.slice(6);
const exe = exeArg || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

// [outputPath, canvasPx, opaqueBackplate?]
// The source SVG is already a finished square icon, so everything renders
// full-bleed (100%). Only the maskable variant needs an opaque backplate.
const OUTPUTS = [
  ['icons/icon-72.png', 72, false],
  ['icons/icon-144.png', 144, false],
  ['icons/icon-192.png', 192, false],
  ['icons/icon-384.png', 384, false],
  ['icons/icon-512.png', 512, false],
  ['icons/icon-512-maskable.png', 512, true],
  ['icons/apple-touch-icon.png', 180, false],
];
const ICO_SIZES = [16, 32, 48]; // assembled into favicon.ico

const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });

async function render(size, opaque) {
  // Square source, square tile => object-fit:contain fills edge-to-edge.
  const bg = opaque ? MASK_BG : 'transparent';
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:${bg}">
    <div id="tile" style="width:${size}px;height:${size}px;background:${bg};display:flex;align-items:center;justify-content:center">
      <img src="${svgData}" style="width:100%;height:100%;object-fit:contain">
    </div></body></html>`, { waitUntil: 'networkidle' });
  return page.locator('#tile').screenshot({ omitBackground: !opaque });
}

// --- PNG outputs ---
for (const [out, size, opaque] of OUTPUTS) {
  writeFileSync(join(ROOT, out), await render(size, opaque));
  console.log(`wrote ${out} (${size}x${size}${opaque ? ', opaque backplate' : ', transparent'})`);
}

// --- favicon.ico: ICONDIR + ICONDIRENTRYs + concatenated PNG blobs ---
const blobs = [];
for (const s of ICO_SIZES) blobs.push([s, await render(s, false)]);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(blobs.length, 4);
let offset = 6 + 16 * blobs.length;
const entries = [];
for (const [s, png] of blobs) {
  const e = Buffer.alloc(16);
  e.writeUInt8(s === 256 ? 0 : s, 0); // width
  e.writeUInt8(s === 256 ? 0 : s, 1); // height
  e.writeUInt8(0, 2);                 // palette
  e.writeUInt8(0, 3);                 // reserved
  e.writeUInt16LE(1, 4);              // planes
  e.writeUInt16LE(32, 6);             // bpp
  e.writeUInt32LE(png.length, 8);     // data size
  e.writeUInt32LE(offset, 12);        // data offset
  entries.push(e);
  offset += png.length;
}
writeFileSync(join(ROOT, 'favicon.ico'), Buffer.concat([header, ...entries, ...blobs.map(b => b[1])]));
console.log(`wrote favicon.ico (${ICO_SIZES.join('+')})`);

// --- Self-check: corner alpha + mark bounding box, decoded via Chromium canvas ---
console.log('\nself-check (full-bleed opaque source => corners opaque, coverage ~100%; coverage = non-empty bbox):');
for (const [out, size, opaque] of OUTPUTS) {
  const b64 = readFileSync(join(ROOT, out)).toString('base64');
  const r = await page.evaluate(async ([b64, size]) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = new OffscreenCanvas(size, size), ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, size, size).data;
    const a = (x, y) => d[(y * size + x) * 4 + 3];
    let minX = size, minY = size, maxX = -1, maxY = -1;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (a(x, y) > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    return {
      corners: [a(0, 0), a(size - 1, 0), a(0, size - 1), a(size - 1, size - 1)],
      covW: ((maxX - minX + 1) / size * 100).toFixed(1),
      covH: ((maxY - minY + 1) / size * 100).toFixed(1),
    };
  }, [b64, size]);
  console.log(`  ${out.padEnd(30)} corners=[${r.corners}] coverage=${r.covW}%x${r.covH}%${opaque ? ' (opaque)' : ''}`);
}

await browser.close();
