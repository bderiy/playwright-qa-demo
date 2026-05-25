import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 7_500
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000
  },
  projects: [
    {
      name: 'setup',
      testMatch: 'ui/*.setup.ts'
    },
    {
      name: 'chromium-authenticated',
      testMatch: 'ui/*.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage-state/saucedemo-user.json'
      }
    },
    {
      name: 'webkit-guest',
      testMatch: 'ui/*.spec.ts',
      testIgnore: ['ui/*.authenticated.spec.ts', 'ui/*.mobile.spec.ts'],
      use: {
        ...devices['Desktop Safari']
      }
    },
    {
      name: 'mobile-chrome',
      testMatch: /.*mobile.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Pixel 7'],
        storageState: 'storage-state/saucedemo-user.json'
      }
    },
    {
      name: 'api',
      testMatch: 'api/*.api.spec.ts'
    }
  ]
});
