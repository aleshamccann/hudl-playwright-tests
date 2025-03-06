import { type Locator, type Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly baseURL: string = 'hudl.com/';

    constructor(page: Page) {
        this.page = page;
    }

    async gotoPage() {
        await this.page.goto('http://' + this.baseURL);
    }

    async getBorderColorOfElementByID(elementId) {
        const borderColor = await this.page.evaluate((id) => {
        const element = document.getElementById(id);
        if (!element) {
            return null; // Element not found
        }
        const style = window.getComputedStyle(element);
        return style.borderColor;
        }, elementId);
    
        return borderColor;
    }
}