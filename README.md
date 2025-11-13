
# SDET_Playwright

End-to-end testing framework for web applications using Playwright, now with Playwright MCP (Model Context Protocol) integration for dynamic, JSON-driven test generation and execution.

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


## Playwright MCP Integration (Dynamic Test Generation)

### Overview
Playwright MCP enables dynamic, data-driven test generation and execution using structured JSON test case files. It supports a dual workflow:

1. **MCP Browser Execution (Workflow A):**
   - Test steps are executed in real-time using Playwright MCP tools, validating each action and assertion interactively.
2. **Playwright Code Generation (Workflow B):**
   - After successful browser execution, Playwright test code is generated using the Page Object Model (POM) structure, referencing existing page classes and locators.

### How it works
- Test cases are defined in `TestCaseDetails/test_cases_details.json` (auto-generated from Excel or other sources).
- MCP reads these JSON files, executes each step in the browser, and validates the expected results.
- Once all steps pass, MCP generates a Playwright test script in the `tests/` folder, using POM classes from `pages/`.
- The generated test is executed and iterated until it passes.
- Results are summarized in a JSON file (e.g., `reports/TC303_result.json`).

#### Example Workflow
1. Add or update test cases in `TestCaseDetails/test_cases_details.json`.
2. Run MCP to execute and generate tests:
   - `npx playwright test` (or use the MCP runner as documented in `PlaywrightMCP_Instructions/playwright_mcp_instructins.md`)
3. Review generated test files in `tests/` and result summaries in `reports/`.

#### Key Files
- `PlaywrightMCP_Instructions/playwright_mcp_instructins.md`: Main instructions for MCP-driven test generation and execution.
- `PlaywrightMCP_Instructions/pom_structure_instructions.md`: POM structure and standards for page classes.
- `TestCaseDetails/test_cases_details.json`: Source of truth for test scenarios.
- `fixtures/test-data.json`: Shared test data and environment values.
- `reports/TCxxx_result.json`: Per-test result summary (Pass/Fail).

#### Benefits
- No manual test script writing for new scenarios—just update the JSON.
- Ensures all tests use the latest POM classes and selectors.
- Rapid iteration: failed steps are debugged and fixed interactively before code generation.
- Consistent reporting and traceability from test case to result.


## Project layout
- `tests/` — feature folders (e.g. `auth/`, `cart/`, `checkout/`, `API_Testing/`) containing `.spec.js` files (including MCP-generated tests)
- `pages/` — Page Object Model (POM) classes (e.g. `login.page.js`, `cart.page.js`, `checkout.page.js`)
- `fixtures/` — test data and JSON fixtures (`test-data.json` holds baseURL, credentials, and expected error messages)
- `reports/` — screenshots, Playwright HTML reports, and MCP result JSON files
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

## Main Utility
- **getTestCaseDetails.js**: Reads test cases from an Excel file (e.g., `SauceLabs_TestCases.xlsx`) and outputs structured JSON to `TestCaseDetails/test_cases_details.json`.
- **TestCaseDetails/**: Stores the generated JSON files for use in automated tests.   



