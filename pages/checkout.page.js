import { BasePage } from './base.page.js';
import { expect } from 'playwright/test';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutButton = 'button:has-text("Checkout")';
    this.firstNameInput = 'input[placeholder="First Name"]';
    this.lastNameInput = 'input[placeholder="Last Name"]';
    this.postalCodeInput = 'input[placeholder="Zip/Postal Code"]';
    this.continueButton = 'input[type="submit"], button:has-text("Continue")';
    this.finishButton = 'button:has-text("Finish")';
    this.cancelButton = 'button:has-text("Cancel")';
    this.inventoryItem = '.inventory_item_name';
    this.orderConfirmation = '.complete-header';
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
    const productName = await this.getText(this.inventoryItem);
    if (product) expect(productName).toBe(product);
  }

  async finishCheckout() {
    await this.click(this.finishButton);
  }

  async verifyCheckoutComplete(orderConfirmationMessage) {
    const confirmationMessage = await this.getText(this.orderConfirmation);
    if (orderConfirmationMessage) expect(confirmationMessage).toBe(orderConfirmationMessage);
  }
}
