import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getDogImage } from '../controllers/dogController'
import * as dogService from "../services/dogService"

const mockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnThis()
  res.json = vi.fn()
  return res
}

//  {
//
//      "data": {
//
//-       "imageUrl": "",
//
//+       "imageUrl": "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5112.jpg",
//
//        "status": "success",
//
//      },
//
//      "success": true,
//
//    },

describe("dogController.getDogImage", () => {
  test("Return succesful call", async () => {
    const mockData = {
      imageUrl: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5112.jpg",
      status: "success"
    }

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockData)

    const _req: any = {}
    const res = mockResponse()

    await getDogImage(_req, res)

    //console.log(res.status, "!!!!!!!!!!")

    //expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      data: {
        imageUrl: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_5112.jpg",
        status: "success"
      },
      success: true
    })
  })
})
