const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ARTIFACTS_DIR = 'C:\\Users\\Om\\.gemini\\antigravity-ide\\brain\\dafd1cea-1e55-4bd0-8447-5df45b84f006';
const WORKSPACE_DIR = 'd:\\Progency\\alpha-tech-nutrition';

const SOURCE_MASTER = path.join(ARTIFACTS_DIR, 'alpha_tech_navy_chrome_logo_1789801889846.jpg');
const SOURCE_EMBLEM = path.join(ARTIFACTS_DIR, 'alpha_tech_navy_at_emblem_1789801912436.jpg');
const SOURCE_BANNER = path.join(ARTIFACTS_DIR, 'alpha_tech_navy_banner_1789801934959.jpg');
const SOURCE_STORY  = path.join(ARTIFACTS_DIR, 'alpha_tech_navy_story_1789801959081.jpg');

const LOGO_DIR = path.join(WORKSPACE_DIR, 'logo');
const PUBLIC_LOGO_DIR = path.join(WORKSPACE_DIR, 'public', 'logo');

if (!fs.existsSync(LOGO_DIR)) fs.mkdirSync(LOGO_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_LOGO_DIR)) fs.mkdirSync(PUBLIC_LOGO_DIR, { recursive: true });

async function processKit() {
  console.log('Generating Alpha Tech Nutrition Comprehensive Logo & Social Asset Kit...');

  const tasks = [
    // 1. MASTER SQUARE LOGO (Emblem + Typography)
    { src: SOURCE_MASTER, w: 1024, h: 1024, name: 'alpha-tech-logo-1024x1024.png' },
    { src: SOURCE_MASTER, w: 512,  h: 512,  name: 'alpha-tech-logo-512x512.png' },
    { src: SOURCE_MASTER, w: 256,  h: 256,  name: 'alpha-tech-logo-256x256.png' },
    { src: SOURCE_MASTER, w: 128,  h: 128,  name: 'alpha-tech-logo-128x128.png' },
    { src: SOURCE_MASTER, w: 1080, h: 1080, name: 'social-post-instagram-1080x1080.png' },

    // 2. EMBLEM / ICON ONLY (Athletic Crest in Neon Ring)
    { src: SOURCE_EMBLEM, w: 1024, h: 1024, name: 'alpha-tech-emblem-1024x1024.png' },
    { src: SOURCE_EMBLEM, w: 512,  h: 512,  name: 'icon-512x512.png' },
    { src: SOURCE_EMBLEM, w: 256,  h: 256,  name: 'icon-256x256.png' },
    { src: SOURCE_EMBLEM, w: 192,  h: 192,  name: 'icon-android-192x192.png' },
    { src: SOURCE_EMBLEM, w: 180,  h: 180,  name: 'apple-touch-icon-180x180.png' },
    { src: SOURCE_EMBLEM, w: 96,   h: 96,   name: 'icon-96x96.png' },
    { src: SOURCE_EMBLEM, w: 64,   h: 64,   name: 'icon-64x64.png' },
    { src: SOURCE_EMBLEM, w: 48,   h: 48,   name: 'favicon-48x48.png' },
    { src: SOURCE_EMBLEM, w: 32,   h: 32,   name: 'favicon-32x32.png' },
    { src: SOURCE_EMBLEM, w: 16,   h: 16,   name: 'favicon-16x16.png' },

    // 3. SOCIAL BANNERS & DISPLAY ADS (16:9 & Landscape)
    { src: SOURCE_BANNER, w: 1920, h: 1080, name: 'social-banner-youtube-facebook-1920x1080.png' },
    { src: SOURCE_BANNER, w: 1500, h: 500,  name: 'social-header-twitter-x-1500x500.png' },
    { src: SOURCE_BANNER, w: 1200, h: 630,  name: 'social-opengraph-ad-1200x630.png' },
    { src: SOURCE_BANNER, w: 820,  h: 312,  name: 'social-facebook-cover-820x312.png' },

    // 4. VERTICAL STORIES, REELS & MOBILE ADS (9:16)
    { src: SOURCE_STORY,  w: 1080, h: 1920, name: 'social-story-instagram-tiktok-1080x1920.png' },
    { src: SOURCE_STORY,  w: 720,  h: 1280, name: 'social-story-mobile-720x1280.png' },
  ];

  for (const item of tasks) {
    const buffer = await sharp(item.src)
      .resize(item.w, item.h, { fit: 'cover', position: 'center' })
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    // Write to both logo/ and public/logo/
    fs.writeFileSync(path.join(LOGO_DIR, item.name), buffer);
    fs.writeFileSync(path.join(PUBLIC_LOGO_DIR, item.name), buffer);
    console.log(`✓ Exported: ${item.name} (${item.w}x${item.h})`);
  }

  // Also copy main emblem directly to public/logo/logo-main.png and public/apple-icon.png
  const mainBuffer = await sharp(SOURCE_MASTER)
    .resize(512, 512)
    .png({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(path.join(WORKSPACE_DIR, 'public', 'logo-main.png'), mainBuffer);

  const emblemBuffer = await sharp(SOURCE_EMBLEM)
    .resize(512, 512)
    .png({ quality: 95 })
    .toBuffer();
  fs.writeFileSync(path.join(WORKSPACE_DIR, 'public', 'apple-icon.png'), emblemBuffer);

  console.log('All logo and social assets generated successfully!');
}

processKit().catch(err => {
  console.error('Error generating logo kit:', err);
  process.exit(1);
});
