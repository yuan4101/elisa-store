"use client";

import { usePathname } from "next/navigation";
import { navItems } from "../config/navItems";
import NavLink from "./NavLink";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav
      className="text-[var(--color-navbar-text)] text-lg md:text-xl flex space-x-4 md:space-x-6"
      aria-label="Navegación principal"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathName === item.href}
        />
      ))}
    </nav>
  );
}
