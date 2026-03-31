const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Generate favicon.ico from the 72x72 PNG
async function generateFavicon() {
  const inputFile = path.join(__dirname, '..', 'public', 'icons', 'icon-72x72.png');
  const outputFile = path.join(__dirname, '..', 'public', 'favicon.ico');
  const appDirOutput = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');
  
  try {
    // Read the 72x72 PNG
    const buffer = await sharp(inputFile)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    // For now, copy as PNG favicon (modern browsers support PNG favicons)
    // Create a simple ICO-like approach by saving multiple sizes
    const sizes = [16, 32, 48];
    
    for (const size of sizes) {
      const sizedBuffer = await sharp(inputFile)
        .resize(size, size)
        .png()
        .toBuffer();
      
      // Save to public folder
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '..', 'public', `favicon-${size}x${size}.png`));
    }
    
    // Copy 32x32 as main favicon.png
    await sharp(inputFile)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));
    
    // Also create for app directory
    await sharp(inputFile)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '..', 'src', 'app', 'favicon.png'));
    
    console.log('✅ favicon.png generated');
    console.log('✅ favicon-16x16.png generated');
    console.log('✅ favicon-32x32.png generated');
    console.log('✅ favicon-48x48.png generated');
    
    // Note: For true .ico format, you would need a library like 'to-ico'
    // But modern browsers support PNG favicons just fine
    
  } catch (error) {
    console.error('❌ Failed to generate favicon:', error.message);
  }
}

generateFavicon().catch(console.error);
