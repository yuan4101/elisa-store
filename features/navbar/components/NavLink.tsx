"use client";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative group hover:text-[var(--color-select)] transition-colors ${
        isActive ? "text-[var(--color-select)]" : ""
      }`}
    >
      {label}
      <span
        className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      ></span>
    </Link>
  );
}
