
import { expect } from "@playwright/test";
import testData from "../fixtures/test-data.json";
import { BasePage } from "./base.page.js";

class LoginPage extends BasePage {

  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryList = page.locator('.inventory_list');
  }

  async nagivateToSauceDemoSite() {
    await this.navigateTo(testData.baseURL);
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  // Clear username and password inputs
  async clearCredentials() {
    await this.fill(this.usernameInput, '');
    await this.fill(this.passwordInput, '');
  }

  // Return login error text if present
  async getLoginErrorText() {
    const error = this.page.locator('[data-test="error"]');
    if (await error.count() === 0) return '';
    return (await error.innerText()).trim();
  }

  // Alias with correct spelling (keeps backward compatibility)
  async navigateToSauceDemoSite() {
    return this.nagivateToSauceDemoSite();
  }

  async verifyLoginSuccess() {
    await this.inventoryList.waitFor({ state: 'visible' });
    const title = await this.page.title();
    console.log('Page Title after login:', title);
    await this.page.screenshot({ path: 'reports/login-success.png' });
  }

  // Assertion helpers moved into the page object so tests can call them
  async assertLoginSuccess() {
    // Wait and assert inventory list is visible
    await expect(this.inventoryList).toBeVisible();
  }

  async assertLoginErrorPresent() {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
  }

  async assertLoginErrorContains(expectedSubstring) {
    const err = await this.getLoginErrorText();
    expect(err.toLowerCase()).toContain(expectedSubstring.toLowerCase());
  }

  async assertRequiredFieldError(expectedMessage) {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
    if (expectedMessage) {
      expect(err).toContain(expectedMessage);
    } else {
      // ensure message mentions username or password
      expect(err.toLowerCase()).toMatch(/username|password/);
    }
  }

  async assertLockedOutError(expectedMessage) {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
    if (expectedMessage) {
      expect(err).toContain(expectedMessage);
    } else {
      expect(err.toLowerCase()).toContain('locked');
    }
  }
}

export { LoginPage };

