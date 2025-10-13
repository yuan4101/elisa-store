interface ClearFiltersButtonProps {
  onClick: () => void;
}

export function ClearFiltersButton({ onClick }: ClearFiltersButtonProps) {
  return (
    <div className="flex items-center gap-2 flex-1 min-w-[150px]">
      <div className="w-0.5 bg-[var(--color-navbar-bg)] self-stretch hidden sm:block" />
      <button
        onClick={onClick}
        className="w-full px-4 py-2 border rounded text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)] hover:border-[var(--color-select)] hover:bg-transparent transition-colors focus:outline-none"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
