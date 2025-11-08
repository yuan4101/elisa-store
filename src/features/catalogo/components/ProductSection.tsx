import { useState } from "react";
import { Product } from "../../producto/types/product";
import { ProductSectionHeader } from "./ProductSectionHeader";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductSectionProps {
  products: Product[];
  title: string;
  defaultExpanded?: boolean;
  emptyMessage?: string;
}

export function ProductSection({
  products,
  title,
  defaultExpanded = true,
  emptyMessage = "No hay productos para mostrar",
}: ProductSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="mb-6">
      <ProductSectionHeader
        title={title}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
      />

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-[var(--color-card-bg)] rounded-b-2xl">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <EmptyState message={emptyMessage} />
          )}
        </div>
      </div>
    </div>
  );
}
