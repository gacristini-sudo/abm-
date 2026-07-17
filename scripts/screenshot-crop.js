const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({
    path: process.argv[2] || 'crop.png',
    clip: { x: 280, y: 550, width: 760, height: 480 },
  });
  await browser.close();
})();
