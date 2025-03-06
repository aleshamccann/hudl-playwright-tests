import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login-page';

test.describe('Username Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoPage();
        await loginPage.openHudlLogin();
    });

    test('Password Visibility', async ({ page }) => {
        
    });
});