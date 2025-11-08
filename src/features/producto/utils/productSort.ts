import { Product } from "../types/product";

export function sortByStock(products: Product[]): Product[] {
  const withStock = products.filter((product) => product.stock > 0);
  const withoutStock = products.filter((product) => product.stock === 0);

  return [...withStock, ...withoutStock];
}
