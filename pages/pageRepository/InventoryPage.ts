import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class InventoryPage {
    readonly secondaryHeader: Locator;
    readonly sauceLabsBackpack: Locator;
    readonly sauceLabsBikeLite: Locator;
    readonly itemDetails: Locator;
    readonly backpackAddToCartButton: Locator;
    readonly backpackRemoveButton: Locator;
    readonly cartButton: Locator;
    readonly menuButton: Locator;
    readonly logout: Locator;
    readonly cartCounter: Locator;

    constructor(
        private readonly page: Page,
        private readonly context: BrowserContext
    ) {
        this.page = page;
        this.context = context;
        this.secondaryHeader = page.locator('span[data-test="title"]', {
            hasText: 'Products',
        });
        this.sauceLabsBackpack = page.locator('a[data-test="item-4-img-link"]');
        this.sauceLabsBikeLite = page.locator('a[data-test="item-0-title-link"]');
        this.itemDetails = page.locator('div[data-test="inventory-item-desc"]')
        this.backpackAddToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveButton = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.cartButton = page.locator('a[data-test="shopping-cart-link"]');
        this.menuButton = page.locator("#react-burger-menu-btn");
        this.logout = page.locator("#logout_sidebar_link");
        this.cartCounter = page.locator('[data-test="shopping-cart-badge"]');
    }

    async verifySecondaryHeader(): Promise<void> {
        await expect(this.secondaryHeader).toBeVisible();
    }

    async clickOnBackpack(): Promise<void> {
        await this.sauceLabsBackpack.click()
    }

    async verifyProductDetails(description: string):Promise<void> {
        await expect(this.itemDetails).toHaveText(description)
    }

    async addBackpackToCart(): Promise<void> {
        await this.backpackAddToCartButton.click();
    }

    async removeBackpackFromCart(): Promise<void> {
        await this.backpackRemoveButton.click();
    }

    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }

    async verifyNumberOfItemsInCart(number?: string): Promise<void> {
        if (number !== undefined) {
            await expect(this.cartCounter).toHaveText(number);
        } else {
            await expect(this.cartCounter).toHaveCount(0);
        }
    }
}
