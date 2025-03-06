import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from '../base-page';
import { UsernameLoginComponent } from './username-flow/username-login-component';
import { ForgotPasswordComponent } from './username-flow/forgot-password-component';

export class LoginPage extends BasePage {
    readonly loginAction;
    readonly subNav;
    readonly usernameLogin: UsernameLoginComponent;
    readonly forgotPassword: ForgotPasswordComponent;
    readonly hudlSubAction;

    constructor(page: Page) {
        super(page);
        this.loginAction = page.getByTestId('login-select');
        this.subNav = page.locator('.mainnav__sub');
        this.usernameLogin = new UsernameLoginComponent(page);
        this.forgotPassword = new ForgotPasswordComponent(page);
        this.hudlSubAction = page.getByTestId('login-hudl');
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

    async openHudlLogin() {
        await this.clickLoginAction();
        await expect(this.subNav).toBeVisible();
        await this.clickHudlSubAction();
    }

    async usernameLoginToHudl(username: string, password: string) {
        await this.usernameLogin.enterUsernameAndPassword(username, password);
    }
}