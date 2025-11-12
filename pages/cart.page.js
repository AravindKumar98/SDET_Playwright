import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = '.shopping_cart_link';
    this.cartItems = '.cart_item';
    this.productName = '.inventory_item_name';
  }

  getProductLocator(productName) {
    return `//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]`;
  }

  getAddToCartButton(productName) {
    return `//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Add to cart')]`;
  }

  async addProductToCart(productName) {
    await this.click(this.getAddToCartButton(productName));
  }

  async verifyProductInCart(productName) {
    await this.click(this.cartIcon);
    await this.page.waitForSelector(`.cart_item:has-text("${productName}")`);
  }

  async getCartProducts() {
    return await this.page.$$eval(this.cartItems, items => items.map(i => i.textContent));
  }

  async removeProductFromCart(productName) {
    await this.click(this.cartIcon);
    const removeBtn = `//div[contains(@class,'cart_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Remove')]`;
    await this.click(removeBtn);
  }
}
