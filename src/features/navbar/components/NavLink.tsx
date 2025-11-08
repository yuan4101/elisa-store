"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavLink({ href, label, isActive }: NavLinkProps) {
  const searchParams = useSearchParams();
  const [finalHref, setFinalHref] = useState(href);

  useEffect(() => {
    if (href === "/catalogo") {
      let query = searchParams.toString();

      if (!query) {
        query = localStorage.getItem("catalogFilters") || "";
      }

      setFinalHref(query ? `${href}?${query}` : href);
    }
  }, [href, searchParams]);

  return (
    <Link
      href={finalHref}
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
