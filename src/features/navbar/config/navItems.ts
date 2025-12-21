interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/stock", label: "Stock" },
];
