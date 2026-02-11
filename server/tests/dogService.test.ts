import { describe, expect, test, vi } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

//vi.mock("../services/dogService")

describe("dogService.ts tests", () => {
  test('succesfull call to API', async ()=>{

    const jsonResponse = {
      message: "https://images.dog.ceo/breeds/mudhol-indian/Indian-Mudhol.jpg",
      status: "success"
    }

    console.log(jsonResponse)

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => jsonResponse
    } as Response)

    const result = await getRandomDogImage()
    console.log(result, "!!!!!!!!!!!!!!!")

    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith("https://dog.ceo/api/breeds/image/random")
    expect(result).toEqual({
      imageUrl: jsonResponse.message,
      status: "success"
    }
    )

  })
})
