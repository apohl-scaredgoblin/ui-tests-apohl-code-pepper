import { test } from "@fixtures/basePage";
import { generateRandomCredentials } from "@fixtures/helpers/generateUserData";
import {ErrorMessages} from "../../test-data/messages";
import * as process from "process";


test.beforeEach(async ({ homePage, context }) => {
  await homePage.navigateToURL();
  await homePage.verifyHomePageHeader();
});

// TC 1 - Login with valid and invalid credentials
test.describe('@userLogin Verify logging in', () => {
  test('Verify if user can log in successfully with valid credentials | TC1-A', async ({
    homePage,
    inventoryPage,
  }) => {
    await test.step('Type credentials', async () => {
      await homePage.typeLoginCredentials(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
      await inventoryPage.verifySecondaryHeader();
    });
  });

  test('Verify if user cannot log in with random login | TC1-B', async ({
    homePage,
  }) => {
    await test.step('Type random credentials', async () => {
      const { username, password } = generateRandomCredentials();
      await homePage.typeLoginCredentials(username, password);
      await homePage.verifyValidationErrorMessagePresence(ErrorMessages.WRONG_CREDS_ERROR_MESSAGE);
    });
  });

  test('Verify if user cannot log in when login and password are not provided | TC1-C', async ({
    homePage,
  }) => {
    // FIXME
    await test.step('Click login button when inputs are empty ', async () => {
      await homePage.typeLoginCredentials("", "");
      await homePage.verifyValidationErrorMessagePresence(ErrorMessages.EMPTY_CREDS_ERROR_MESSAGE);
    });
  });
});
