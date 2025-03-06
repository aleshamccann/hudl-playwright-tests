import { type Locator, type Page } from "@playwright/test";

export class ForgotPasswordComponent {
    readonly page: Page;
    readonly forgotPasswordLink: Locator;
    readonly continueButton: Locator;
    readonly goBackButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.goBackButton = page.getByRole('button', { name: 'Go Back' });
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async resetPassword() {
        await this.continueButton.click();
    }

    async goBack() {
        await this.goBackButton.click();
    }
}