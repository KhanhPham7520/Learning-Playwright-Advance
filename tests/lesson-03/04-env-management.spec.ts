import test, { expect } from "@playwright/test";
// import testDataJSON from `@data/01-test-data-${process.env.ENV}.json`




test.describe("Simple test cases driven", async () => {
    test("Test 1: Test page User registration", async ({ page }) => {
        const username = testDataJSON.user;

        await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
        await page.getByLabel("Username").fill(username)
    });
});