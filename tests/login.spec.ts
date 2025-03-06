import { test, expect } from '@playwright/test';
import { HudlPage } from './pages/hudl.page';
//import { global } from './env/env';

test.describe('User Login Flow', () => {
    // Get environment variables
    //getEnv();

    let username: string = process.env.HUDL_USERNAME || '';
    let password: string = process.env.HUDL_PASSWORD || '';
    let errorColor: string = 'rgb(232, 28, 0)';
    let hudlPage: HudlPage;

    test.beforeEach(async ({ page }) => {
        // Open Hudl login page
        hudlPage = new HudlPage(page);
        await hudlPage.gotoPage();
        //await hudlPage.subNavIsNotVisible(); // locator('.subnav') resolved to 4 elements:
        await hudlPage.openHudlLogin();
    });


    test('Valid Email and Password', async ({ page }) => {
        await hudlPage.enterCredentialsAndLogin(username, password);
        await hudlPage.page.waitForURL('https://www.' + hudlPage.baseURL + 'home');
        await expect(hudlPage.page.url()).toBe('https://www.' + hudlPage.baseURL + 'home'); // expect a different element once logged in
    });

    test('Invalid Email', async ({ page }) => {
        await hudlPage.fillUsernameAndContinue('invalidEmail');
        const error = hudlPage.page.locator('#error-element-username');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Enter a valid email.');
        await expect(await hudlPage.getBorderColorOfElementByID('error-element-username')).toBe(errorColor);
    });

    test('Incorrect Username', async ({ page }) => {
        await hudlPage.enterCredentialsAndLogin('alesha.mccann@gmail.com', password);
        const error = hudlPage.page.locator('#error-element-password');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Incorrect username or password.');
        await expect(await hudlPage.getBorderColorOfElementByID('error-element-password')).toBe(errorColor);
    });

    test('Edit Username', async ({ page }) => {
        await hudlPage.enterCredentialsAndLogin('alesha.mccann@gmail.com', password);
        await hudlPage.page.getByRole('link', { name: 'Edit email address' }).click();
        const loginUrl = 'https://identity.' + hudlPage.baseURL + 'u/login';
        await expect(hudlPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
    });

    test('Invalid Password', async ({ page }) => {
        await hudlPage.enterCredentialsAndLogin(username, 'invalidPassword');
        const error = hudlPage.page.locator('#error-element-password');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Your email or password is incorrect. Try again.'); // Why do the error messages differ?
        await expect(await hudlPage.getBorderColorOfElementByID('error-element-password')).toBe(errorColor); 
    });

    test('Password Visibility', async ({ page }) => {
        await hudlPage.fillUsernameAndContinue(username);
        await hudlPage.fillPassword(password);
        await expect(await hudlPage.passwordElement.getAttribute('type')).toBe('password');
        const showPassword = hudlPage.page.getByRole('button', { name: 'Show password' });
        await showPassword.click();
        await expect(await hudlPage.passwordElement.getAttribute('type')).toBe('text');
        await expect(await hudlPage.passwordElement.inputValue()).toBe(password);
        const hidePassword = hudlPage.page.getByRole('button', { name: 'Hide password' });
        await hidePassword.click();
        await expect(await hudlPage.passwordElement.getAttribute('type')).toBe('password');
        await expect(await hudlPage.passwordElement.inputValue()).toBe(password);
    });

    test('Forgot Password: Reset Password', async ({ page }) => {
        await hudlPage.fillUsernameAndContinue(username);
        await hudlPage.page.getByRole('link', { name: 'Forgot Password' }).click();
        await expect(hudlPage.page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
        const forgotPasswordParagraph = hudlPage.page.locator('p', { hasText: 'We\'ll send you a link to reset your password.'});
        await expect(forgotPasswordParagraph).toBeVisible();
        const emailElement = page.locator('input[name="email"]');
        await expect(emailElement).toBeVisible();
        await expect(await emailElement.inputValue()).toBe(username);
        await hudlPage.forgotPassword('reset');
        const loginUrl = 'https://identity.' + hudlPage.baseURL + 'u/reset-password';
        await expect(hudlPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        const heading = hudlPage.page.locator('h1', { hasText: 'Check Your Email' });
        await expect(heading).toBeVisible();
        const paragraph = hudlPage.page.locator('p', { hasText: 'If you have an account, you\'ll receive a reset password link. Didn\'t get the email? Resend it.'});

        await test.step('Resend Email', async () => {
            const resendEmail = hudlPage.page.getByRole('button', { name: 'Resend Email' });
            await resendEmail.click();
            await expect(hudlPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        })

        await test.step('Go Back', async () => {
            await emailElement.fill(username);
            await hudlPage.forgotPassword('back');
            const loginUrl = 'https://identity.' + hudlPage.baseURL + 'u/login/identifier';
            await expect(hudlPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
        })
    });
});