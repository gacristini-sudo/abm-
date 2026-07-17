const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('console', (msg) => console.log(`[console.${msg.type()}]`, msg.text()));
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));
  await page.goto(process.argv[2] || 'http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await browser.close();
})();
