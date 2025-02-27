# Hudl Playwright Tests

This particular repository utilizes Playwright and Typescript to test logging in to Hudl.com.

[![Playwright.dev](https://img.shields.io/badge/Documentation-Playwright-1c8620.svg?logo=playwright)](https://playwright.dev/docs/intro)
[![Playwright - GitHub](https://img.shields.io/badge/GitHub-Playwright-1c8620.svg?logo=github)](https://github.com/microsoft/playwright/tree/main)
[![Playwright - Stack Overflow](https://img.shields.io/badge/stackoverflow-Playwright-e87922.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/playwright)

## 🟢 Prerequisites

- Make sure you have [Node.js](https://nodejs.org/en). The LTS version should be fine. 
- You will also need the `npm` package manager (which comes with Node.js).
- A development environment or IDE with TypeScript support will help. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

## 📦 Execution

To run all tests, you can run the below command:

```shell
npx playwright test
```

To run specific tests:

```shell
npx playwright test -g "Valid Email and Password"
```
