import { test, expect } from '@fixtures/test';

test.describe('Authenticated inventory', () => {
  test('@smoke adds a product to cart using saved session', async ({ page, inventoryPage }) => {
    await test.step('Open authenticated inventory page', async () => {
      await page.goto('/inventory.html');
      await inventoryPage.expectLoaded();
    });

    await test.step('Add item and verify cart count', async () => {
      await inventoryPage.addItemByName('Sauce Labs Backpack');
      await inventoryPage.expectCartCount(1);
    });
  });

  test('can mock inventory API dependency for deterministic UI validation', async ({ page }) => {
    await page.route('**/inventory.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [{ id: 'qa-1', title: 'Mocked QA Item', price: 9.99 }]
        })
      });
    });

    await page.goto('/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
  });
});
