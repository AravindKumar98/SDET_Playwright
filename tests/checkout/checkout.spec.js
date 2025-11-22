import { test, expect } from '@playwright/test';
import testData from '../../fixtures/test-data.json';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';

// TC301: Verify the checkout step one page

test('Verify the checkout step one page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Prerequisite: Login and add product to cart
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await cartPage.addProductToCart(testData.product);
  await cartPage.openCart();

  // Step 1: Cart page will be displayed
  await expect(page.locator('.cart_item')).toBeVisible();

  // Step 2: Click on Checkout button
  await cartPage.checkoutButton.click();

  // Step 3: Fill the First Name, Last Name, Zip/Postal Code fields
  await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);

  // Step 4: Checkout: Overview will be displayed with Finish and Cancel buttons
  await expect(page.locator('text=Checkout: Overview')).toBeVisible();
  await expect(checkoutPage.finishButton).toBeVisible();
  await expect(checkoutPage.cancelButton).toBeVisible();
});

// // TC302: Verify the checkout step two page

test('Verify the checkout step two page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Prerequisite: Login and add product to cart
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await cartPage.addProductToCart(testData.product);
  await cartPage.openCart();

  // Step 1: Cart page will be displayed
  await expect(page.locator('.cart_item')).toBeVisible();

  // Step 2: Click on Checkout button
  await cartPage.checkoutButton.click();

  // Step 3: Fill the First Name, Last Name, Zip/Postal Code fields
  await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);

  // Step 4: Checkout: Overview will be displayed
  await expect(page.locator('text=Checkout: Overview')).toBeVisible();

  // Step 5: Verify product details, payment, shipping, total price
  await expect(page.locator('.inventory_item_name')).toHaveText(testData.product);
  await expect(page.locator('text=Payment Information:')).toBeVisible();
  await expect(page.locator('text=Shipping Information:')).toBeVisible();
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
});

// // TC303: Verify that user should able to place an order successfully

test('Verify that user should able to place an order successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Prerequisite: Login and add product to cart, go to checkout
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await cartPage.addProductToCart(testData.product);
  await cartPage.openCart();
  await cartPage.checkoutButton.click();
  await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);

  // Step 1: Verify product information
  await expect(page.locator('.inventory_item_name')).toHaveText(testData.product);
  await expect(page.locator('text=Payment Information:')).toBeVisible();
  await expect(page.locator('text=Shipping Information:')).toBeVisible();
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();

  // Step 2: Click on Finish button
  await checkoutPage.finishButton.click();

  // Expected: Order confirmation message
  await expect(page.locator('.complete-header')).toHaveText(testData.orderConfirmationMessage);
  await expect(page.locator('text=Back Home')).toBeVisible();
});

// TC304: Verify that user clicks on Cancelling the order from Checkout page

test('Verify that user clicks on Cancelling the order from Checkout page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Prerequisite: Login and add product to cart, go to checkout
  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await cartPage.addProductToCart(testData.product);
  await cartPage.openCart();
  await cartPage.checkoutButton.click();

  // Step 1: Enter the user information
  await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);

  // Step 2: Checkout: Overview will be displayed
  await expect(page.locator('text=Checkout: Overview')).toBeVisible();

  // Step 3: Click on Cancel button
  await checkoutPage.cancelButton.click();

  // Expected: Return to Home page and product in the cart should not be removed
  await expect(page.locator('.inventory_list')).toBeVisible();
  await cartPage.openCart();
  await expect(page.locator('.cart_item')).toBeVisible();
});
