"use client";

import { useProducts } from "../../producto/hooks/useProducts";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useProductFiltersWithURL } from "../hooks/useProductFiltersWithURL";
import { applyFilters } from "../utils/productFilters";
import { CatalogFilters } from "./CatalogFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductSection } from "./ProductSection";
import { EmptyState } from "@/components/ui/EmptyState";
import { CatalogLoading } from "./CatalogLoading";
import { CatalogError } from "./CatalogError";
import { Product } from "../../producto/types/product";

interface CatalogProps {
  productType: "Hairclip" | "Peineta" | "all";
  showSeasons: boolean;
  showGripFilter: boolean;
  showPriceFilter: boolean;
}

export function Catalog({
  productType,
  showSeasons,
  showGripFilter,
  showPriceFilter,
}: CatalogProps) {
  const { products, loading, error, refetch } = useProducts();

  // Key única para localStorage según tipo de producto
  const filterStorageKey =
    productType === "all" ? "catalogFilters" : `catalogFilters_${productType}`;

  const {
    filters,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  } = useProductFiltersWithURL(filterStorageKey);

  // Filtrar productos por tipo (si no es "all")
  const productsByType =
    productType === "all"
      ? products
      : products.filter((product: Product) => product.type === productType);

  const filteredProducts = applyFilters(productsByType, filters);

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
    <div className="max-w-7xl mx-auto">
      <CatalogFilters
        gripFilter={filters.grip}
        priceSort={filters.priceSort}
        onGripChange={updateGripFilter}
        onPriceChange={updatePriceSortFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
        showGripFilter={showGripFilter}
        showPriceFilter={showPriceFilter}
      />

      {hasNoResults ? (
        <EmptyState />
      ) : (
        <>
          <div className="px-5 pt-1">
            {/* Si showSeasons es false, mostrar todo junto */}
            {!showSeasons ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <>
                {/* Si showSeasons es true, separar por temporadas */}
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
        </>
      )}
    </div>
  );
}
