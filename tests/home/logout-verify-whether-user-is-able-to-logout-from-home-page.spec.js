import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { MenuPage } from '../../pages/menu.page.js';
import testData from '../../fixtures/test-data.json';

test('Logout - Verify whether user is able to logout from Home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  const menuPage = new MenuPage(page);
  await menuPage.openMenu();
  await menuPage.logout();
  await menuPage.assertOnLoginPage();
});
