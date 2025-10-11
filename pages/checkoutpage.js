import { Page, locator, expect } from "@playwright/test";

class CheckoutPage {


    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.inventoryItem = page.locator('//div[@class="inventory_item_name"]');
        this.orderconfirmation = page.locator('.complete-header');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    async finishCheckout() {
        await this.finishButton.click();
    }

    async verifyCheckoutOverview(product) {
        const productName = await this.inventoryItem.innerText();
        expect(productName).toBe(product);
    }

    async verifyCheckoutComplete(orderConfirmationMessage) {
        const confirmationMessage = await this.orderconfirmation.innerText();
        expect(confirmationMessage).toBe(orderConfirmationMessage);
        await this.page.screenshot({ path: 'reports/checkout-complete.png' });
    }

}export default CheckoutPage;