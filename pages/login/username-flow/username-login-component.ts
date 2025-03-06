import { type Locator, type Page, expect } from "@playwright/test";

export class UsernameLoginComponent {
    readonly page: Page;
    readonly usernameElement: Locator;
    readonly continueButton: Locator;
    readonly passwordElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameElement = page.locator('#username');
        this.passwordElement = page.locator('#password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }

    async fillUsername(paramText: string) {
        await this.usernameElement.fill(paramText);
    }

    async passwordIsVisible() {
        await expect(this.passwordElement).toBeVisible();
    }

    async passwordIsNotVisible() {
        await expect(this.passwordElement).not.toBeVisible();
    }

    async fillPassword(paramText: string) {
        await this.passwordElement.fill(paramText);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async fillUsernameAndContinue(username: string) {
        await this.fillUsername(username);
        await this.clickContinue();
    }

    async enterUsernameAndPassword(username: string, password: string) {
        await this.passwordIsNotVisible();
        await this.fillUsernameAndContinue(username);
        await this.passwordIsVisible();
        await this.fillPassword(password);
        await this.clickContinue();
    }
}