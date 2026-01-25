"use client";

import { usePathname } from "next/navigation";
import { navItems, NavItemType } from "../config/navItems";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav
      className="text-[var(--color-navbar-text)] text-lg md:text-xl flex space-x-3 md:space-x-6"
      aria-label="Navegación principal"
    >
      {navItems.map((item) => {
        if (item.type === NavItemType.DROPDOWN) {
          return (
            <NavDropdown
              key={item.label}
              label={item.label}
              items={item.items}
              currentPath={pathName}
            />
          );
        }

        return (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={pathName === item.href}
          />
        );
      })}
    </nav>
  );
}
