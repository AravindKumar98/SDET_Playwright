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
   ```
5. **View Allure report:**
   ```sh
   npx allure-playwright generate
   npx allure serve allure-results
   ```
   (Requires allure-playwright and Allure CLI)

## Cloud & CI Integration

### BrowserStack Setup
1. **Install BrowserStack Playwright CLI:**
   ```sh
   npm i -D @browserstack/playwright-cli
   ```
2. **Configure BrowserStack credentials:**
   - Set `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` as environment variables.
   - Or add them to your `browserstack.config.js`.
3. **Run tests on BrowserStack:**
   ```sh
   npx browserstack-playwright test
   ```
   - See BrowserStack docs for advanced config and parallelization.

## Key Patterns
- **Page Object Model:** UI logic in `pages/` classes, imported by tests
- **Test Data:** Shared data in JSON files (e.g., `test-data/sharedData.json`)
- **Screenshots & Traces:** Saved in `reports/` and enabled per browser in config
- **ES Modules:** Most files use `import`/`export` syntax; set `"type": "module"` in `package.json` if needed

## Configuration Highlights
- Multiple browser projects: Chromium, WebKit, Pixel 5, iPhone 12
- Custom viewport, trace, retries, parallel settings per browser
- HTML, list, and Allure reporters output to `reports/playwright-report` and Allure results
- Screenshots, video, and trace are retained only on failure for Chromium

## Example Test
```js
import { test } from '@playwright/test';
import LoginPage from '../../pages/loginpage';
import sharedData from '../../test-data/sharedData.json';

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(sharedData.username, sharedData.password);
    await loginPage.verifyLoginSuccess();
});
```

## Tips
- Use POM classes for all UI actions
- Organize tests by feature
- Reference shared data for credentials and test values
- Place screenshots and traces in `reports/`
- Use Allure reporter for advanced test reporting
- Integrate with BrowserStack for cloud testing
- Use Jenkins for CI automation

---
For more details, see `.github/copilot-instructions.md` or ask for examples of specific workflows.