import { test, expect } from "@playwright/test";

test.describe("Página Home", () => {
  test(
    "Home redirecciona al catálogo",
    {
      tag: ["@home", "@smoke"],
      annotation: {
        type: "feature",
        description:
          "La página de Home debe redireccionar automáticamente al catálogo",
      },
    },
    async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL("http://localhost:3000/catalogo");
    }
  );
});
