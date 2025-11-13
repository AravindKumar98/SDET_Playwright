import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import testData from '../../fixtures/test-data.json';

test('Verify that whether user lands on Home page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await expect(page.locator('text=Swag Labs')).toBeVisible();
});
