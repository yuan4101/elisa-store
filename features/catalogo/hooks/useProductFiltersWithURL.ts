"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { ProductFilters, DEFAULT_FILTERS } from "../types/product-filters";
import { GripFilterValue } from "../types/grip-filter";
import { PriceSortValue } from "../types/price-filter";
import { AlphabetSortValue } from "../types/alphabet-filter";

export function useProductFiltersWithURL() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [router, searchParams, pathname]);

  const updateGripFilter = useCallback((grip: GripFilterValue) => {
    updateURL({ grip });
  }, [updateURL]);

  const updatePriceSortFilter = useCallback((priceSort: PriceSortValue) => {
    updateURL({ priceSort });
  }, [updateURL]);

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    filters.grip !== DEFAULT_FILTERS.grip || 
    filters.priceSort !== DEFAULT_FILTERS.priceSort ||
    filters.alphabetSort !== DEFAULT_FILTERS.alphabetSort;

  return {
    filters,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  };
}
