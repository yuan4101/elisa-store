"use client";

import { FilterDropdown } from "./FilterDropdown";
import { ClearFiltersButton } from "./ClearFiltersButton";
import {
  GripFilterValue,
  GripFilter,
  GripFilterOptions,
} from "../types/grip-filter";
import {
  PriceSortValue,
  PriceSort,
  PriceSortOptions,
} from "../types/price-filter";

interface CatalogFiltersProps {
  gripFilter: string;
  priceSort: string;
  onGripChange: (value: GripFilterValue) => void;
  onPriceChange: (value: PriceSortValue) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  showGripFilter: boolean;
  showPriceFilter: boolean;
}

export function CatalogFilters({
  gripFilter,
  priceSort,
  onGripChange,
  onPriceChange,
  onClear,
  hasActiveFilters,
  showGripFilter,
  showPriceFilter,
}: CatalogFiltersProps) {
  const displayGripValue = gripFilter === GripFilter.TODOS ? "" : gripFilter;
  const displayPriceValue = priceSort === PriceSort.NONE ? "" : priceSort;

  // Si no hay filtros para mostrar, no renderizar nada
  if (!showGripFilter && !showPriceFilter) {
    return null;
  }

  return (
    <div className="sticky top-[128px] md:top-[168px] z-50 bg-white shadow-lg rounded-xl p-1 md:p-3 w-full md:w-fit border border-[var(--color-navbar-bg)]/60 transition-all duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 pb-1 md:pb-0 pl-2 pr-2">
        <div className="whitespace-nowrap">Filtrar por:</div>

        <div className="flex flex-row w-full">
          {showGripFilter && (
            <div className="flex-1" style={{ minWidth: "96px" }}>
              <FilterDropdown
                currentValue={displayGripValue}
                options={GripFilterOptions}
                onSelect={(value) => {
                  onGripChange(value as GripFilterValue);
                  window.scrollTo({ top: -20, behavior: "smooth" });
                }}
                placeholder="Agarre"
              />
            </div>
          )}

          {showPriceFilter && (
            <div
              className={`flex-1 ${showGripFilter ? "ml-2 md:ml-4" : ""}`}
              style={{ minWidth: "160px" }}
            >
              <FilterDropdown
                currentValue={displayPriceValue}
                options={PriceSortOptions}
                onSelect={(value) => {
                  onPriceChange(value as PriceSortValue);
                  window.scrollTo({ top: -20, behavior: "smooth" });
                }}
                placeholder="Precio"
              />
            </div>
          )}

          <ClearFiltersButton
            isVisible={hasActiveFilters}
            onClick={() => {
              onClear();
              window.scrollTo({ top: -20, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
