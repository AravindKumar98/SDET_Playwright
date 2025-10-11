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
        screenshot: 'only-on-failure',  // takes screenshots only when a test fails
        video: 'retain-on-failure',     // records video for failed tests
        trace: 'retain-on-failure',     // keeps trace for debugging failures
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
   {
      name: 'browserstack-chromium',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'chrome',
            browser_version: 'latest',
            os: 'osx',
            os_version: 'Sonoma',
            buildName: 'Playwright-Jenkins-Build',
            sessionName: 'BrowserStack-Cloud-Test',
            'browserstack.username': process.env.BROWSERSTACK_USERNAME,
            'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
          }))}`,
          timeout: 60000, // 60 seconds timeout
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ],
  reporter: [
    ['list'], 
    ['allure-playwright'] // adds Allure reporter
  ],

};

module.exports = config;
