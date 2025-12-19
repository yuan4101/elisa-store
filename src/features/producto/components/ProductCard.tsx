import { Product } from "../types/product";
import { useNavigation } from "@/hooks/useNavigation";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/features/shoppingCart/hooks/useCart";
import { ProductImage } from "./ProductImage";
import { ImageSize } from "../types/imageSize";
import { ProductCardTitle } from "./ProductCardTitle";
import { ProductCardFooter } from "./ProductCardFooter";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { goProduct } = useNavigation();
  const { handleAddToCart } = useAddToCart();
  const { getProductQuantity } = useCart();

  const quantity = getProductQuantity(product.id);
  const isPriority = index < 15;

  const discountPercentage = product.discountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;
  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;
  const hasStock = product.stock > 0 ? true : false;

  return (
    <div
      onClick={() => goProduct(product.sku)}
      className="relative transition transform hover:-translate-y-1 cursor-pointer"
    >
      {hasDiscount && hasStock && (
        <div className="absolute top-2 right-3 z-10 bg-[var(--color-button-pink)] text-white px-2 py-1 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
          -{discountPercentage}%
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
          <ProductCardTitle name={product.name} />
        </div>

        <ProductCardFooter
          stock={product.stock}
          price={product.price}
          hasDiscount={hasDiscount}
          discountedPrice={product.discountedPrice}
          quantity={quantity}
          onAddToCart={(e) => handleAddToCart(e, product)}
        />
      </div>
    </div>
  );
}
