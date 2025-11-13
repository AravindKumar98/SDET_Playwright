export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async click(element) {
    // element can be a locator or selector string
    if (typeof element === 'string') {
      await this.page.click(element);
    } else {
      await element.click();
    }
  }

  async fill(element, value) {
    // element can be a locator or selector string
    if (typeof element === 'string') {
      await this.page.fill(element, value);
    } else {
      await element.fill(value);
    }
  }

  async getText(element) {
    return await this.page.textContent(element);
  }

  async isVisible(element) {
    return await this.page.isVisible(element);
  }
}
