import { describe, expect, it } from "vitest";
import { ORIGINAL_PRICE, PRICE } from "@/routes/index";

describe("Product price", () => {
  it("sets the launch price to 27.99 Brazilian reais", () => {
    const amount = Number(PRICE.replace("R$ ", "").replace(",", "."));
    expect(amount).toBe(27.99);
  });
  it("sets the original price to 67.90 Brazilian reais", () => {
    const amount = Number(ORIGINAL_PRICE.replace("R$ ", "").replace(",", "."));
    expect(amount).toBe(67.9);
  });
});