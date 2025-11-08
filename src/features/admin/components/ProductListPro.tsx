import { Product } from "@/features/producto/types/product";
import { ProductItem } from "./ProductItemPro";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onStockChange: (productId: string, newStock: number) => void;
}

export function ProductList({
  products,
  onEdit,
  onStockChange,
}: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onStockChange={onStockChange}
        />
      ))}
    </div>
  );
}
