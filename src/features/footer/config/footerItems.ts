import { FooterType, FooterItem } from "../types/FooterType";

export const footerItems: FooterItem[] = [
  {
    type: FooterType.Text,
    text: "Elisa&CO Hairclips",
    className: "font-bold",
  },
  { type: FooterType.Text, text: "Contacto" },
  {
    type: FooterType.Text,
    text: `© ${new Date().getFullYear()} All rights reserved`,
  },
];
