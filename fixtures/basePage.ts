import { test as baseTest } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { InventoryPage } from '@pages/InventoryPage';
import { CartPage } from '@pages/cartPage';
import { CheckoutInfoPage } from '@pages/checkoutInfoPage';
import { CheckoutOverviewPage } from '@pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '@pages/checkoutCompletePage';

const test = baseTest.extend<{
    // Page objects
    homePage: HomePage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkOutCompletePage: CheckoutCompletePage;

    // Test-scoped fixtures
    testFixture: string;
    autoTestFixture: string;
    unusedFixture: string;
}, {
    // Worker-scoped fixtures
    workerFixture: string;
    autoWorkerFixture: string;
}>({
    // ✅ Page objects
    homePage: async ({ page, context }, use) => {
        await use(new HomePage(page, context));
    },
    inventoryPage: async ({ page, context }, use) => {
        await use(new InventoryPage(page, context));
    },
    cartPage: async ({ page, context }, use) => {
        await use(new CartPage(page, context));
    },
    checkoutInfoPage: async ({ page, context }, use) => {
        await use(new CheckoutInfoPage(page, context));
    },
    checkoutOverviewPage: async ({ page, context }, use) => {
        await use(new CheckoutOverviewPage(page, context));
    },
    checkOutCompletePage: async ({ page, context }, use) => {
        await use(new CheckoutCompletePage(page, context)); // ✅ Fixed: use CheckoutCompletePage, not CheckoutOverviewPage
    },

    // ✅ Worker-scoped fixtures
    workerFixture: [async ({ browser }, use) => {
        // Setup
        await use('workerFixture');
        // Teardown
    }, { scope: 'worker' }],

    autoWorkerFixture: [async ({ browser }, use) => {
        await use('autoWorkerFixture');
    }, { scope: 'worker', auto: true }],

    // ✅ Test-scoped fixtures
    testFixture: [async ({ page, workerFixture }, use) => {
        await use('testFixture');
    }, { scope: 'test' }],

    autoTestFixture: [async ({}, use) => {
        await use('autoTestFixture');
    }, { scope: 'test', auto: true }],

    unusedFixture: [async ({ page }, use) => {
        await use('unusedFixture');
    }, { scope: 'test' }],
});

// ✅ Optional test hooks
test.beforeAll(async () => {
    // Global setup
});

test.beforeEach(async ({ page }) => {
    // Runs before each test
});


test.afterEach(async () => {
    // Runs after each test
});

test.afterAll(async () => {
    // Global teardown
});

export { test };
