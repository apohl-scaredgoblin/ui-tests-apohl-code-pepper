import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import {orderSummary} from '../../test-data/orderDetails';

export class CheckoutOverviewPage {
    readonly secondaryHeader: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly totalAmount: Locator;
    readonly finishButton: Locator;

    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.secondaryHeader = page.locator('span[data-test="title"]', {
            hasText: 'Checkout: Overview',
        });
        this.paymentInfo= page.locator('[data-test="payment-info-value"]');
        this.shippingInfo= page.locator('[data-test="shipping-info-value"]');
        this.subtotal= page.locator('[data-test="subtotal-label"]');
        this.tax= page.locator('[data-test="tax-label"]');
        this.totalAmount= page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('#finish');
    }

    async verifySecondaryHeader(): Promise<void> {
        await expect(this.secondaryHeader).toBeVisible();
    }

    async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderSummary(): Promise<void> {
        const expectedSummary = orderSummary

        await expect(this.paymentInfo).toHaveText(expectedSummary.paymentInfo);
        await expect(this.shippingInfo).toHaveText(expectedSummary.shippingInfo);
        await expect(this.subtotal).toHaveText(`Item total: ${expectedSummary.itemTotal}`);
        await expect(this.tax).toHaveText(`Tax: ${expectedSummary.tax}`);
        await expect(this.totalAmount).toHaveText(`Total: ${expectedSummary.total}`);
    }
}
