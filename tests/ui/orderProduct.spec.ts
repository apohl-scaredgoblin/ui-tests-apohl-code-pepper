import { test } from "@fixtures//basePage";
import { generateCheckoutData } from "@fixtures/helpers/generateUserData";
import process from "process";


test.beforeEach(async ({ homePage, inventoryPage, context }) => {
  await homePage.navigateToURL();
  await homePage.typeLoginCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  await inventoryPage.verifySecondaryHeader();
});

// TC 5 - User is able to order the product when providing necessary data

test.describe('@order Verify product order', () => {
  test('Verify if user is able to order the product when providing necessary data | TC5', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkOutCompletePage,
  }) => {
    await test.step('Add BackPack to the cart and check cart contents', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.clickCartButton();
      await cartPage.verifySecondaryHeader();
      await cartPage.verifyProductInCart();
    });

    await test.step('Go to checkout info and fill in the form', async () => {
      const user = generateCheckoutData("CA");
      await cartPage.clickCheckoutButton();
      await checkoutInfoPage.verifySecondaryHeader();
      await checkoutInfoPage.fillInCheckOutForm(
        user.firstName,
        user.lastName,
        user.zipCode,
      );
      await checkoutOverviewPage.verifySecondaryHeader();
    });

    await test.step('Finish order and verify the info of successful order', async () => {
      await checkoutOverviewPage.verifyOrderSummary();
      await checkoutOverviewPage.clickFinishButton();
      await checkOutCompletePage.verifySecondaryHeader();
      await checkOutCompletePage.verifyMessagesAfterSuccessfulOrder();
    });
  });
});
