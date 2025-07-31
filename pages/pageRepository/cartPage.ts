import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class CartPage {
    readonly secondaryHeader: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkOutButton: Locator;
    readonly cartItem: Locator;
    readonly removeBackPackButton: Locator;
    readonly itemsList: Locator;

    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.secondaryHeader = page.locator('span[data-test="title"]', {
            hasText: 'Your Cart',
        });
        this.continueShoppingButton= page.locator('#continue-shopping');
        this.checkOutButton = page.locator('#checkout');
        this.cartItem = page.locator('div[data-test="inventory-item"]', {hasText: 'Sauce Labs Backpack'});
        this.removeBackPackButton = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.itemsList = page.locator('div[data-test="cart-list"]');
    }

    async verifySecondaryHeader(): Promise<void> {
        await expect(this.secondaryHeader).toBeVisible();
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async clickCheckoutButton(): Promise<void> {
        await this.checkOutButton.click();
    }

    async removeProduct(): Promise<void> {
        await this.removeBackPackButton.click();
    }

    async verifyProductInCart(): Promise<void> {
        await expect(this.cartItem).toHaveCount(1);
    }

    async verifyProductNotInCart(): Promise<void> {
        await expect(this.cartItem).toHaveCount(0)
    }

    async reloadCartPage(): Promise<void> {
        await this.page.reload();
    }
}
