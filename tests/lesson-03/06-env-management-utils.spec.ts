import test, { expect } from "@playwright/test";
import { getConfig } from "utils/config";

test.describe("Simple test cases driven", async () => {
    test("Test 1: Test page User registration", async ({ page }) => {
        const testDataJSON = getConfig('02-test-data', 'case_1');
        const username = testDataJSON.user;

        await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
        await page.getByLabel("Username").fill(username)
    });

    test("Test 2: Test page User registration", async ({ page }) => {
        const testDataJSON = getConfig('02-test-data', 'case_2');
        const username = testDataJSON.user;

        await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
        await page.getByLabel("Username").fill(username)
    });
});