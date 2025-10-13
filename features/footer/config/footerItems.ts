enum ItemType {
  Text = "text",
  Link = "link",
}

interface FooterItem {
  type: ItemType;
  href?: string;
  text?: string;
  className?: string;
}

export const footerItems: FooterItem[] = [
  {
    type: ItemType.Link,
    href: "/about",
    text: "Elisa&CO Hairclips",
    className: "font-bold",
  },
  { type: ItemType.Link, href: "/contacto", text: "Contacto" },
  {
    type: ItemType.Link,
    href: "/admin",
    text: `© ${new Date().getFullYear()} All rights reserved`,
  },
];
