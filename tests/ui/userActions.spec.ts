import { test } from "@fixtures//basePage";
import { ProductDescription } from "../../test-data/productDescription";
import process from "process";

test.beforeEach(async ({ homePage, inventoryPage, context }) => {
  await homePage.navigateToURL();
  await homePage.typeLoginCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await inventoryPage.verifySecondaryHeader();
});

/**
 * TC 2 - User is able to see the details of the product when clicking on the product
 * TC 3 - User is able to add/remove product from the cart when he is on Inventory page/Cart Page
 * TC 4 - User is able to return to the list of products when is in the cart
 */

test.describe('@userActions Verify user actions in the app', () => {
  test('Verify if user is able to see the details of the product, when clicking on the item | TC2', async ({
    inventoryPage,
  }) => {
    await test.step('Click on the Backpack', async () => {
      await inventoryPage.clickOnBackpack();
    });
    await test.step('Verify product description', async () => {
      await inventoryPage.verifyProductDetails(
        ProductDescription.SAUCE_LABS_BACKPACK,
      );
    });
  });

  test('Verify if user is able to add/remove product when he is on Inventory page | TC3-A', async ({
    inventoryPage, cartPage,
  }) => {
    await test.step('Add Backpack to the cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await test.step('Verify the number displayed on cart badge', async () => {
      await inventoryPage.verifyNumberOfItemsInCart('1');
    });

    await test.step('Remove Backpack from the cart', async () => {
      await inventoryPage.removeBackpackFromCart();
    });

    await test.step('Verify the number displayed on cart badge', async () => {
      await inventoryPage.verifyNumberOfItemsInCart();
    });
  });

  test('Verify if user is able to remove product when he is on Cart page | TC3-B', async ({
    inventoryPage,
    cartPage,
  }) => {
    await test.step('Add Backpack to the cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await test.step('Go to Cart', async () => {
      await inventoryPage.clickCartButton();
      await cartPage.verifyProductInCart();
    });

    await test.step('Remove Product', async () => {
      await cartPage.removeProduct();
    });

    await test.step('Reload the page and verify if product is still there', async () => {
      await cartPage.reloadCartPage();
      await cartPage.verifyProductNotInCart();
    });
  });

  test('Verify if user is able to return to the list of products when is in the cart | TC4', async ({
    inventoryPage,
    cartPage,
  }) => {
    await test.step('Go to cart', async () => {
      await inventoryPage.clickCartButton();
    });

    await test.step('Click continue shopping and verify if user has been redirected to Inventory page', async () => {
      await cartPage.clickContinueShopping();
      await inventoryPage.verifySecondaryHeader();
    });
  });
});
