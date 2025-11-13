import { expect } from '@playwright/test';
import { BasePage } from "./base.page.js";

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.inventoryItem = page.locator('.inventory_item_name');
    this.orderConfirmation = page.locator('.complete-header');
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
    await this.click(this.continueButton);
  }

  async verifyCheckoutOverview(product) {
    const productName = await this.inventoryItem.innerText();
    if (product) expect(productName).toBe(product);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async verifyCheckoutComplete(orderConfirmationMessage) {
    const confirmationMessage = await this.orderConfirmation.innerText();
    if (orderConfirmationMessage) expect(confirmationMessage).toBe(orderConfirmationMessage);
    await this.page.screenshot({ path: 'reports/checkout-complete.png' });
  }
}
