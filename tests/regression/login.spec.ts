import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'papaparse';

[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' }
].forEach(({ name, expected }) => {
  test(`@regression should login successfully with valid credentials for user: ${name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    console.log("--->", name);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isAtInventoryPage();
    await inventoryPage.verifyProductsVisible();
  });
});

const csvFile = fs.readFileSync(path.join(__dirname, '../../fixtures/loginUsers.csv'), 'utf8');
const csvData = parse(csvFile, { header: true }).data as { username: string; password: string, outcome: string }[];

for (const { username, password, outcome } of csvData) {
  if (username && password) {
    test(`@regression should handle login for user: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(username, password);

      if (outcome === 'success') {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.isAtInventoryPage();
        await inventoryPage.verifyProductsVisible();
      } else {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
      }
    });
  }
}