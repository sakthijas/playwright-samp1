import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goto();
  });

  test('@smoke should display product list', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const count = await inventory.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test.skip('@smoke should sort items by Price (low to high)', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('Price (low to high)');
    await expect(inventory.sortDropdown).toHaveValue('lohi');
  });

  test('@smoke should add an item to cart and show badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addFirstItemToCart();
    const cartCount = await inventory.getCartCount();
    expect(cartCount).toBe(2);
  });

  test.skip('should remove item from cart and hide badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addFirstItemToCart();
    await inventory.removeFirstItemFromCart();
    await expect(inventory.cartBadge).toHaveCount(0);
  });

  test('should navigate to product details on click', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.openFirstProduct();
    await expect(page).toHaveURL(/inventory-item\.html/);
  });
});