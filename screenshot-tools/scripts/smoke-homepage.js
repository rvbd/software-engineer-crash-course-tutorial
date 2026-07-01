const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const outputDirectory = path.join(__dirname, '..', 'output');
const homepageUrl = 'http://localhost/crash-course/cooking-gallery-site/';

(async () => {
  await fs.mkdir(outputDirectory, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  await page.goto(homepageUrl, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(outputDirectory, 'homepage-desktop.png'),
    fullPage: true,
  });

  await browser.close();
})();
