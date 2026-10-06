import { Product } from "../../producto/types/product";
import { ProductCard } from "../../producto/components/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-x-3 gap-y-5 pb-5 pt-3 grid-cols-[repeat(var(--catalog-cols-mobile,2),minmax(0,1fr))] md:grid-cols-[repeat(var(--catalog-cols-tablet,3),minmax(0,1fr))] lg:grid-cols-[repeat(var(--catalog-cols-desktop,5),minmax(0,1fr))]">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
