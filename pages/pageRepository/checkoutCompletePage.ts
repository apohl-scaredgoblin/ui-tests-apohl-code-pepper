import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import {SuccessfulMessages} from '../../test-data/messages';

export class CheckoutCompletePage {
    readonly secondaryHeader: Locator;
    readonly thankYouHeader: Locator;
    readonly successfulOrderText: Locator;

    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.secondaryHeader = page.locator('span[data-test="title"]', {
            hasText: 'Checkout: Complete!'}),
        this.thankYouHeader = page.locator('[data-test="complete-header"]'),
        this.successfulOrderText = page.locator('[data-test="complete-text"]')
    };

    async verifySecondaryHeader(): Promise<void> {
        await expect(this.secondaryHeader).toBeVisible();
    }

    async verifyMessagesAfterSuccessfulOrder(): Promise<void> {
        await expect(this.thankYouHeader).toHaveText(SuccessfulMessages.THANK_YOU_ORDER);
        await expect(this.successfulOrderText).toHaveText(SuccessfulMessages.COMPlETE_ORDER);
    }
}
