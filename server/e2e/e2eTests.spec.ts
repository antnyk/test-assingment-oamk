import { test, expect } from '@playwright/test';

// run tests: npx playwright test

test.describe("positive tests", () => {
    test("Dog image retrieved succesfully", async ({ page }) => {
        const responsePromise = page.waitForResponse("http://localhost:5001/api/dogs/random")
        await page.goto('http://localhost:5173/')
        await responsePromise;
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//) // Has source value and Source value starts with https://
    })

    test("Dog image retrieved succesfully and button is clicked", async ({ page }) => {
        const responsePromise = page.waitForResponse("http://localhost:5001/api/dogs/random")
        await page.goto('http://localhost:5173/')
        await page.locator('button:text("GET ANOTHER DOG")').click()
        await responsePromise;
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//) // Has source value and Source value starts with https://
    })
})

test("negative test, API call fail", async ({ page }) => {
    await page.route("http://localhost:5001/api/dogs/random", async (route) => {
        await route.abort()
    })

    await page.goto('http://localhost:5173/')

    await expect(page.locator('.error')).toContainText(/Error/) // Page has an element containing word error (use regular expression)
    await expect(page.locator('.error')).toBeVisible() // - Element with error text is visible
})
