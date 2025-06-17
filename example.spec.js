const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('should have a "Get Started" link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const getStarted = page.locator('text=Get started');
  await expect(getStarted).toBeVisible();
  await getStarted.click();
  await expect(page).toHaveURL(/.*docs\/intro/);
});

test('navigation bar contains Docs', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const docsLink = page.locator('nav >> text=Docs');
  await expect(docsLink).toBeVisible();
});