import { expect, Locator, Page, BrowserContext } from "@playwright/test";

export class CheckoutInfoPage {
    readonly secondaryHeader: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;

    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.secondaryHeader = page.locator('span[data-test="title"]', {
            hasText: 'Checkout: Your Information',
        });
        this.firstNameInput= page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    }

    async verifySecondaryHeader(): Promise<void> {
        await expect(this.secondaryHeader).toBeVisible();
    }

    async fillInCheckOutForm(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.clickContinueButton();
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }
}
