import { AddToCartIcon } from "@/components/ui/AddToCartIcon";
import { formatPriceCOP } from "@/utils/formatters";

interface ProductCardFooterProps {
  stock: number;
  price: number;
  hasDiscount?: boolean | 0 | null | undefined;
  discountedPrice: number | null;
  quantity: number;
  onAddToCart: (e: React.MouseEvent) => void;
}

export function ProductCardFooter({
  stock,
  price,
  hasDiscount,
  discountedPrice,
  quantity,
  onAddToCart,
}: ProductCardFooterProps) {
  if (stock === 0) {
    return (
      <div className="pl-4 mt-auto" style={{ paddingRight: "calc(0.5rem * var(--font-scale, 1))" }}>
        <div className="flex items-center justify-between gap-2">
          <span className="pr-4 text-[var(--color-badge)] text-base flex items-center h-[40px]">
            Agotado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-4 mt-auto" style={{ paddingRight: "calc(0.5rem * var(--font-scale, 1))" }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          {hasDiscount ? (
            <div className="flex flex-col gap-0 pb-1">
              <span className="text-xs text-gray-500 line-through">
                {formatPriceCOP(price)}
              </span>
              <span className="text-base text-[var(--color-button-pink)]">
                {formatPriceCOP(discountedPrice)}
              </span>
            </div>
          ) : (
            <span className="text-base">{formatPriceCOP(price)}</span>
          )}
        </div>
        <button
          onClick={onAddToCart}
          className="p-2 rounded-full hover:bg-[var(--color-select)]"
          aria-label="Agregar al carrito"
        >
          <AddToCartIcon quantity={quantity} />
        </button>
      </div>
    </div>
  );
}
