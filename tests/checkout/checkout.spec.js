import { test } from "playwright/test";
import LoginPage from "../../pages/loginpage";
import cartPage from "../../pages/cartpage";
import CheckoutPage from "../../pages/checkoutpage";
import sharedData from "../../fixtures/test-data.json";

test.describe('Verify the checkout of the product', () => {
    test('Complete the checout process', async ({ page }) => {
        const login = new LoginPage(page);
        await login.nagivateToSauceDemoSite();
        await login.login(sharedData.username, sharedData.password);
        await login.verifyLoginSuccess();
        const cart = new cartPage(page);
        await cart.addProductToCart(sharedData.product);
        await cart.verifyProductInCart(sharedData.product);
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.proceedToCheckout();
        await checkoutPage.fillCheckoutInformation(sharedData.firstName, sharedData.lastName, sharedData.postalCode);
        await checkoutPage.verifyCheckoutOverview(sharedData.product);
        await checkoutPage.finishCheckout();
        await checkoutPage.verifyCheckoutComplete(sharedData.orderConfirmationMessage);

    })
})