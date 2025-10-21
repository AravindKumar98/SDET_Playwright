# Copilot Instructions for SDET_Playwright

## Project Overview
This is a Playwright-based end-to-end testing framework for web applications, organized for modularity and maintainability. 

## Architecture & Structure
- **tests/**: Main test directory, subdivided by feature (e.g., `auth/`, `cart/`, `checkout/`, `product/`). Each contains spec files (e.g., `login.spec.js`).
- **pages/**: Page Object Model (POM) classes encapsulate UI interactions (e.g., `loginpage.js`).
- **reports/**: Stores screenshots and Playwright HTML reports.
- **playwright.config.js**: Central config for browser projects, parallelism, retries, tracing, and reporting.
- **package.json**: Defines scripts and dependencies. Uses `@playwright/test`.

## Key Patterns & Conventions
- **Page Object Model**: All UI logic is abstracted into classes in `pages/`. Tests import and use these for actions and assertions.
- **Test Data**: Tests may import shared data from JSON files (e.g., `sharedData.json`).
- **Spec File Naming**: Test files use `.spec.js` and are grouped by feature.
- **ES Modules**: Most files use `import`/`export` syntax. Ensure Node.js supports ES modules or set `"type": "module"` in `package.json`.
- **Screenshots & Traces**: Screenshots are saved in `reports/`. Tracing is enabled per browser in config.

## Developer Workflows
- **Run All Tests**: `npm test` or `npx playwright test` from project root.
- **Run Specific Test**: `npx playwright test tests/auth/login.spec.js`
- **View Report**: `npx playwright show-report` (opens HTML report from last run)
- **Debugging**: Use Playwright's `--debug` or `--headed` flags for interactive runs.
- **Add New Test**: Create a new `.spec.js` in the appropriate feature folder and use POM classes.

## Configuration Highlights
- **playwright.config.js**:
  - `projects`: Defines Chromium, WebKit, Pixel 5, iPhone 12 with custom viewport, trace, retries, and parallel settings.
  - `reporter`: Outputs HTML and list reports to `reports/playwright-report`.
  - `testDir`: Set to `./tests`.
- **Test Data**: If using shared data, place JSON files in a `test-data/` folder and import as needed.

## Integration Points
- **External Dependencies**: Relies on `@playwright/test` and Playwright browsers.
- **Reports**: HTML and trace reports are generated in `reports/playwright-report`.

## Tips for AI Agents
- Always use POM classes for UI actions.
- Place screenshots and traces in `reports/`.
- Respect browser/project settings in `playwright.config.js`.
- Use feature-based folders for organizing tests.
- Reference shared data from JSON files for credentials and test values.

---
If any conventions or workflows are unclear, ask the user for clarification or examples.