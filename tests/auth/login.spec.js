import { test } from '@playwright/test';
import LoginPage from '../../pages/loginpage';
import sharedData from '../../test-data/sharedData.json';

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(sharedData.username, sharedData.password);
    await loginPage.verifyLoginSuccess();
});
