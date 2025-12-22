import { Product } from "../types/product";
import { useNavigation } from "@/hooks/useNavigation";
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

  const isPriority = index < 15;

  return (
    <div
      onClick={() => goProduct(product.sku)}
      className="lg:w-[190px] group bg-[var(--color-card-bg)] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:text-[var(--color-navbar-bg)] transition transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      <div className="flex-1">
        <ProductImage
          imagePath={product.imagePath}
          imageSize={ImageSize.MEDIUM}
          productName={product.name}
          priority={isPriority}
        />

        <ProductCardTitle name={product.name} />
      </div>

      <ProductCardFooter stock={product.stock} price={product.price} />
    </div>
  );
}
