"use client";

import { useState } from "react";
import { Product } from "../../producto/types/product";
import {
  ProductFilters,
  GripFilter,
  PriceSort,
  DEFAULT_FILTERS,
} from "../types/filters";
import { applyFilters } from "../utils/productFilters";

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);

  const filteredProducts = applyFilters(products, filters);

  const updateGripFilter = (grip: GripFilter) => {
    setFilters((prev) => ({ ...prev, grip }));
  };

  const updatePriceSortFilter = (priceSort: PriceSort) => {
    setFilters((prev) => ({ ...prev, priceSort }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.grip !== GripFilter.All || filters.priceSort !== PriceSort.None;

  return {
    filters,
    filteredProducts,
    updateGripFilter,
    updatePriceSortFilter,
    clearFilters,
    hasActiveFilters,
  };
}
