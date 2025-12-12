"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export function Catalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, loading, error, refetch } = useProducts();

  // ✅ useRef para ejecutar solo una vez
  const hasRestoredFilters = useRef(false);

  const {
    filters,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  } = useProductFiltersWithURL();

  const filteredProducts = applyFilters(products, filters);

  const { regular, love, halloween, christmas } =
    useProductsByCategory(filteredProducts);

  // ✅ Restaurar filtros desde localStorage al cargar la página
  useEffect(() => {
    // Solo ejecutar si aún no hemos restaurado
    if (!hasRestoredFilters.current) {
      const currentQuery = searchParams.toString();

      // Solo si NO hay query params en la URL actual
      if (!currentQuery) {
        const savedFilters = localStorage.getItem("catalogFilters");

        // Si hay filtros guardados, redirigir a la URL con filtros
        if (savedFilters) {
          router.replace(`/catalogo?${savedFilters}`);
        }
      }

      // Marcar como completado para evitar ejecuciones futuras
      hasRestoredFilters.current = true;
    }
  }, [router, searchParams]); // ✅ Incluye dependencias, sin warning

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
      />

      {hasNoResults ? (
        <EmptyState />
      ) : (
        <>
          <div className="px-5 pt-1">
            {regular.length > 0 && <ProductGrid products={regular} />}

            {love.length < 0 && (
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
          </div>
        </>
      )}
    </div>
  );
}
