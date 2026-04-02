import { Product } from "../types/product";
import { ProductImage } from "./ProductImage";
import { ImageSize } from "../types/imageSize";
import { ProductCardTitle } from "./ProductCardTitle";
import { ProductCardFooter } from "./ProductCardFooter";
import { useProductCard } from "../hooks/useProductCard";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const {
    quantity,
    isPriority,
    discountPercentage,
    hasDiscount,
    hasStock,
    isNew,
    goProduct,
    addToCart,
  } = useProductCard(product, index);

  return (
    <div
      onClick={goProduct}
      className="relative transition transform hover:-translate-y-1 cursor-pointer"
    >
      {hasDiscount && hasStock && (
        <div className="absolute top-3 right-3 z-10 bg-[var(--color-button-pink)] text-white px-2 py-1 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
          -{discountPercentage}%
        </div>
      )}
      {isNew && hasStock && (
        <div className="absolute top-3 left-0 z-10 bg-[var(--color-navbar-bg)] text-white px-2 py-1 rounded-e-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
          Nuevo
        </div>
      )}
      <div className="lg:w-[190px] group bg-[var(--color-card-bg)] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:text-[var(--color-navbar-bg)] flex flex-col h-full">
        <div className="flex-1">
          <ProductImage
            imagePath={product.imagePath}
            imageSize={ImageSize.MEDIUM}
            productName={product.name}
            priority={isPriority}
          />
        </div>
        <div className="flex-1 pt-1 px-4">
          <ProductCardTitle name={product.name} />
        </div>

        <ProductCardFooter
          stock={product.stock}
          price={product.price}
          hasDiscount={hasDiscount}
          discountedPrice={product.discountedPrice}
          quantity={quantity}
          onAddToCart={addToCart}
        />
      </div>
    </div>
  );
}
