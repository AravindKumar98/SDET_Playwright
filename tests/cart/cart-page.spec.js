import { test, expect } from "@playwright/test";
import testData from "../../fixtures/test-data.json";
import { LoginPage } from "../../pages/login.page.js";
import { CartPage } from "../../pages/cart.page.js";

// TC201: Verify the cart page after user added product to the cart
test("TC201- Verify the cart page after user added product to the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Assert cart page details using CartPage POM methods
  const cartProducts = await cartPage.getCartProducts();
  expect(cartProducts.some(item => item.includes(testData.product))).toBeTruthy();
  expect(await cartPage.isRemoveButtonVisible()).toBeTruthy();
  expect(await cartPage.isContinueShoppingButtonVisible()).toBeTruthy();
  expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
});

// TC202: Verify the page after user clicks on Checkout button from cart page
test("TC202- Verify the page after user clicks on Checkout button from cart page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Click Checkout button using CartPage POM
  expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
  await cartPage.clickCheckoutButton();

  // Assert Checkout: Your Information page is displayed using CartPage POM
  expect(await cartPage.isCheckoutInformationVisible()).toBeTruthy();
});

// TC203: Verify the page after user clicks on Remove button from cart page
test("TC203- Verify the page after user clicks on Remove button from cart page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToSauceDemoSite();
  await loginPage.login(testData.username, testData.password);
  await loginPage.assertLoginSuccess();

  await cartPage.addProductToCart(testData.product);
  await cartPage.verifyProductInCart(testData.product);

  // Click Remove button using CartPage POM
  await cartPage.removeProductFromCart(testData.product);

  // Assert product is removed and cart is empty using CartPage POM
  expect(await cartPage.isCartEmpty()).toBeTruthy();
  await page.screenshot({ path: 'reports/empty-cart.png' });
});
