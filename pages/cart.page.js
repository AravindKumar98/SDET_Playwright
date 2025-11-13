
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.productName = page.locator('.inventory_item_name');
  }

  getProductLocator(productName) {
    return this.page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]`);
  }

  getAddToCartButton(productName) {
    return this.page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Add to cart')]`);
  }

  async addProductToCart(productName) {
    await this.click(this.getAddToCartButton(productName));
  }

  async openCart() {
    await this.click(this.cartIcon);
  }

  async verifyProductInCart(productName) {
    await this.openCart();
    await this.page.locator(`.cart_item:has-text("${productName}")`).waitFor();
  }

  async getCartProducts() {
    return await this.cartItems.allTextContents();
  }

  async removeProductFromCart(productName) {
    await this.openCart();
    const removeBtn = this.page.locator(`//div[contains(@class,'cart_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Remove')]`);
    await this.click(removeBtn);
  }
}
