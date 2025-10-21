# SDET_Playwright

End-to-end testing framework for web applications using Playwright.

## Project Structure
- `tests/` — Feature-based folders (e.g., `auth/`, `cart/`, `checkout/`, `product/`) with `.spec.js` test files
- `pages/` — Page Object Model (POM) classes for UI interactions
- `reports/` — Screenshots and Playwright HTML reports
- `playwright.config.js` — Central configuration for browsers, parallelism, retries, tracing, and reporting
- `package.json` — Scripts and dependencies

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   npm i -D allure-playwright
   ```
2. **Run all tests:**
   ```sh
   npm test
   # or
   npx playwright test
   ```
3. **Run a specific test:**
   ```sh
   npx playwright test tests/auth/login.spec.js
   ```
4. **View Playwright HTML report:**
   ```sh
   npx playwright show-report
   # SDET_Playwright

   End-to-end testing framework for web applications using Playwright. This repository contains Playwright tests organized by feature, Page Object Model classes, reporting, and CI/cloud integrations (Allure, BrowserStack, Jenkins).

   ## Project layout (what to look at)
   - `tests/` — feature folders (e.g. `auth/`, `cart/`, `checkout/`, `product/`) containing `.spec.js` files.
   - `pages/` — Page Object Model (POM) classes (e.g. `loginpage.js`, `cartpage.js`, `checkoutpage.js`).
   - `fixtures/` — local test fixtures and JSON test-data used by tests.
   - `reports/` — screenshots and other artifacts saved during test runs.
   - `playwright-report/` — Playwright HTML report output.
   - `playwright.config.js` — central Playwright configuration (projects, reporters, traces, BrowserStack sections).
   - `package.json` — scripts and dev dependencies (uses `@playwright/test`).

   ## Quick start
   1. Install dependencies:

   ```bash
   npm ci
   npm i -D allure-playwright
   ```

   2. Run the entire test suite:

   ```bash
   npm test
   # or
   npx playwright test
   ```

   3. Run a single spec:

   ```bash
   npx playwright test tests/auth/login.spec.js
   ```

   4. View Playwright HTML report (generated after a run):

   ```bash
   npx playwright show-report
   ```

   5. Generate & serve Allure report (requires Allure CLI installed globally or available in CI image):

   ```bash
   npx allure-playwright generate
   npx allure serve allure-results
   ```

   ## What's new / project changes
   - Allure reporting added (`allure-playwright`) and results stored for CI consumption.
   - BrowserStack integration available via browser-specific `projects` in `playwright.config.js` using `connectOptions.wsEndpoint` and environment credentials.
   - Tests are organized into feature folders under `tests/` and use POM classes from `pages/`.

   ## BrowserStack (cloud) notes
   - Install helper (optional):

   ```bash
   npm i -D @browserstack/playwright-cli
   ```

   - Provide credentials via environment variables in CI or locally:

   ```powershell
   $env:BROWSERSTACK_USERNAME='your_user'
   $env:BROWSERSTACK_ACCESS_KEY='your_key'
   ```

   - The `playwright.config.js` includes BrowserStack projects named like `browserstack-chromium`, `browserstack-webkit`, `browserstack-edge`. They connect over a wss endpoint and pass caps including `browserstack.username` and `browserstack.accessKey`.

   ## Jenkins (CI) notes
   - Example Jenkins pipeline snippet (Linux agent example):

   ```groovy
   pipeline {
     agent any
     stages {
       stage('Install') { steps { sh 'npm ci' } }
       stage('Test')    { steps { sh 'npx playwright test --reporter=list,html' } }
       stage('Allure')  { steps { sh 'npx allure-playwright generate || true' } }
     }
     post { always { archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true } }
   }
   ```

   Notes:
   - Ensure the Jenkins agent has Node.js and required browsers or use BrowserStack for cross-browser runs.
   - Install Allure plugin on Jenkins if you want native Allure report visualization.

   ## Conventions & patterns
   - POM: tests instantiate page objects from `pages/` (e.g., `new LoginPage(page)`) and call high-level actions like `login()` and `verifyLoginSuccess()`.
   - Test files are named `*.spec.js` and grouped by feature under `tests/`.
   - Traces, screenshots and video are configured in `playwright.config.js` and often set to retain only on failure.

   ## Example (login) test

   ```js
   import { test } from '@playwright/test';
   import LoginPage from '../../pages/loginpage';
   import sharedData from '../../fixtures/test-data.json';

   test('Login Test', async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.nagivateToSauceDemoSite();
     await loginPage.login(sharedData.username, sharedData.password);
     await loginPage.verifyLoginSuccess();
   });
   ```

   ## Running locally on BrowserStack (example)

   ```bash
   # set credentials
   export BROWSERSTACK_USERNAME=your_user
   export BROWSERSTACK_ACCESS_KEY=your_key

   # run playwright targeting browserstack projects
   npx playwright test -p browserstack-chromium
   ```

   On Windows PowerShell replace `export` with:

   ```powershell
   $env:BROWSERSTACK_USERNAME='your_user'
   $env:BROWSERSTACK_ACCESS_KEY='your_key'
   ```

   ## Troubleshooting & tips
   - If `npx playwright test` reports "No tests found", ensure test files are inside `tests/` and named `*.spec.js`.
   - Use `test.only` sparingly — it will run only that test.
   - If using CommonJS `require()` in tests, consider adding `"type": "module"` to `package.json` or convert tests to CommonJS.
   - Allure: ensure `allure` CLI is available on PATH in CI to serve reports.

   ## Contact / Next steps
   - For automation conventions see `.github/copilot-instructions.md` for AI agent guidance.
   - Tell me if you want the README to include examples for a specific CI provider or BrowserStack capabilities and I'll extend it.
