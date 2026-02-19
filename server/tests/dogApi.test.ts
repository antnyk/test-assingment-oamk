import { describe, expect, test } from "vitest"
import request from "supertest"
import { app } from "../index"

describe("dogApi", () => {
    test("GET /api/dogs/random returns succesfully", async () => {
        const response = await request(app)
            .get("/api/dogs/random")

        //console.log(response.body)

        expect(response.status).toBe(200) // returned HTTP status is 200
        expect(response.body.success).toBe(true) // uccess is true
        expect(response.body).toHaveProperty("data") // data is returned
        expect(response.body).toHaveProperty("data.imageUrl") // data contains imageUrl
        expect(response.body.data.imageUrl).toBeTypeOf("string") // type of imageUrl is string
    })

    test("Failing GET to invalid url /api/dogs/invalid", async () => {
        const response = await request(app)
            .get("/api/dogs/invalid")

        expect(response.status).toBe(404) // returned HTTP status is 404
        expect(response.body).toHaveProperty('error') // returned response contains error message
        expect(response.body.error).toEqual("Route not found") // verify that returned error message is correct (check implementation for valid error message)
    })
})
