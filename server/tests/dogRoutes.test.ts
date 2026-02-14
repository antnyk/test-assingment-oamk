import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import * as dogController from '../controllers/dogController'
import request from 'supertest'
import { app } from '../index'

vi.mock("../controllers/dogController")

describe("dogRoutes tests", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    test("GET call to /api/dogs/random", async () => {
        const jsonReturned = {
            success: true,
                data: {
                    message: "https://images.dog.ceo/breeds/mudhol-indian/Indian-Mudhol.jpg",
                    status: "success"
                }
        }

        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req, res) => {
                res.status(200).json(jsonReturned)
            }
        )

        const res = await request(app)
            .get("/api/dogs/random")

        console.log(res.body)

        expect(res.status).toBe(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.data.message).toEqual("https://images.dog.ceo/breeds/mudhol-indian/Indian-Mudhol.jpg")
    })
})