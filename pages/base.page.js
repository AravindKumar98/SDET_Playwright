export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async click(element) {
    await this.page.click(element);
  }

  async fill(element, value) {
    await this.page.fill(element, value);
  }

  async getText(element) {
    return await this.page.textContent(element);
  }

  async isVisible(element) {
    return await this.page.isVisible(element);
  }
}
