# 🧱 Playwright Project Structure (POM-based Automation Framework)

This document defines how to organize your Playwright project in a **Page Object Model (POM)** structure for clean, scalable, and maintainable automation. It should be referenced in the main Playwright MCP instruction file during test script generation.

---

## 🎯 Objective

Establish a reusable, modular Page Object Model (POM) framework that separates **locators**, **page actions**, and **test logic**, ensuring maintainability and scalability of Playwright automation.

---

## 🗂️ Recommended Project Structure

```
project-root/
│
├── fixtures/
│   └── test-data.json
│
├── pages/
│   ├── login.page.js
│   ├── cart.page.js
│   ├── checkout.page.js
│   ├── products.page.js
│   └── base.page.js
│
├── tests/
│   ├── login-with-valid-credentials.spec.js
│   ├── add-product-to-cart.spec.js
│   └── checkout-order.spec.js
│
├── utils/
│   └── helpers.js
│
├── playwright.config.js
└── instructions.md
```

---

## 🧩 1. Base Page Class

Create a **BasePage** class to hold reusable navigation and utility functions.

**File:** `pages/base.page.js`

```js
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async click(element) {
    await this.page.click(element);
  }

  async fill(element, value) {
    await this.page.fill(element, value);
  }

  async getText(element) {
    return await this.page.textContent(element);
  }

  async isVisible(element) {
    return await this.page.isVisible(element);
  }
}
```

---

## 🧱 2. Page Classes (Locators + Page Actions)

Each page (Login, Cart, Checkout, etc.) should have its own class extending `BasePage`. Define **locators** at the top and implement **page-specific actions** below.

---

### Example: `pages/checkoutpage.js`

```js
import { BasePage } from "../pages/base.page.js";
import { expect } from "@playwright/test";

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.inventoryItem = page.locator('//div[@class="inventory_item_name"]');
    this.orderconfirmation = page.locator('.complete-header');
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
    await this.click(this.continueButton);
  }
  async finishCheckout() {
    await this.click(this.finishButton);
  }

  async verifyCheckoutOverview(product) {
    const productName = await this.inventoryItem.innerText();
    expect(productName).toBe(product);
  }

  async verifyCheckoutComplete(orderConfirmationMessage) {
    const confirmationMessage = await this.orderconfirmation.innerText();
    expect(confirmationMessage).toBe(orderConfirmationMessage);
    await this.page.screenshot({ path: 'reports/checkout-complete.png' });
  }
}
export default CheckoutPage;
```

---

## 🧠 3. Using Page Classes in Test Logic

### Example: `tests/login-with-valid-credentials.spec.js`

```js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import testData from '../fixtures/test-data.json';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo(testData.baseURL);
  await loginPage.login(testData.username, testData.password);

  await expect(page.locator('text=Swag Labs')).toBeVisible();
});
```

---

## 🧾 4. Guidelines for Test Generation via MCP

When generating tests through Playwright MCP:

1. **Always reference this POM structure** for script creation.
2. **Use existing page classes** to perform actions.
3. **DO NOT hardcode locators** inside test logic.
4. If a locator is missing, MCP should create or update the respective page class.
5. **Export** all page classes and import them into test scripts.
6. Store all generated page classes under the `/pages` directory.

---

## 🧩 5. Example MCP Workflow

| Step | Action                                    | Result                                     |
| ---- | ----------------------------------------- | ------------------------------------------ |
| 1    | Read `test_cases_details.json`            | Get structured test case data              |
| 2    | Reference `pom_structure_instructions.md` | Follow POM standards while generating code |
| 3    | Create or update relevant page class      | Add locators and actions                   |
| 4    | Generate `tests/<test-title>.spec.js`     | Use imported page classes                  |
| 5    | Execute and iterate until pass            | Maintain POM integrity                     |

---

## 🚀 6. Benefits

* ✅ **Clean code separation** (UI logic vs. test logic)
* 🔁 **Reusable locators and actions**
* 🧩 **Easier maintenance** when UI changes
* ⚡ **Scalable test suite** — easily add more pages and flows
* 🤝 **Integrates seamlessly** with Playwright MCP automation

---

## 🧭 7. Integration with Main Instruction File

The **playwright_mcp_instructions.md** file must **reference this po_structure_instructions.md** to enforce code generation standards.

---

**Author:** Aravind Kumar
**Purpose:** Enforce POM-based Playwright architecture for maintainable, reusable, and scalable test automation
**Usage:** Used in conjunction with Playwright MCP Instructions for automated test generation
