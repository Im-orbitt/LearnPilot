import { describe, expect, test, vi } from "vitest";
import { getBooks } from "./api";

describe("API service", () => {
  test("getBooks sends credentials with the request", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        books: [],
      }),
    };

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

    await getBooks();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/books"),
      expect.objectContaining({
        credentials: "include",
      }),
    );

    vi.unstubAllGlobals();
  });
});
