import { Product } from "../../producto/types/product";

export function splitByStock(products: Product[]) {
  const [stockedProducts, unstockedProducts] = products.reduce(
    (acc: [Product[], Product[]], product: Product) => {
      if (product.stock > 0) {
        acc[0].push(product);
      } else {
        acc[1].push(product);
      }
      return acc;
    },
    [[], []]
  );
  return [stockedProducts, unstockedProducts];
}
