import { memo } from "react";
import { Product } from "@/features/producto/types/product";
import { ProductItem } from "./ProductItem";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductListProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onStockChange: (productId: string, newStock: number) => void;
  showEditButton?: boolean;
}

function ProductListComponent({
  products,
  onEdit,
  onStockChange,
  showEditButton = true,
}: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={showEditButton && onEdit ? () => onEdit(product) : undefined}
          onStockChange={onStockChange}
        />
      ))}
    </div>
  );
}

function arePropsEqual(
  prevProps: ProductListProps,
  nextProps: ProductListProps
) {
  if (prevProps.products.length !== nextProps.products.length) {
    return false;
  }

  return prevProps.products.every((prevProduct, index) => {
    const nextProduct = nextProps.products[index];
    return (
      prevProduct.id === nextProduct.id &&
      prevProduct.stock === nextProduct.stock &&
      prevProduct.visible === nextProduct.visible &&
      prevProduct.name === nextProduct.name &&
      prevProduct.imagePath === nextProduct.imagePath
    );
  });
}

export const ProductList = memo(ProductListComponent, arePropsEqual);
