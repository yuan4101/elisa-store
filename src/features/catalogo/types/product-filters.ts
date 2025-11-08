import { GripFilter, GripFilterValue } from "./grip-filter";
import { PriceSort, PriceSortValue } from "./price-filter";
import { AlphabetSort, AlphabetSortValue } from "./alphabet-filter";

export interface ProductFilters {
  grip: GripFilterValue;
  priceSort: PriceSortValue;
  alphabetSort: AlphabetSortValue;
}

export const DEFAULT_FILTERS: ProductFilters = {
  alphabetSort: AlphabetSort.A_Z,
  grip: GripFilter.TODOS,
  priceSort: PriceSort.NONE,
};
