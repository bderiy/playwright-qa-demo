import { test, expect } from '@playwright/test';
import { users } from '@data/users';

test('authenticate standard user', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(users.standard.username);
  await page.getByPlaceholder('Password').fill(users.standard.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: 'storage-state/saucedemo-user.json' });
});
