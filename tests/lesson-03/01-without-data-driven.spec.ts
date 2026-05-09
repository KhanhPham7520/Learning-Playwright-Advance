import { test, expect } from "@playwright/test";

test.describe("Simple test cases driven", async () => {

    const testData = [
        {
            id: 1,
            name: "User registration",
            url: "https://material.playwrightvn.com/01-xpath-register-page.html",
            expect: "User Registration"
        },
        {
            id: 2,
            name: "Product page",
            url: "https://material.playwrightvn.com/02-xpath-product-page.html",
            headingLevel: 1,
            expect: "Simple E-commerce"
        },
        {
            id: 3,
            name: "Todo page",
            url: "https://material.playwrightvn.com/03-xpath-todo-list.html",
            expect: "To-Do List"
        }
    ];

    testData.forEach(item => {
        test(`Test ${item.id}: Test page ${item.name}`, async ({ page }) => {
            await page.goto(item.url);

            let headingLoc = page.getByRole("heading");

            if (item.headingLevel) {
                headingLoc = page.getByRole("heading", { level: item.headingLevel });
            }
            await expect(headingLoc).toHaveText(item.expect);
        });
    });
})