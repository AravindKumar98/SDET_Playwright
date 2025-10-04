import { Page, locator, expect } from "@playwright/test";

class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryList = page.locator('.inventory_list');
  }

  async login(username, password) {
    await this.page.goto('https://www.saucedemo.com/');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

    async verifyLoginSuccess() {
    await this.inventoryList.waitFor({ state: 'visible' });
    const title = await this.page.title();
    console.log('Page Title after login:', title);
    await this.page.screenshot({ path: 'reports/login-success.png' });
  }
  
}

export default LoginPage;
