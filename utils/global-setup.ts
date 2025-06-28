import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs/promises';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to login page
  await page.goto('https://www.saucedemo.com/');

  // Perform login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');

  // Save authenticated session
  await page.context().storageState({ path: 'storage/auth.json' });
  console.log('✅ Authenticated session saved to storage/auth.json');

  await browser.close();
}

export default globalSetup;