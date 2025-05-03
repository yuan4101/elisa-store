'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="text-[var(--color-navbar-text)] flex space-x-6">

        {/* Catalogo */}
        <Link
          href="/catalogo"
          className={`relative group hover:text-[var(--color-select)] transition-colors 
            ${pathName === '/catalogo' ? 'text-[var(--color-select)]' : ''}`}
        >
          Catálogo
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 
                ${pathName === '/catalogo' ? 'w-full' : 'w-0 group-hover:w-full'}`}
          ></span>
        </Link>

        {/* Nosotros */}
        <Link
          href="/about"
          className={`relative group hover:text-[var(--color-select)] transition-colors ${
            pathName === '/about' ? 'text-[var(--color-select)]' : ''
          }`}
        >
          ¿Quién soy?
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 ${
              pathName === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          ></span>
        </Link>

        <Link
          href="/contacto"
          className={`relative group hover:text-[var(--color-select)] transition-colors ${
            pathName === '/contacto' ? 'text-[var(--color-select)]' : ''
          }`}
        >
          Contáctanos
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 ${
              pathName === '/contacto' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          ></span>
        </Link>
    </div>
  );
}