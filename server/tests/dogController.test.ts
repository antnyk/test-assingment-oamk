import { describe, expect, test, vi} from 'vitest'
import { getDogImage } from '../controllers/dogController'
import * as dogService from "../services/dogService"

const mockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnThis()
  res.json = vi.fn()
  return res
}

describe("dogController test", () => {
  test("Return succesful call", async () => {
    const mockData = {
      imageUrl: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5112.jpg",
      status: "success"
    }

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockData)

    const _req: any = {}
    const res = mockResponse()

    await getDogImage(_req, res)

    expect(res.json).toHaveBeenCalledWith({
      data: {
        imageUrl: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5112.jpg",
        status: "success"
      },
      success: true
    })
  })
})
