'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`relative group hover:text-[var(--color-select)] transition-colors ${
        isActive ? 'text-[var(--color-select)]' : ''
      }`}
    >
      {label}
      <span
        className={`absolute left-0 bottom-0 h-0.5 bg-[var(--color-select)] transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      ></span>
    </Link>
  );
}

export default function Navbar() {
  const pathName = usePathname();
  const navItems: NavItem[] = [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/about', label: '¿Quién soy?' },
    { href: '/contacto', label: 'Contáctanos' },
  ];

  return (
    <div className="text-[var(--color-navbar-text)] flex space-x-6">
      {navItems.map((item) => (
        <NavLink 
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathName === item.href}
        />
      ))}
    </div>
  );
}