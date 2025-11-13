import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import testData from '../../fixtures/test-data.json';

test('Verify the user able to remove the product from the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  // Ensure product is added to cart first
  await cartPage.addProductToCart(testData.product);
  // Remove the product from cart
  await cartPage.removeProductFromCart(testData.product);
  // Click 'Continue Shopping' to return to inventory page
  const continueShoppingBtn = page.locator("button:has-text('Continue Shopping')");
  if (await continueShoppingBtn.isVisible()) {
    await continueShoppingBtn.click();
  }
  // Verify product is removed: Add to cart button should reappear
  const addToCartBtn = page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${testData.product}']]//button[contains(text(),'Add to cart')]`);
  await expect(addToCartBtn).toBeVisible();
  // Optionally verify cart badge is gone
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
