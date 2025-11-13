import { test, expect } from "@playwright/test";
import testData from "../fixtures/test-data.json";
import { LoginPage } from "../pages/login.page.js";
import { CartPage } from "../pages/cart.page.js";

// TC201: Verify the cart page after user added product to the cart
test("Verify the cart page after user added product to the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Assert cart page details
  const cartProducts = await cartPage.getCartProducts();
  expect(cartProducts.some(item => item.includes(testData.product))).toBeTruthy();
  // Optionally, check for Remove, Continue Shopping, and Checkout buttons
  await expect(page.locator('button:has-text("Remove")')).toBeVisible();
  await expect(page.locator('button:has-text("Continue Shopping")')).toBeVisible();
  await expect(page.locator('button:has-text("Checkout")')).toBeVisible();
});

// TC202: Verify the page after user clicks on Checkout button from cart page
test("Verify the page after user clicks on Checkout button from cart page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Click Checkout button
  await expect(page.locator('button:has-text("Checkout")')).toBeVisible();
  await page.click('button:has-text("Checkout")');

  // Assert Checkout: Your Information page is displayed
  await expect(page.locator('input[placeholder="First Name"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Last Name"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Zip/Postal Code"]')).toBeVisible();
});

// TC203: Verify the page after user clicks on Remove button from cart page
test("Verify the page after user clicks on Remove button from cart page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Click Remove button
  await cartPage.removeProductFromCart(testData.product);

  // Assert product is removed and cart is empty
  await expect(page.locator('.cart_item')).toHaveCount(0);
  await page.screenshot({ path: 'reports/empty-cart.png' });
});
