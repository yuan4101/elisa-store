import { XMarkIcon } from "@heroicons/react/24/outline";

interface ClearFiltersButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export function ClearFiltersButton({
  onClick,
  isVisible,
}: ClearFiltersButtonProps) {
  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:block overflow-hidden transition-all duration-300 ease-out ${
          isVisible
            ? "max-w-[200px] opacity-100 ml-2 md:ml-4"
            : "max-w-0 opacity-0 ml-0"
        }`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-[150px] pb-2 md:pb-0 animate-fade-in-slide">
          <div className="w-0.5 bg-[var(--color-navbar-bg)] self-stretch hidden sm:block" />
          <button
            onClick={onClick}
            className="w-full block px-4 py-2 border rounded text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)] hover:border-[var(--color-select)] hover:bg-transparent transition-colors focus:outline-none whitespace-nowrap"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Móvil */}
      <div
        className={`md:hidden flex items-center transition-all duration-300 ease-out ${
          isVisible
            ? "max-w-[40px] opacity-100 scale-100 ml-2"
            : "max-w-0 opacity-0 scale-0 ml-0"
        }`}
      >
        <button
          onClick={onClick}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-navbar-bg)]/80 text-white shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Limpiar filtros"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
