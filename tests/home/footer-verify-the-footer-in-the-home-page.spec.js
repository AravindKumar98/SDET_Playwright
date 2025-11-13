import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import testData from '../../fixtures/test-data.json';

test('Footer - Verify the footer in the Home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  const productsPage = new ProductsPage(page);
  await productsPage.scrollToFooter();
  await productsPage.assertFooterYear();
  await productsPage.assertSocialLinksVisible();
  await productsPage.assertSocialLinksNavigable();
});
