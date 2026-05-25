import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly itemCards: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.itemCards = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.getByText('Products')).toBeVisible();
    await expect(this.itemCards.first()).toBeVisible();
  }

  async addItemByName(productName: string) {
    const item = this.itemCards.filter({ hasText: productName });
    await expect(item).toHaveCount(1);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
