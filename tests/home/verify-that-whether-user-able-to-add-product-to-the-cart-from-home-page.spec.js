import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import testData from '../../fixtures/test-data.json';

test('Verify that whether user able to add product to the cart from home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await cartPage.addProductToCart(testData.product);
  // Optionally verify cart icon shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  // Optionally verify button changed to Remove
  const removeBtn = page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${testData.product}']]//button[contains(text(),'Remove')]`);
  await expect(removeBtn).toBeVisible();
});
