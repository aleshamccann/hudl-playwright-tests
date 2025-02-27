# Playwright and Test Concepts Demonstrated

This document outlines the Playwright and test concepts demonstrated in the provided Page Object Model (POM) and test specification.

## Playwright Concepts

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

## Test Concepts

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
