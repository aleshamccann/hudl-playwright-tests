# Hudl Playwright Tests

This particular repository utilizes Playwright and Typescript to test logging in to Hudl.com.

[![Playwright.dev](https://img.shields.io/badge/Documentation-Playwright-1c8620.svg?logo=playwright)](https://playwright.dev/docs/intro)
[![Playwright - GitHub](https://img.shields.io/badge/GitHub-Playwright-1c8620.svg?logo=github)](https://github.com/microsoft/playwright/tree/main)
[![Playwright - Stack Overflow](https://img.shields.io/badge/stackoverflow-Playwright-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/playwright)

## Playwright and Test Concepts Demonstrated

This document outlines the Playwright and test concepts demonstrated in the provided Page Object Model (POM) and test specification.

### Playwright Concepts

* **Page Object Model (POM):**
    * Encapsulation of page-specific locators and actions into a reusable class.
    * Improves test maintainability and readability.
* **Locators:**
    * `page.locator()`: General-purpose locator for CSS selectors and text.
    * `page.getByTestId()`: Locating elements by their `data-qa-id` attribute.
    * `page.getByRole()`: Locating elements by their ARIA role, name, and other accessible attributes.
    * Attribute selectors (`input[name="email"]`).
* **Actions:**
    * `page.goto()`: Navigating to URLs.
    * `locator.click()`: Clicking elements.
    * `locator.fill()`: Filling input fields.
    * `locator.inputValue()`: Getting input values.
    * `locator.getAttribute()`: Getting element attributes.
    * `page.evaluate()`: Executing JavaScript in the browser context.
    * `page.waitForURL()`: Waiting for URL navigation.
* **Assertions:**
    * `expect(locator).toBeVisible()`: Checking element visibility.
    * `expect(locator).not.toBeVisible()`: Checking element invisibility.
    * `expect(locator).toHaveText()`: Checking element text content.
    * `expect(page).toHaveURL()`: Checking page URL.
    * `expect(page.url()).toMatch()`: Checking if the URL matches a regex.
    * `expect(await locator.getAttribute()).toBe()`: checking attribute values.
    * `expect(locator).toHaveValue()`: checking the value of input elements.
* **Test Hooks:**
    * `test.describe()`: Grouping related tests into suites.
    * `test.beforeEach()`: Running setup code before each test.
    * `test.step()`: Creating sub-steps within a test.
* **Environment Variables:**
    * Accessing environment variables using `process.env`.

### Test Concepts

* **Test Organization:**
    * Structuring tests into suites and individual test cases.
* **Test Scenarios:**
    * Testing various login scenarios (valid, invalid, password visibility, forgot password).
* **Test Data:**
    * Using environment variables for test data.
* **Assertion-Based Testing:**
    * Verifying expected outcomes using assertions.
* **Test Isolation:**
    * Using `beforeEach` to ensure each test starts with a clean state.
* **Test Readability:**
    * Using descriptive test names and comments.
* **Robustness:**
    * Using appropriate locators and assertions to make tests less fragile.
* **Asynchronous testing:**
    * Proper use of async and await.
* **Regex usage:**
    * Using regex to validate url patterns.

## Prerequisites

- Make sure you have [Node.js](https://nodejs.org/en). The LTS version should be fine. 
- You will also need the `npm` package manager (which comes with Node.js).
- A development environment or IDE with TypeScript support will help. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

## Execution

Clone the repository and then set everything up:

```shell
npm ci
```
The reason for `npm ci` is covered best in this [Stack Overflow answer](https://stackoverflow.com/a/53325242).

Make sure to install the browsers that Playwright will need.

```shell
npx playwright install
```

Create your `credentials.env` file using the `credentials.example.env` file provided. Add your valid username and password for logging into Hudl.

```
HUDL_USERNAME='your username'
HUDL_PASSWORD='your password'
```

As with any such project you should look at the `package.json` and see what scripts are provided.

To run the specs, you can do this:

```shell
npm test
```

You can also do the above command without using the provided scripts. For example, to run all tests:

```shell
npx playwright test
```

To run tests based on names:

```shell
npx playwright test -g "Valid Email and Password"
```
