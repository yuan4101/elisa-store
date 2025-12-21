"use client";

import { usePathname, useRouter } from "next/navigation";
import { navItems } from "../config/navItems";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";
import NavLink from "./NavLink";

export default function Navbar() {
  const { showNotification } = useNotification();
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        showNotification({
          message: "Inicio de sesión con éxito",
          type: NotificationType.Success,
        });
        router.push("/admin/login");
        router.refresh();
      }
    } catch {
      showNotification({
        message: "Error al iniciar sesión",
        type: NotificationType.Error,
      });
    }
  };

  const showNavItems =
    pathName.startsWith("/admin") && pathName !== "/admin/login";

  return (
    <nav
      className="text-[var(--color-navbar-text)] text-lg md:text-xl flex justify-between items-center w-full"
      aria-label="Navegación principal"
    >
      <div className="flex space-x-4 md:space-x-6">
        {showNavItems &&
          navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              isActive={pathName === item.href}
            />
          ))}
      </div>

      {showNavItems && (
        <button
          onClick={handleLogout}
          className="rounded-md cursor-pointer mt-1 md:mt-0 py-1 px-2 bg-[var(--color-badge)] text-[var(--color-navbar-text)] hover:bg-[var(--color-badge-light)]"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
