export default function NavbarSkeleton() {
  return (
    <nav
      className="text-[var(--color-navbar-text)] flex gap-6"
      aria-label="Navegación principal"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
      ))}
    </nav>
  );
}
