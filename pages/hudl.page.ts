import { type Locator, type Page, expect } from "@playwright/test";

export class HudlPage {
    readonly baseURL : string;
    readonly page: Page;
    readonly loginAction: Locator;
    readonly subNav: Locator;
    readonly passwordElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginAction = page.getByTestId('login-select');
        this.subNav = page.locator('.mainnav__sub');
        this.passwordElement = page.locator('#password');
        this.baseURL = 'hudl.com/';
    }

    async gotoPage() {
        await this.page.goto('http://' + this.baseURL);
    }

    async subNavIsNotVisible() {
        await expect(this.subNav).not.toBeVisible();
    }

    async subNavIsVisible() {
        await expect(this.subNav).toBeVisible();
    }

    async clickLoginAction() {
        await this.loginAction.click();
    }

    async clickHudlSubAction() {
        const HudlSubAction = this.page.getByTestId('login-hudl');
        await HudlSubAction.click();
    }

    async fillUsername(paramText: string) {
        const usernameElement = this.page.locator('#username');
        await usernameElement.fill(paramText);
    }

    async passwordIsNotVisible() {
        await expect(this.passwordElement).not.toBeVisible();
    }

    async passwordIsVisible() {
        await expect(this.passwordElement).toBeVisible();
    }

    async fillPassword(paramText: string) {
        const passwordElement = this.page.locator('#password');
        await passwordElement.fill(paramText);
    }

    async clickContinue() {
        await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
    }

    async clickForgotPassword() {
        await this.page.getByRole('link', { name: 'Forgot password?' }).click();
    }

    async openHudlLogin() {
        await this.clickLoginAction();
        await this.subNavIsVisible();
        await this.clickHudlSubAction();
        await this.passwordIsNotVisible();
    }

    async fillUsernameAndContinue(username: string) {
        await this.fillUsername(username);
        await this.clickContinue();
    }
    
    async enterCredentialsAndLogin(username: string, password: string) {
        await this.fillUsernameAndContinue(username);
        await this.passwordIsVisible();
        await this.fillPassword(password);
        await this.clickContinue();
    }
    
    async loginToHudl(username: string, password: string) {
        await this.openHudlLogin();
        await this.enterCredentialsAndLogin(username, password);
    }

    async forgotPassword(action: string) {
        switch (action) {
            case 'reset':
                await this.page.getByRole('button', { name: 'Continue' }).click();
                break;
            case 'back':
                await this.page.getByRole('button', { name: 'Go Back' }).click();
                break;
            default:
                break;
        }
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