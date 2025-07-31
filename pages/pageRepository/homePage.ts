import { expect, Locator, Page, BrowserContext } from "@playwright/test";
import * as process from "process";
import dotenv from "dotenv";
dotenv.config();

export class HomePage {
    readonly homePageHeader: Locator;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorText: Locator;


    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.homePageHeader = page.locator('div[class="login_logo"]', {
            hasText: "Swag Labs",
        });
        this.loginInput= page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.errorText = page.locator('[data-test="error"]')
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto(process.env.BASE_URL,{waitUntil: 'load'})
    }

    async verifyHomePageHeader(): Promise<void> {
        await expect(this.homePageHeader).toBeVisible();
    }

    async typeLoginCredentials(login: string, password: string): Promise<void> {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.clickLoginButton();
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async verifyValidationErrorMessagePresence(errorMessage: string): Promise<void> {
        await expect(this.loginInput).toHaveClass('input_error form_input error');
        await expect(this.passwordInput).toHaveClass('input_error form_input error');
        await expect(this.errorText).toHaveText(errorMessage);
    }
}
