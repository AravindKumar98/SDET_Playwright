import { test } from '@playwright/test';
import LoginPage from '../../pages/login.page';
import CartPage from '../../pages/cart.page';
import sharedData from '../../fixtures/test-data.json';

test('Search for the product and add to the cart', async ( {page} ) => {
   const loginPage = new LoginPage(page);
   await loginPage.nagivateToSauceDemoSite();
   await loginPage.login(sharedData.username, sharedData.password);
   await loginPage.verifyLoginSuccess();
   const cartPage = new CartPage(page);
   await cartPage.addProductToCart(sharedData.product);
   await cartPage.verifyProductInCart(sharedData.product);
});