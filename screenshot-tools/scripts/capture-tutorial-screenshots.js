const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const siteBaseUrl = 'http://localhost/crash-course/cooking-gallery-site';
const slideImagesDirectory = path.join(__dirname, '..', '..', 'cooking-gallery-slides', 'assets', 'images');

async function saveScreenshot(page, name, options = {}) {
  await page.screenshot({
    path: path.join(slideImagesDirectory, name),
    fullPage: options.fullPage ?? false,
  });
}

async function login(page, username, password) {
  await page.goto(`${siteBaseUrl}/login.php`, { waitUntil: 'networkidle' });
  await page.fill('#username', username);
  await page.fill('#password', password);
  await Promise.all([
    page.waitForURL(/user\/dashboard\.php/),
    page.click('button[type="submit"]'),
  ]);
}

(async () => {
  await fs.mkdir(slideImagesDirectory, { recursive: true });

  const browser = await chromium.launch();
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });

  const publicPage = await desktopContext.newPage();
  await publicPage.goto(`${siteBaseUrl}/`, { waitUntil: 'networkidle' });
  await publicPage.locator('.hero').screenshot({
    path: path.join(slideImagesDirectory, 'site-homepage-hero.png'),
  });
  await saveScreenshot(publicPage, 'site-homepage-desktop.png');
  await saveScreenshot(publicPage, 'site-homepage-full.png', { fullPage: true });

  await publicPage.goto(`${siteBaseUrl}/recipe.php?id=1`, { waitUntil: 'networkidle' });
  await saveScreenshot(publicPage, 'site-recipe-detail.png', { fullPage: true });

  await publicPage.goto(`${siteBaseUrl}/login.php`, { waitUntil: 'networkidle' });
  await saveScreenshot(publicPage, 'site-login.png', { fullPage: true });

  await publicPage.goto(`${siteBaseUrl}/register.php`, { waitUntil: 'networkidle' });
  await saveScreenshot(publicPage, 'site-register.png', { fullPage: true });

  const userContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const userPage = await userContext.newPage();
  await login(userPage, 'maya', 'user123');
  await userPage.goto(`${siteBaseUrl}/user/new-recipe.php`, { waitUntil: 'networkidle' });
  await saveScreenshot(userPage, 'site-user-new-recipe.png', { fullPage: true });

  const adminContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const adminPage = await adminContext.newPage();
  await login(adminPage, 'admin', 'admin123');
  await adminPage.goto(`${siteBaseUrl}/admin/recipes.php`, { waitUntil: 'networkidle' });
  await saveScreenshot(adminPage, 'site-admin-recipes.png', { fullPage: true });

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${siteBaseUrl}/`, { waitUntil: 'networkidle' });
  await saveScreenshot(mobilePage, 'site-homepage-mobile.png', { fullPage: true });

  await browser.close();
})();
