import { test as base, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { ApiClient } from '@utils/ApiClient';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  apiClient: ApiClient;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'));
  }
});

export { expect, APIRequestContext };
