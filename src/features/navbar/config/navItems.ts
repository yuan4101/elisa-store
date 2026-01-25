export const NavItemType = {
  LINK: "Link",
  DROPDOWN: "Menu desplegable",
} as const;

type NavType = (typeof NavItemType)[keyof typeof NavItemType];

const NavType = Object.values(NavItemType).map((value) => ({
  value: value,
  label: value,
}));

interface BaseNavItem {
  label: string;
  type: NavType;
}

interface NavLinkItem extends BaseNavItem {
  type: typeof NavItemType.LINK;
  href: string;
}

interface NavDropdownItem extends BaseNavItem {
  type: typeof NavItemType.DROPDOWN;
  items: {
    label: string;
    href: string;
  }[];
}

type NavItem = NavLinkItem | NavDropdownItem;

export const navItems: NavItem[] = [
  {
    label: "Catálogo",
    type: NavItemType.DROPDOWN,
    items: [
      { label: "Hairclips", href: "/catalogo/hairclips" },
      { label: "Peinetas", href: "/catalogo/peinetas" },
      //{ label: "Pañoletas", href: "/catalogo/pañoletas" },
      //{ label: "Cosmetiqueras", href: "/catalogo/cosmetiqueras" },
    ],
  },
  { label: "Nosotros", href: "/about", type: NavItemType.LINK },
  { label: "Contáctanos", href: "/contacto", type: NavItemType.LINK },
];
