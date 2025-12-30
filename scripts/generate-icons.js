#!/usr/bin/env node

/**
 * Icon Generator for FilePhile PWA
 *
 * This script generates PNG icons from the SVG icon file for iOS PWA support.
 *
 * Requirements: Install sharp package first:
 * npm install sharp
 *
 * Usage: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  try {
    // Try to load sharp
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.error('❌ Sharp package not found.');
      console.log('Please install it by running: npm install sharp');
      console.log('Then run this script again.');
      process.exit(1);
    }

    // Project root is one level up from scripts/
    const projectRoot = path.join(__dirname, '..');
    const svgPath = path.join(projectRoot, 'assets', 'icons', 'icon.svg');
    const outputDir = path.join(projectRoot, 'assets', 'icons');

    if (!fs.existsSync(svgPath)) {
      console.error('❌ icon.svg not found at:', svgPath);
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);

    const sizes = [
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'icon-192.png' },
      { size: 512, name: 'icon-512.png' }
    ];

    console.log('🎨 Generating PWA icons...\n');

    await Promise.all(
      sizes.map(async ({ size, name }) => {
        const outputPath = path.join(outputDir, name);
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(outputPath);

        console.log(`✓ Created ${name} (${size}x${size})`);
      })
    );

    console.log('\n✅ All icons generated successfully!');
    console.log('📱 Your PWA is now ready for iOS installation.');

  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
