export const baseURL = "http://localhost:3000";

const mainTitle = "Elisa & CO - HAIRCLIPS";

export const pages = [
  {
    path: "/catalogo",
    name: "Catálogo",
    title: `${mainTitle}`,
  },
  {
    path: "/about",
    name: "Nosotros",
    title: `${mainTitle}`,
  },
  {
    path: "/contacto",
    name: "Contáctanos",
    title: `${mainTitle}`,
  },
] as const;
