import { Product } from "../../producto/types/product";
import {
  ProductFilters,
  GripFilter,
  PriceSort,
  AlphabetSort,
} from "../types/filters";

function filterByAvailable(products: Product[]): Product[] {
  return products.filter((product: Product) => product.visible === true);
}

function filterByGrip(products: Product[], gripFilter: GripFilter): Product[] {
  if (gripFilter === GripFilter.All) {
    return products;
  }

  return products.filter((product) => product.grip === (gripFilter as string));
}

function sortByPrice(products: Product[], sortOrder: PriceSort): Product[] {
  if (sortOrder === PriceSort.None) {
    return products;
  }

  const sorted = [...products];

  if (sortOrder === PriceSort.LowToHigh) {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === PriceSort.HighToLow) {
    return sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}

function sortByAlphabet(
  products: Product[],
  sortOrder: AlphabetSort
): Product[] {
  if (sortOrder === AlphabetSort.None) {
    return products;
  }

  const sorted = [...products];

  if (sortOrder === AlphabetSort.AToZ) {
    return sorted.sort((a: Product, b: Product) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortOrder === AlphabetSort.ZToA) {
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
    filters.priceSort === PriceSort.None
      ? sortByAlphabet(result, filters.alphabetSort)
      : sortByPrice(result, filters.priceSort);
  return result;
}
