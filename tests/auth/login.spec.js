import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/loginpage';
import sharedData from '../../fixtures/test-data.json';

test.describe('SauceDemo - Login flows', () => {

    test.beforeEach(async ({ page }) => {
        // create page object and navigate to site before each test
        const loginPage = new LoginPage(page);
        await loginPage.nagivateToSauceDemoSite();
        // attach to test.info for access in tests
        test.info().loginPage = loginPage;
    });

            test('TD-001 | Login: should login with valid credentials', async ({ page }) => {
                const loginPage = test.info().loginPage;
                await loginPage.login(sharedData.username, sharedData.password);
                // assertion moved into page object
                await loginPage.assertLoginSuccess();
            });

            test('TD-002 | Login: should show error with invalid password', async ({ page }) => {
                const loginPage = test.info().loginPage;
                await loginPage.login(sharedData.username, 'wrong_password');
                await loginPage.assertLoginErrorPresent();
                    // check for the expected failure message from test data
                    await loginPage.assertLoginErrorContains(sharedData.error_invalid_credentials);
            });

            test('TD-003 | Login: should show error with invalid username', async ({ page }) => {
                const loginPage = test.info().loginPage;
                await loginPage.login('invalid_user', sharedData.password);
                await loginPage.assertLoginErrorPresent();
                    await loginPage.assertLoginErrorContains(sharedData.error_invalid_credentials);
            });

            test('TD-004 | Login: should show required errors when fields are empty', async ({ page }) => {
                const loginPage = test.info().loginPage;
                await loginPage.clearCredentials();
                await loginPage.login('', '');
                    // expected username required message from test data
                    await loginPage.assertRequiredFieldError(sharedData.error_username_required);
            });

            test('TD-005 | Login: locked out user should not be able to login', async ({ page }) => {
                const loginPage = test.info().loginPage;
                await loginPage.login('locked_out_user', sharedData.password);
                    await loginPage.assertLockedOutError(sharedData.error_locked_out);
            });

});

