import { test, expect } from "@playwright/test";
import { pages } from "./fixtures/routes";

test.describe("Títulos de páginas", () => {
  for (const pageData of pages) {
    test(
      `Página '${pageData.name}' tiene el título correcto`,
      {
        tag: ["@navegacion", "@critico"],
        annotation: {
          type: "feature",
          description: `Verifica el título SEO de la página '${pageData.name}'`,
        },
      },
      async ({ page }) => {
        await page.goto(`${pageData.path}`);
        await expect(page).toHaveTitle(pageData.title);
      }
    );
  }
});
