"use client";

import { FilterDropdown } from "./FilterDropdown";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { GripFilter, PriceSort } from "../types/filters";

interface CatalogFiltersProps {
  gripFilter: string;
  priceSort: string;
  onGripChange: (value: GripFilter) => void;
  onPriceChange: (value: PriceSort) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function CatalogFilters({
  gripFilter,
  priceSort,
  onGripChange,
  onPriceChange,
  onClear,
  hasActiveFilters,
}: CatalogFiltersProps) {
  const gripOptions = Object.values(GripFilter);
  const priceOptions = Object.values(PriceSort);
  const displayGripValue = gripFilter === GripFilter.All ? "" : gripFilter;
  const displayPriceValue = priceSort === PriceSort.None ? "" : priceSort;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-2">
      <div className="whitespace-nowrap">Filtrar por:</div>

      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <FilterDropdown
          currentValue={displayGripValue}
          options={gripOptions}
          onSelect={(value) => onGripChange(value as GripFilter)}
          placeholder="Agarre"
        />

        <FilterDropdown
          currentValue={displayPriceValue}
          options={priceOptions}
          onSelect={(value) => onPriceChange(value as PriceSort)}
          placeholder="Precio"
        />

        {hasActiveFilters && <ClearFiltersButton onClick={onClear} />}
      </div>
    </div>
  );
}
