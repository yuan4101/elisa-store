"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { ProductFilters, DEFAULT_FILTERS } from "../types/product-filters";
import { GripFilterValue } from "../types/grip-filter";
import { PriceSortValue } from "../types/price-filter";
import { AlphabetSortValue } from "../types/alphabet-filter";

export function useProductFiltersWithURL(storageKey: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasRestoredFilters = useRef(false);

  const filters: ProductFilters = {
    grip: (searchParams.get("grip") as GripFilterValue) || DEFAULT_FILTERS.grip,
    priceSort: (searchParams.get("priceSort") as PriceSortValue) || DEFAULT_FILTERS.priceSort,
    alphabetSort: (searchParams.get("alphabetSort") as AlphabetSortValue) || DEFAULT_FILTERS.alphabetSort,
  };

  const updateURL = useCallback((updates: Partial<ProductFilters>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== DEFAULT_FILTERS[key as keyof ProductFilters]) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    
    // Guardar en localStorage cada vez que cambien los filtros
    if (queryString) {
      localStorage.setItem(storageKey, queryString);
    } else {
      localStorage.removeItem(storageKey);
    }

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [router, searchParams, pathname, storageKey]);

  const updateGripFilter = useCallback((grip: GripFilterValue) => {
    updateURL({ grip });
  }, [updateURL]);

  const updatePriceSortFilter = useCallback((priceSort: PriceSortValue) => {
    updateURL({ priceSort });
  }, [updateURL]);

  const clearFilters = useCallback(() => {
    localStorage.removeItem(storageKey);
    router.replace(pathname, { scroll: false });
  }, [router, pathname, storageKey]);

  const hasActiveFilters =
    filters.grip !== DEFAULT_FILTERS.grip || 
    filters.priceSort !== DEFAULT_FILTERS.priceSort ||
    filters.alphabetSort !== DEFAULT_FILTERS.alphabetSort;

  // Restaurar filtros desde localStorage al cargar la página
  useEffect(() => {
    if (!hasRestoredFilters.current) {
      const currentQuery = searchParams.toString();

      // Solo si NO hay query params en la URL actual
      if (!currentQuery) {
        const savedFilters = localStorage.getItem(storageKey);

        // Si hay filtros guardados, redirigir a la URL con filtros
        if (savedFilters) {
          router.replace(`${pathname}?${savedFilters}`);
        }
      }

      hasRestoredFilters.current = true;
    }
  }, [router, searchParams, pathname, storageKey]);

  return {
    filters,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  };
}
