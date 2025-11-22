import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { MenuPage } from '../../pages/menu.page.js';
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

test('Logout - Verify whether user is able to logout from Home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  const menuPage = new MenuPage(page);
  await menuPage.openMenu();
  await menuPage.logout();
  await menuPage.assertOnLoginPage();
});

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

test('Verify that whether user lands on Home page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await expect(page.locator('text=Swag Labs')).toBeVisible();
});


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