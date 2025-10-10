import { test, expect } from "@playwright/test";
import { baseURL, pages } from "./fixtures/routes";

test.describe("Navegación entre páginas", () => {
  for (const pageData of pages) {
    test(
      `Navega a '${pageData.name}' desde navbar`,
      {
        tag: ["@navegacion", "@critico"],
        annotation: {
          type: "feature",
          description: `Verifica que los usuarios pueden acceder a la página '${pageData.name}' usando el navbar`,
        },
      },
      async ({ page }) => {
        await page.goto(`${pageData.path}`);
        await page.click(`nav >> a:has-text("${pageData.name}")`);
        await expect(page).toHaveURL(`${baseURL + pageData.path}`);
      }
    );
  }

  test(
    "Navega con boton retroceso y adelante del navegador",
    {
      tag: ["@navegacion", "@regression"],
      annotation: {
        type: "feature",
        description:
          "Verifica que el historial de navegación funciona correctamente",
      },
    },
    async ({ page }) => {
      await page.goto("/");
      await page.click(`nav >> a:has-text("${pages[1].name}")`);
      await expect(page).toHaveURL(`${baseURL + pages[1].path}`);
      await page.click(`nav >> a:has-text("${pages[2].name}")`);
      await expect(page).toHaveURL(`${baseURL + pages[2].path}`);

      await page.goBack();
      await expect(page).toHaveURL(`${baseURL + pages[1].path}`);

      await page.goBack();
      await expect(page).toHaveURL(`${baseURL + pages[0].path}`);

      await page.goForward();
      await expect(page).toHaveURL(`${baseURL + pages[1].path}`);
    }
  );
});
