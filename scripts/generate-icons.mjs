#!/usr/bin/env node
/**
 * FilePhile icon generator
 * ------------------------
 * Re-renders icons/FilePhile-official.svg (non-square viewBox 974x925) into all
 * PWA raster assets, centered on a square canvas with minimal padding, plus a
 * multi-size favicon.ico (PNG-embedded ICO — no ImageMagick/Pillow required).
 *
 * Usage:
 *   npm install playwright-core        # once (browsers not needed if Chromium exists)
 *   node scripts/generate-icons.mjs [--exe=/path/to/chromium]
 *
 * In environments with Playwright's managed browsers, PLAYWRIGHT_BROWSERS_PATH
 * is honored automatically; otherwise pass --exe (e.g. --exe=/opt/pw-browsers/chromium).
 *
 * Design decisions (v1.2.0):
 * - ALL outputs keep a fully transparent background (product decision).
 *   iOS 18+ composites transparent web-clip icons onto a system backplate that
 *   follows light/dark appearance; older iOS renders transparency as black.
 *   iOS caches the icon per install — remove & re-add the web clip to refresh.
 * - icon-*.png:            glyph fills ~90% of canvas (was ~60% — excess padding bug).
 * - apple-touch-icon.png:  180x180, glyph ~80% so it sits like a native glyph on
 *   the iOS backplate.
 * - icon-512-maskable.png: glyph ~68%, inside the ~80% adaptive-icon safe zone.
 *   NOTE: a transparent maskable icon is off-spec; some Android launchers may
 *   backfill black. Accepted tradeoff — revisit if Android rendering disappoints.
 * - favicon.ico:           16+32+48 PNG-compressed entries, ~95% glyph fill.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SVG = readFileSync(join(ROOT, 'icons', 'FilePhile-official.svg'), 'utf8');
const svgData = `data:image/svg+xml;base64,${Buffer.from(SVG).toString('base64')}`;

const exeArg = process.argv.find(a => a.startsWith('--exe='))?.slice(6);
const exe = exeArg || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

// [outputPath, canvasPx, glyphFillFraction]
const OUTPUTS = [
  ['icons/icon-72.png', 72, 0.90],
  ['icons/icon-144.png', 144, 0.90],
  ['icons/icon-192.png', 192, 0.90],
  ['icons/icon-384.png', 384, 0.90],
  ['icons/icon-512.png', 512, 0.90],
  ['icons/icon-512-maskable.png', 512, 0.68],
  ['icons/apple-touch-icon.png', 180, 0.80],
];
const ICO_SIZES = [16, 32, 48]; // rendered at 0.95 fill, assembled into favicon.ico

const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });

async function render(size, fill) {
  // Square tile; object-fit:contain centers the non-square SVG. The glyph's
  // longest dimension (width, 974 > 925) spans fill*size pixels.
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;background:transparent">
    <div id="tile" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">
      <img src="${svgData}" style="width:${(fill * 100).toFixed(2)}%;height:${(fill * 100).toFixed(2)}%;object-fit:contain">
    </div></body></html>`, { waitUntil: 'networkidle' });
  return page.locator('#tile').screenshot({ omitBackground: true });
}

// --- PNG outputs ---
for (const [out, size, fill] of OUTPUTS) {
  writeFileSync(join(ROOT, out), await render(size, fill));
  console.log(`wrote ${out} (${size}x${size}, glyph ${(fill * 100) | 0}%)`);
}

// --- favicon.ico: ICONDIR + ICONDIRENTRYs + concatenated PNG blobs ---
const blobs = [];
for (const s of ICO_SIZES) blobs.push([s, await render(s, 0.95)]);
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

// --- Self-check: corner alpha + glyph bounding box, decoded via Chromium canvas ---
console.log('\nself-check (corner alpha should be 0 = transparent; coverage = glyph bbox / canvas):');
for (const [out, size, fill] of OUTPUTS) {
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
  console.log(`  ${out.padEnd(30)} corners=[${r.corners}] coverage=${r.covW}%x${r.covH}% (target ~${(fill * 100) | 0}%)`);
}

await browser.close();
