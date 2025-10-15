import { Product } from "@/features/producto/types/product";
import { ProductItem } from "./ProductItem";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState message="No se encontraron productos" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
}
