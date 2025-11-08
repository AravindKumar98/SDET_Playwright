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
    # SDET_Playwright

   End-to-end testing and API automation framework using Playwright.

   This repository contains UI tests (Playwright + POM), API tests, and integration tests that combine API and UI workflows. Tests are organized by feature and include helpers, fixtures, and reporting integrations (Allure, Playwright HTML reports).

   ## What changed (recent)
   - Added chained API tests and dependent API flows (examples under `tests/API_Testing/`)
   - Added UI+API integration examples (e.g., `ui_api_integration.spec.js`) demonstrating token usage and localStorage/cookie setup
   - Centralized error messages and test data in `fixtures/test-data.json` (used by login tests)
   - Page objects (`pages/loginpage.js`) now expose assertion helpers (e.g., `assertLoginSuccess()`) — tests call these helpers for clearer responsibilities

   ## Project layout
   - `tests/` — feature folders (e.g. `auth/`, `cart/`, `checkout/`, `API_Testing/`) containing `.spec.js` files
   - `pages/` — Page Object Model (POM) classes (e.g. `loginpage.js`)
   - `fixtures/` — test data and JSON fixtures (`test-data.json` holds baseURL, credentials, and expected error messages)
   - `reports/` — screenshots and other artifacts saved during test runs
   - `playwright-report/` — Playwright HTML report output
   - `playwright.config.js` — central Playwright configuration (projects, reporters, traces, BrowserStack sections)
   - `package.json` — scripts and dependencies

   ## Quick start
   1. Install dependencies

   ```powershell
   npm ci
   npm install
   npm i -D allure-playwright
   ```

   2. Run the entire test suite

   ```powershell
   npx playwright test
   ```

   3. Run a single spec (example)

   ```powershell
   npx playwright test tests/auth/login.spec.js
   ```

   4. Run an API-only test file

   ```powershell
   npx playwright test tests/API_Testing/API_Tests_Chained.spec.js
   ```

   5. Run a single test by title (useful for TD IDs in titles)

   ```powershell
   npx playwright test -g "TD-001 | Login: should login with valid credentials"
   ```

   6. View Playwright HTML report (after a run)

   ```powershell
   npx playwright show-report
   ```

   7. Generate & serve Allure report (requires Allure CLI)

   ```powershell
   npx allure-playwright generate
   npx allure serve allure-results
   ```

   ## Notes about API test services used in examples
   - `reqres.in` is a mock API used for login and user creation. Note that POST-created resources may not persist (GET may return 404 for the returned id). Tests that depend on persistence will gracefully accept 200 or 404 and proceed to the next step (see `dependentApi.spec.js`).
   - `jsonplaceholder.typicode.com` is used for mock create/read workflows in examples. While it returns a created id, it does not always persist resources across requests.

   ## Conventions & patterns
   - Page objects live in `pages/` and encapsulate locators, actions, and assertions. Prefer calling assertion helpers from tests (keeps tests concise).
   - Test data lives in `fixtures/test-data.json`. This file now contains expected error messages used by tests (e.g., `error_invalid_credentials`).
   - Use `test.describe.serial(...)` when you need tests to run in a strict order and share state (resource id, token).

   ## Troubleshooting & tips
   - If `npx playwright test` reports "No tests found", ensure test files are inside `tests/` and named `*.spec.js`.
   - Avoid leaving `test.only` in tests — it will run only that test and skip others.
   - Use `page.evaluate()` to set localStorage or cookies in the current page; use `page.addInitScript()` before `page.goto()` when you need the value during initial page load.
   - For API tests, be aware of mock service behavior (non-persistence). Add tolerant assertions when interacting with such services.

   ## CI / BrowserStack hints
   - BrowserStack integration is available in `playwright.config.js` (projects named like `browserstack-chromium`). Provide credentials via environment variables in CI or locally:

   ```powershell
   $env:BROWSERSTACK_USERNAME='your_user'
   $env:BROWSERSTACK_ACCESS_KEY='your_key'
   ```

