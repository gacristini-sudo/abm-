const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
  await page.goto(process.argv[2] || 'http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // Avoid fullPage:true — combined with position:fixed/sticky + backdrop-blur it can
  // produce stitching artifacts in Chromium. A tall fixed viewport is reliable instead.
  await page.screenshot({ path: process.argv[3] || 'shot.png', fullPage: false });
  await browser.close();
})();
