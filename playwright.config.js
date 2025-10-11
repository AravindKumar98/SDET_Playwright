import { defineConfig, devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        trace: 'on',
      },
      retries: 1,
      workers: 2,
      fullyParallel: true,
    },
    {
      name: 'WebKit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
        trace: 'on',
      },
      retries: 2,
      workers: 2,
      fullyParallel: true,
    },
    {
      name: 'Pixel 5',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
        trace: 'on',
      },
      retries: 1,
      workers: 1,
      fullyParallel: false,
    },
    {
      name: 'iPhone 12',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
        trace: 'on',
      },
      retries: 2,
      workers: 1,
      fullyParallel: false,
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report' }]],
  reporter: [
    ['list'], 
    ['allure-playwright'] // adds Allure reporter
  ],
};

module.exports = config;
