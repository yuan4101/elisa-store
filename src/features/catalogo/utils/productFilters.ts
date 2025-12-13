import { Product } from "../../producto/types/product";
import { GripFilterValue, GripFilter } from "../types/grip-filter";
import { PriceSortValue, PriceSort } from "../types/price-filter";
import { AlphabetSortValue, AlphabetSort } from "../types/alphabet-filter";
import {ProductFilters} from "../types/product-filters";

function filterByAvailable(products: Product[]): Product[] {
  return products.filter((product: Product) => product.visible === true);
}

function filterByGrip(products: Product[], gripFilter: GripFilterValue): Product[] {
  if (gripFilter === GripFilter.TODOS) {
    return products;
  }

  return products.filter((product) => product.grip === (gripFilter as string));
}

function getFinalPrice(product: Product): number {
  return product.discountedPrice && product.discountedPrice < product.price
    ? product.discountedPrice
    : product.price;
}

function sortByPrice(products: Product[], sortOrder: PriceSortValue): Product[] {
  if (sortOrder === PriceSort.NONE) {
    return products;
  }

  const sorted = [...products];

  if (sortOrder === PriceSort.LOW_HIGH) {
    return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
  }

  if (sortOrder === PriceSort.HIGH_LOW) {
    return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
  }

  return sorted;
}

function sortByAlphabet(
  products: Product[],
  sortOrder: AlphabetSortValue
): Product[] {
  if (sortOrder === AlphabetSort.NONE) {
    return products;
  }

  const sorted = [...products];

  if (sortOrder === AlphabetSort.A_Z) {
    return sorted.sort((a: Product, b: Product) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortOrder === AlphabetSort.Z_A) {
    return sorted.sort((a: Product, b: Product) =>
      b.name.localeCompare(a.name)
    );
  }

  return sorted;
}

export function applyFilters(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let result = filterByAvailable(products);
  result = filterByGrip(result, filters.grip);
  result =
    filters.priceSort === PriceSort.NONE
      ? sortByAlphabet(result, filters.alphabetSort)
      : sortByPrice(result, filters.priceSort);
  return result;
}
