import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { ProductCardTitle } from "@/features/producto/components/ProductCardTitle";
import { useProductCard } from "@/features/producto/hooks/useProductCard";
import { AddToCartIcon } from "@/components/ui/AddToCartIcon";
import { formatPriceCOP } from "@/utils/formatters";

interface FavoriteProductCard {
  product: Product;
  index: number;
  stock: number;
}

export function FavoriteProductCard({
  product,
  index,
  stock,
}: FavoriteProductCard) {
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

  // if (stock === 0) {
  //   return (
  //     <div className="pl-4 pr-2 mt-auto">
  //       <div className="flex items-center justify-between gap-2">
  //         <span className="pr-4 text-(--color-badge) text-md flex items-center h-10">
  //           Agotado
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      onClick={goProduct}
      className="relative transition transform hover:-translate-y-6 hover:scale-110 cursor-pointer"
    >
      {hasDiscount && hasStock && (
        <div className="absolute top-3 right-3 z-10 bg-(--color-button-pink) text-white px-2 py-1 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
          -{discountPercentage}%
        </div>
      )}
      {isNew && hasStock && (
        <div className="absolute top-3 left-0 z-10 bg-(--color-navbar-bg) text-white px-2 py-1 rounded-e-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
          Nuevo
        </div>
      )}
      <div className="md:w-full rounded-xl group overflow-hidden hover:text-(--color-navbar-bg) flex flex-col h-full">
        <div className="relative rounded-xl overflow-hidden">
          <ProductImage
            imagePath={product.imagePath}
            imageSize={ImageSize.LARGE}
            productName={product.name}
            priority={isPriority}
          />
          <button
            onClick={addToCart}
            className="absolute scale-120 bottom-5 right-5 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-(--color-select) opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Agregar al carrito"
          >
            <AddToCartIcon quantity={quantity} />
          </button>
        </div>
        <div className="flex flex-row justify-center items-center md:pt-2">
          <ProductCardTitle name={product.name} size="2xl" />
        </div>

        <div className="flex-1">
          <div className="flex flex-row h-full justify-center items-center gap-2">
            <div className="flex flex-col">
              {stock === 0 ? (
                <div className="pl-4 pr-2 mt-auto">
                  <div className="flex items-center justify-between gap-2">
                    <span className="pr-4 text-(--color-badge) text-md flex items-center h-10">
                      Agotado
                    </span>
                  </div>
                </div>
              ) : hasDiscount ? (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">
                    {formatPriceCOP(product.price)}
                  </span>
                  <span className="text-xl text-(--color-button-pink)">
                    {formatPriceCOP(product.discountedPrice)}
                  </span>
                </div>
              ) : (
                <span className="text-xl">{formatPriceCOP(product.price)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
