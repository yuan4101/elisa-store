import { Product } from "../types/product";
import { ProductImage } from "./ProductImage";
import { ImageSize } from "../types/imageSize";
import { ProductCardTitle } from "./ProductCardTitle";
import { ProductCardFooter } from "./ProductCardFooter";
import { useProductCard } from "../hooks/useProductCard";
import { AddToCartIcon } from "@/components/ui/AddToCartIcon";
import { useState } from "react";

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

  const [isOverflowing, setIsOverflowing] = useState(false);

  return (
    <div
      onClick={goProduct}
      className="relative transition transform hover:-translate-y-1 cursor-pointer h-full"
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
      <div className="w-full group bg-[var(--color-card-bg)] rounded-xl shadow-md hover:shadow-xl hover:text-[var(--color-navbar-bg)] flex flex-col h-full">
        <div className="flex-1 relative">
          <ProductImage
            imagePath={product.imagePath}
            imageSize={ImageSize.MEDIUM}
            productName={product.name}
            priority={isPriority}
            className="rounded-t-xl overflow-hidden"
          />
          {hasStock && isOverflowing && (
            <button
              onClick={addToCart}
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full hover:bg-[var(--color-select)] shadow-lg z-10 text-black hover:text-white transition-colors"
              aria-label="Agregar al carrito"
            >
              <AddToCartIcon quantity={quantity} />
            </button>
          )}
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
          isOverflowing={isOverflowing}
          onOverflowChange={setIsOverflowing}
        />
      </div>
    </div>
  );
}
