import { test, expect } from '../../fixtures/custom-fixtures.js';
import testData from '../../fixtures/test-data.json';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';


test.describe('Checkout Page Flows', () => {
  let loginPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.login(testData.username, testData.password);
    await cartPage.addProductToCart(testData.product);
    await cartPage.clickCheckoutButton();
    console.log('[Setup] User logged in, product added, navigated to checkout');
  });

  test('@smoke @regression TC301 - Verify checkout information page', async ({ page }) => {
    expect(await checkoutPage.isCheckoutInformationVisible()).toBeTruthy();
    await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);
    await checkoutPage.clickContinueButton();
    expect(await checkoutPage.isCheckoutOverviewVisible()).toBeTruthy();
    console.log('[Assert] Checkout information and overview page verified');
  });

  test('@regression TC302 - Verify error on missing checkout info', async ({ page }) => {
    await checkoutPage.clickContinueButton();
    expect(await checkoutPage.isErrorMessageVisible()).toBeTruthy();
    expect(await checkoutPage.getErrorMessage()).toContain('Error');
    console.log('[Assert] Error message displayed for missing checkout info');
  });

  test('@sanity TC303 - Verify successful order completion', async ({ page }) => {
    await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    expect(await checkoutPage.isOrderCompleteVisible()).toBeTruthy();
    await page.screenshot({ path: 'reports/order-complete.png' });
    console.log('[Assert] Order completed and confirmation displayed');
  });

  test.afterEach(async () => {
    console.log('[Teardown] Test completed for Checkout Page Flow');
  });
});
