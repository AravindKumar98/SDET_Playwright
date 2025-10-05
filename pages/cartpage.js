import { expect } from '@playwright/test';

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
    }

    getProductLocator(productName) {
        return this.page.locator(`.inventory_item:has-text("${productName}")`);
    }

    getAddToCartButton(productName) {
        return this.getProductLocator(productName).locator('button:has-text("Add to cart")');
    }

    async addProductToCart(productName) {
        const addBtn = this.getAddToCartButton(productName);
        await expect(addBtn).toBeVisible();
        await addBtn.click();
    }

    async verifyProductInCart(productName) {
        await this.cartIcon.click();
        const cartProduct = this.page.locator('.cart_item:has-text("' + productName + '")');
        await expect(cartProduct).toBeVisible();
        await this.page.screenshot({ path: 'reports/cart-product.png' });
    }

    async getCartProducts() {
        return await this.cartItems.allTextContents();
    }

    async removeProductFromCart(productName) {
        await this.cartIcon.click();
        const removeBtn = this.page.locator('.cart_item:has-text("' + productName + '") button:has-text("Remove")');
        await expect(removeBtn).toBeVisible();
        await removeBtn.click();
    }
}

module.exports = CartPage;