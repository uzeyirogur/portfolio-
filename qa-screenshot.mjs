import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3001/');
await page.waitForTimeout(2500);

await page.evaluate(() => {
  const l = document.querySelector('[class*="loader"]');
  if (l) l.style.display = 'none';
  window.dispatchEvent(new CustomEvent('loaderDone'));
});
await page.waitForTimeout(600);

// 1. Title card — pin start
const workTop = await page.evaluate(() => {
  let top = 0, el = document.getElementById('work');
  while (el) { top += el.offsetTop; el = el.offsetParent; }
  window.scrollTo({ top, behavior: 'instant' });
  return top;
});
await page.waitForTimeout(400);
await page.screenshot({ path: 'qa-pill-entry.png' });

// 2. Mid slide-up: 8% progress — pill halfway off screen
await page.evaluate((wTop) => {
  window.scrollTo({ top: wTop + 5 * window.innerHeight * 0.08, behavior: 'instant' });
}, workTop);
await new Promise(r => setTimeout(r, 400));
await page.evaluate(() => { if (window.ScrollTrigger) window.ScrollTrigger.update(); });
await new Promise(r => setTimeout(r, 200));
await page.screenshot({ path: 'qa-pill-slideup.png' });

// 3. First project visible (25% progress)
await page.evaluate((wTop) => {
  window.scrollTo({ top: wTop + 5 * window.innerHeight * 0.25, behavior: 'instant' });
}, workTop);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'qa-project1.png' });

await browser.close();
console.log('Screenshots saved.');
