import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productTitles: Locator;
    readonly sortDropdown: Locator;
    readonly cartBadge: Locator;
    readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = page.locator('.inventory_item_name');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButtons = page.locator('button.btn_inventory');
  }

  async isAtInventoryPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  async verifyProductsVisible() {
    const items = this.page.locator('.inventory_item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async sortBy(option: 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)') {
    await this.sortDropdown.selectOption({ label: option });
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeFirstItemFromCart() {
    const firstButton = this.addToCartButtons.first();
    await firstButton.click(); // Click once to add
    await firstButton.click(); // Click again to remove
  }

  async getCartCount(): Promise<number> {
    const count = await this.cartBadge.textContent();
    return count ? parseInt(count) : 0;
  }

  async getProductCount(): Promise<number> {
    return await this.productTitles.count();
  }

  async openFirstProduct() {
    await this.productTitles.first().click();
  }
}