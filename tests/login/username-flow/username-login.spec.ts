import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login/login-page';
import { UsernameLoginComponent } from '../../../pages/login/username-flow/username-login-component';
import { loginTestData } from '../../../utils/login/login-test-data';

test.describe('Username Login Tests', () => {
    let loginPage: LoginPage;
    let usernameLogin: UsernameLoginComponent;
    const errorColor: string = 'rgb(232, 28, 0)';
    const { validEmail, validPassword } = loginTestData.getValidCredentials();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        usernameLogin = loginPage.usernameLogin;
        await loginPage.gotoPage();
        await loginPage.openHudlLogin();
    });

    test('Valid Email and Password', async ({ page }) => {
        await loginPage.usernameLoginToHudl(validEmail, validPassword);
        await loginPage.page.waitForURL('https://www.' + loginPage.baseURL + 'home');
        await expect(loginPage.page.url()).toBe('https://www.' + loginPage.baseURL + 'home'); // expect a different element once logged in
    });

    test('Invalid Email', async ({ page }) => {
        await usernameLogin.fillUsernameAndContinue(loginTestData.invalidEmail);
        const error = loginPage.page.locator('#error-element-username');
        await expect(error).toBeVisible();
        await expect(error).toHaveText(loginTestData.errorMessageInvalidEmail);
        await expect(await loginPage.getBorderColorOfElementByID('error-element-username')).toBe(errorColor);
    });

    test('Incorrect Username', async ({ page }) => {
        await loginPage.usernameLoginToHudl(loginTestData.incorrectEmail, validPassword);
        const error = loginPage.page.locator('#error-element-password');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Incorrect username or password.');
        await expect(await loginPage.getBorderColorOfElementByID('error-element-password')).toBe(errorColor);
    });

    test('Edit Username', async ({ page }) => {
        await loginPage.usernameLoginToHudl(loginTestData.incorrectEmail, validPassword);
        await loginPage.page.getByRole('link', { name: 'Edit email address' }).click();
        const loginUrl = 'https://identity.' + loginPage.baseURL + 'u/login';
        await expect(loginPage.page.url()).toMatch(new RegExp(`^${loginUrl}`))
    });

    test('Incorrect Password', async ({ page }) => {
        await loginPage.usernameLoginToHudl(validEmail, loginTestData.incorrectPassword);
        const error = loginPage.page.locator('#error-element-password');
        await expect(error).toBeVisible();
        await expect(error).toHaveText(loginTestData.errorMessageIncorrectPassword); // Why do the error messages differ?
        await expect(await loginPage.getBorderColorOfElementByID('error-element-password')).toBe(errorColor); 
    });

    test('Password Visibility', async ({ page }) => {
        await usernameLogin.fillUsernameAndContinue(validEmail);
        await usernameLogin.fillPassword(validPassword);
        await expect(await usernameLogin.passwordElement.getAttribute('type')).toBe('password');
        
        test.step('Show Password', async () => {
            const showPassword = loginPage.page.getByRole('button', { name: 'Show password' });
            await showPassword.click();
            await expect(await usernameLogin.passwordElement.getAttribute('type')).toBe('text');
            await expect(await usernameLogin.passwordElement.inputValue()).toBe(validPassword);
        });

        test.step('Hide Password', async () => {
            const hidePassword = loginPage.page.getByRole('button', { name: 'Hide password' });
            await hidePassword.click();
            await expect(await usernameLogin.passwordElement.getAttribute('type')).toBe('password');
            await expect(await usernameLogin.passwordElement.inputValue()).toBe(validPassword);
        });
    });
});