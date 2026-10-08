"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, NavItemType } from "../config/navItems";
import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import { Menu as MenuIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav
        className="text-[var(--color-navbar-text)] text-lg md:text-xl flex gap-x-4 md:gap-x-6 items-center"
        aria-label="Navegación principal"
      >
        {/* Botón de hamburguesa en móvil */}
        <button
          className="md:hidden p-1 text-[var(--color-navbar-text)] hover:text-[var(--color-select)] transition-colors"
          onClick={toggleSidebar}
          aria-label="Abrir menú de navegación"
        >
          <MenuIcon size={28} />
        </button>

        {/* Siempre mostramos el dropdown de Catálogo */}
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
          return null;
        })}

        {/* Enlaces directos solo en desktop */}
        <div className="hidden md:flex gap-x-6">
          {navItems.map((item) => {
            if (item.type === NavItemType.LINK) {
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathName === item.href}
                />
              );
            }
            return null;
          })}
        </div>
      </nav>

      {/* Menú lateral izquierdo (Drawer) para móviles */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-[100] md:hidden"
              aria-hidden="true"
            />
            
            {/* Panel lateral */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-screen max-w-[100vw] bg-white z-[101] shadow-2xl flex flex-col md:hidden"
            >
              <div className="sticky top-0 bg-white z-10 pt-2 px-4 border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between pb-2">
                  <div className="text-lg font-medium text-[var(--color-navbar-bg)]">
                    Menú
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-[calc(28px*var(--font-scale,1))] w-[calc(28px*var(--font-scale,1))]" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col py-4 px-2 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  if (item.type === NavItemType.LINK) {
                    const isActive = pathName === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={toggleSidebar}
                        className={`block px-4 py-3 rounded-lg text-lg transition-colors ${
                          isActive 
                            ? "bg-[var(--color-navbar-bg)]/10 text-[var(--color-navbar-bg)] font-bold" 
                            : "text-[var(--color-text)] hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  if (item.type === NavItemType.DROPDOWN) {
                    return (
                      <details key={item.label} className="group">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-lg text-[var(--color-text)] hover:bg-gray-100 transition-colors">
                          {item.label}
                          <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="mt-1 flex flex-col space-y-1 px-4 border-l-2 border-gray-100 ml-4 mb-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={toggleSidebar}
                              className={`block rounded-lg px-4 py-2 text-base transition-colors ${
                                pathName === subItem.href
                                  ? "bg-[var(--color-navbar-bg)]/10 text-[var(--color-navbar-bg)] font-bold"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-text)]"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
