import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe("dogService.ts tests", () => {

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

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

  test("fail to call API", async ()=> {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500
    } as Response)

    await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image: Dog API returned status 500")
  })
})
