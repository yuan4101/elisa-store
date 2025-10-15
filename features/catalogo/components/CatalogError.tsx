interface CatalogErrorProps {
  error: string;
  onRetry: () => void;
}

export function CatalogError({ error, onRetry }: CatalogErrorProps) {
  return (
    <div className="max-w-7xl mx-auto px-3 py-10">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[var(--color-navbar-bg)] text-white rounded-lg hover:bg-[var(--color-select)] transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
