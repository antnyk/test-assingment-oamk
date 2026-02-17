import { describe, expect, test, vi } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe("dogService.ts tests", () => {
  test("succesful return of results", async ()=>{

    const jsonResponse = {
      message: "https://images.dog.ceo/breeds/mudhol-indian/Indian-Mudhol.jpg",
      status: "success"
    }

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => jsonResponse
    } as Response)

    const result = await getRandomDogImage()

    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith("https://dog.ceo/api/breeds/image/random")
    expect(result).toEqual({
      imageUrl: jsonResponse.message,
      status: "success"
    }
    )
  })

  test.fails("fail to call API", async ()=> {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 500
    } as Response)

    const result = await getRandomDogImage()
    console.log(result)

    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith("https://dog.ceo/api/breeds/image/random")
    expect(result).toEqual({
      ok: "false",
      status: 500
    })
  })
})
