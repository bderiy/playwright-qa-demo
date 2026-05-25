import { test, expect } from '@fixtures/test';

test.describe('Mobile playback readiness example', () => {
  test('@smoke keeps session after mobile app-like navigation', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    await page.reload();
    await expect(page.getByText('Products')).toBeVisible();
  });
});
