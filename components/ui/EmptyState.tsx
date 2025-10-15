interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "No se encontraron productos",
}: EmptyStateProps) {
  return (
    <div className="text-center py-10">
      <p className="text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
}
