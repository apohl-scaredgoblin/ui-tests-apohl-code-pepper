# UI Tests Apohl Code Pepper

This project contains UI tests for `Swag Labs` application.

The tests are written in TypeScript and Playwright for browser automation 

## Prerequisite

- Make sure you Node installed

## Setup

First, clone the project from the repository:

## Install

- `npm install` - install dependencies

## Important

By default application will run on `https://www.saucedemo.com/`

## Environment Variables
 
In order to run the tests, you need to set some required environment variables. You need to define these variables in 
a `.env` file. Sample.env in the project, the data in the sample are those which are used in the tests. As these data 
are public, They are provided in the sample file. But .env has been added to .gitignore as the credentials should not be 
pushed to the repository

```
BASE_URL:https://www.saucedemo.com/
USERNAME=standard_user
PASSWORD='secret_sauce'
```

## Run all tests in Playwright 

- `npx playwright test`
- `npx playwright test --workers=1 --project=UITests`

## Run chosen tests in Playwright

- `npx playwright test --grep @userLogin --workers=1 --project=UITests`
- `npx playwright test --grep @order --workers=1 --project=UITests`
- `npx playwright test --grep @userActions --workers=1 --project=UITests`

## Reports

To check report run command:
- `npx playwright show-report html-report`

## Test cases

- TC 1 - Login with valid and invalid credentials
- TC 2 - User is able to see the details of the product when clicking on the product
- TC 3 - User is able to add/remove product from the cart when he is on Inventory page/Cart Page
- TC 4 - User is able to return to the list of products when is in the cart
- TC 5 - User is able to order the product when providing necessary data

## Tests results

![Screenshot 2025-07-31 at 22.28.02.png](..%2F..%2FDesktop%2FScreenshot%202025-07-31%20at%2022.28.02.png)

