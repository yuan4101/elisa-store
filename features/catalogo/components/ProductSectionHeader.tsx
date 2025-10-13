import { ChevronIcon } from "../../../components/ui/ChevronIcon";

interface ProductSectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProductSectionHeader({
  title,
  isExpanded,
  onToggle,
}: ProductSectionHeaderProps) {
  return (
    <div
      className="flex items-center justify-between p-4 bg-[var(--color-card-bg)] rounded-t-2xl cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors"
      onClick={onToggle}
    >
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {isExpanded ? "Ocultar" : "Mostrar"}
        </span>
        <ChevronIcon isExpanded={isExpanded} />
      </div>
    </div>
  );
}
