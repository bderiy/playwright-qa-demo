import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Authentication', () => {
  test('@smoke allows a valid user to sign in', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('shows a clear error for locked out users', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError(/locked out/i);
  });

  test('does not leak password in failed login request logs', async ({ page, loginPage }) => {
    const requests: string[] = [];
    page.on('request', request => requests.push(request.url()));

    await loginPage.goto();
    await loginPage.login('invalid_user', 'super-secret-value');
    await loginPage.expectError(/username and password do not match/i);

    expect(requests.join('\n')).not.toContain('super-secret-value');
  });
});
