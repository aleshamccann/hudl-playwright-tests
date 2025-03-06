import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login/login-page';
import { UsernameLoginComponent } from '../../../pages/login/username-flow/username-login-component';
import { ForgotPasswordComponent } from '../../../pages/login/username-flow/forgot-password-component';
import { loginTestData } from '../../../utils/login/login-test-data';

test.describe('Forgot Password Tests', () => {
    let loginPage: LoginPage;
    let usernameLogin: UsernameLoginComponent;
    let forgotPassword: ForgotPasswordComponent;
    const { validEmail } = loginTestData.getValidCredentials();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        usernameLogin = loginPage.usernameLogin;
        forgotPassword = loginPage.forgotPassword;
        await loginPage.gotoPage();
        await loginPage.openHudlLogin();
    });

    test('Forgot Password: Reset Password', async ({ page }) => {
        await usernameLogin.fillUsernameAndContinue(validEmail);
        await forgotPassword.clickForgotPasswordLink();
        await expect(loginPage.page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
        const forgotPasswordParagraph = loginPage.page.locator('p', { hasText: 'We\'ll send you a link to reset your password.'});
        await expect(forgotPasswordParagraph).toBeVisible();
        const emailElement = page.locator('input[name="email"]');
        await expect(emailElement).toBeVisible();
        await expect(await emailElement.inputValue()).toBe(validEmail);
        await forgotPassword.resetPassword();
        const loginUrl = 'https://identity.' + loginPage.baseURL + 'u/reset-password';
        await expect(loginPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        const heading = loginPage.page.locator('h1', { hasText: 'Check Your Email' });
        await expect(heading).toBeVisible();
        const paragraph = loginPage.page.locator('p', { hasText: 'If you have an account, you\'ll receive a reset password link. Didn\'t get the email? Resend it.'});
    
        await test.step('Resend Email', async () => {
            const resendEmail = loginPage.page.getByRole('button', { name: 'Resend Email' });
            await resendEmail.click();
            await expect(loginPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        })

        await test.step('Go Back', async () => {
            await emailElement.fill(validEmail);
            await forgotPassword.goBack();
            const loginUrl = 'https://identity.' + loginPage.baseURL + 'u/login/identifier';
            await expect(loginPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        })
    
    });
});