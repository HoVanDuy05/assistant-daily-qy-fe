const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(__dirname, '..', 'public', 'icons', 'icon-source.svg');

async function generateIcons() {
  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    const outputFile = path.join(__dirname, '..', 'public', 'icons', `icon-${size}x${size}.png`);

    try {
      await sharp(inputFile)
        .resize(size, size)
        .png({ compressionLevel: 9, quality: 100 })
        .toFile(outputFile);

      console.log(`✅ icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size}x${size}:`, error.message);
    }
  }

  console.log('\n🎉 All icons generated successfully!');
}

generateIcons().catch(console.error);
