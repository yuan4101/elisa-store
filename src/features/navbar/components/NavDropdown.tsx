"use client";

import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ChevronIcon } from "@/components/ui/ChevronIcon";
import Link from "next/link";

interface NavDropdownProps {
  label: string;
  items: {
    href: string;
    label: string;
  }[];
  currentPath: string;
}

export default function NavDropdown({
  label,
  items,
  currentPath,
}: NavDropdownProps) {
  const isActive = items.some((item) => currentPath.startsWith(item.href));

  return (
    <Menu as="div" className="relative z-[60]">
      {({ open }) => (
        <>
          <MenuButton
            className="relative group hover:text-[var(--color-select)] transition-colors flex items-center md:gap-1"
            aria-label={`Menú de ${label}`}
          >
            {label}
            <ChevronIcon
              isExpanded={open}
              className={`transition-colors ${
                open || isActive
                  ? "text-[var(--color-select)]"
                  : "text-[var(--color-navbar-text)] group-hover:text-[var(--color-select)]"
              }`}
            />

            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <MenuItems className="absolute md:-left-1 -left-3 mt-2 w-29 bg-[var(--color-navbar-bg)] rounded-b-xl shadow-lg focus:outline-none overflow-hidden">
              <div className="py-0">
                {items.map((item) => {
                  const isItemActive = currentPath === item.href;

                  return (
                    <MenuItem key={item.href}>
                      {({ focus }) => (
                        <Link
                          href={item.href}
                          className={`block px-4 py-2.5 text-base md:text-lg transition-colors relative ${
                            focus
                              ? "text-[var(--color-select)]"
                              : isItemActive
                                ? "text-[var(--color-select)] font-medium"
                                : "text-[var(--color-navbar-text)]"
                          }`}
                          aria-current={isItemActive ? "page" : undefined}
                        >
                          {item.label}
                          {isItemActive && (
                            <span
                              className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-select)]"
                              aria-label="Página actual"
                            />
                          )}
                        </Link>
                      )}
                    </MenuItem>
                  );
                })}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
