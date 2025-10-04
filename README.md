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
4. **View HTML report:**
   ```sh
   npx playwright show-report
   ```

## Key Patterns
- **Page Object Model:** UI logic in `pages/` classes, imported by tests
- **Test Data:** Shared data in JSON files (e.g., `test-data/sharedData.json`)
- **Screenshots & Traces:** Saved in `reports/` and enabled per browser in config
- **ES Modules:** Most files use `import`/`export` syntax; set `"type": "module"` in `package.json` if needed

## Configuration Highlights
- Multiple browser projects: Chromium, WebKit, Pixel 5, iPhone 12
- Custom viewport, trace, retries, parallel settings per browser
- HTML and list reporters output to `reports/playwright-report`

## Tips
- Use POM classes for all UI actions
- Organize tests by feature
- Reference shared data for credentials and test values
- Place screenshots and traces in `reports/`

---
For more details, see `.github/copilot-instructions.md` or ask for examples of specific workflows.