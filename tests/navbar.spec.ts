import { test, expect } from "@playwright/test";
import { pages } from "./fixtures/routes";

test.describe("Componente Navbar", () => {
  for (const pageData of pages) {
    test(
      `Navbar visible en '${pageData.name}'`,
      {
        tag: ["@navbar", "@smoke"],
        annotation: {
          type: "feature",
          description: `Verifica que el navbar es visible en la pagina '${pageData.name}'`,
        },
      },
      async ({ page }) => {
        await page.goto(`${pageData.path}`);
        await expect(page.locator("nav")).toBeVisible();
      }
    );
  }

  test(
    "Navbar contiene (Catálogo, Nosotros, Contáctanos)",
    {
      tag: ["@navbar", "@smoke"],
      annotation: {
        type: "feature",
        description:
          "Verifica la presencia de enlaces: Catálogo, Nosotros, Contáctanos",
      },
    },
    async ({ page }) => {
      await page.goto("/");
      const navbar = page.locator("nav");

      await expect(navbar.locator('a:has-text("Catálogo")')).toBeVisible();
      await expect(navbar.locator('a:has-text("Nosotros")')).toBeVisible();
      await expect(navbar.locator('a:has-text("Contáctanos")')).toBeVisible();
    }
  );

  /*
  test(
    "El navbar debe resaltar el enlace de la página actual",
    {
      tag: ["@navbar", "@regression"],
      annotation: {
        type: "feature",
        description:
          "Verifica que el enlace activo tiene estilos diferenciados",
      },
    },
    async ({ page }) => {
      await page.goto("/");
      const activeLink = page.locator('nav a[aria-current="page"]');
      await expect(activeLink).toContainText("Catálogo");
    }
  );
  
  test(
    "El navbar debe ser responsive en móvil",
    {
      tag: ["@navbar", "@regression"],
      annotation: {
        type: "feature",
        description:
          "Verifica que el navbar funciona correctamente en dispositivos móviles",
      },
    },
    async ({ page }) => {
      // Configurar viewport móvil
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/catalogo");

      const navbar = page.locator("nav");
      await expect(navbar).toBeVisible();
    }
  );
  */
});
