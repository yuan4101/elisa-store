"use client";

import { useProducts } from "../../producto/hooks/useProducts";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useProductFilters } from "../hooks/useProductFilters";
import { CatalogFilters } from "./CatalogFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductSection } from "./ProductSection";
import { EmptyState } from "@/components/ui/EmptyState";
import { CatalogLoading } from "./CatalogLoading";
import { CatalogError } from "./CatalogError";

export function Catalog() {
  const { products, loading, error, refetch } = useProducts();

  const {
    filters,
    filteredProducts,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters(products);

  const { regular, love, halloween, christmas } =
    useProductsByCategory(filteredProducts);

  if (loading) {
    return <CatalogLoading />;
  }

  if (error) {
    return <CatalogError error={error} onRetry={refetch} />;
  }

  const hasNoResults =
    regular.length === 0 &&
    love.length === 0 &&
    halloween.length === 0 &&
    christmas.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-3">
      <CatalogFilters
        gripFilter={filters.grip}
        priceSort={filters.priceSort}
        onGripChange={updateGripFilter}
        onPriceChange={updatePriceSortFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {hasNoResults ? (
        <EmptyState />
      ) : (
        <>
          {regular.length > 0 && <ProductGrid products={regular} />}

          {love.length > 0 && (
            <ProductSection
              products={love}
              title="Amor y amistad"
              defaultExpanded={false}
            />
          )}

          {halloween.length > 0 && (
            <ProductSection
              products={halloween}
              title="Halloween"
              defaultExpanded={false}
            />
          )}

          {christmas.length > 0 && (
            <ProductSection
              products={christmas}
              title="Navidad"
              defaultExpanded={false}
            />
          )}
        </>
      )}
    </div>
  );
}
