import { describe, expect, it } from "vitest";
import { PRICE } from "@/routes/index";

describe("Product price", () => {
  it("sets the product price to 25 Brazilian reais", () => {
    const amount = Number(PRICE.replace("R$ ", "").replace(",", "."));
    expect(amount).toBe(25);
  });
});