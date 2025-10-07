import { test } from '@playwright/test';
import LoginPage from '../../pages/loginpage';
import sharedData from '../../fixtures/test-data.json';

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.nagivateToSauceDemoSite();
    await loginPage.login(sharedData.username, sharedData.password);
    await loginPage.verifyLoginSuccess();
});
