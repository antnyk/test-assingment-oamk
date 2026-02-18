import { test, expect } from '@playwright/test';

test.describe("positive tests", () => {
    test("Dog image retrieved succesfully", async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//)
    })

    test("Dog image retrieved succesfully and button is clicked", async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await page.locator('button:text("GET ANOTHER DOG")').click()
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//)
    })
})

test("negative e2e test, API call fail", () => {

})