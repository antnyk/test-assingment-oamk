import { test, expect } from '@playwright/test';

// run tests: npx playwright test

test.describe("positive tests", () => {
    test("Dog image retrieved succesfully", async ({ page }) => {
        const responsePromise = page.waitForResponse("http://localhost:5001/api/dogs/random")
        await page.goto('http://localhost:5173/')
        await responsePromise;
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//)
    })

    test("Dog image retrieved succesfully and button is clicked", async ({ page }) => {
        const responsePromise = page.waitForResponse("http://localhost:5001/api/dogs/random")
        await page.goto('http://localhost:5173/')
        await page.locator('button:text("GET ANOTHER DOG")').click()
        await responsePromise;
        await expect(page.locator('img')).toHaveAttribute("src", /^https:\/\//)
    })
})

test("negative test, API call fail", async ({ page }) => {
    await page.route("http://localhost:5001/api/dogs/random", async (route) => {
        await route.abort()
    })

    await page.goto('http://localhost:5173/')

    await expect(page.locator('.error')).toContainText(/Error/)



    //const errorResponse = page.locator('error')
    //console.log(errorResponse)
    //expect(errorResponse).toContainText("Failed to fetch dog image from API")


    //await page.route("http://localhost:5001/api/dogs/random", async (route) => {
    //    await route.fulfill({
    //        status: 500,
    //        contentType: "application/json",
    //        //body: JSON.stringify({error: "Server error"})
    //    })
    //})
//
//    const responsePromise = page.waitForResponse("http://localhost:5001/api/dogs/random")
//
//
    //const result = JSON.parse(await response.text())
    //await result.waitFor()
    //await expect(result).toHaveText("Failed to fetch dog image from API")
})
