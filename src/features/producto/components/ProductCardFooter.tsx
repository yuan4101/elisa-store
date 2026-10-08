import { AddToCartIcon } from "@/components/ui/AddToCartIcon";
import { formatPriceCOP } from "@/utils/formatters";
import { useRef, useEffect } from "react";
import { useAccessibility } from "../../accessibility/context/AccessibilityContext";

interface ProductCardFooterProps {
  stock: number;
  price: number;
  hasDiscount?: boolean | 0 | null | undefined;
  discountedPrice: number | null;
  quantity: number;
  onAddToCart: (e: React.MouseEvent) => void;
  onOverflowChange: (isOverflowing: boolean) => void;
  isOverflowing: boolean;
}

export function ProductCardFooter({
  stock,
  price,
  hasDiscount,
  discountedPrice,
  quantity,
  onAddToCart,
  onOverflowChange,
  isOverflowing,
}: ProductCardFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { settings } = useAccessibility();
  const fontScale = settings.fontScale ?? 1;

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) return;
      // Botón base es de ~40px + gap de ~8px = 48px. Lo escalamos según fontScale.
      const requiredWidth = textRef.current.scrollWidth + 48 * fontScale;
      const isOver = requiredWidth > containerRef.current.clientWidth;
      onOverflowChange(isOver);
    };

    // Medición inicial
    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(containerRef.current);
    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [onOverflowChange, price, discountedPrice, fontScale]);

  if (stock === 0) {
    return (
      <div
        className="pl-4 mt-auto"
        style={{ paddingRight: "calc(0.5rem * var(--font-scale, 1))" }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="pr-4 text-[var(--color-badge)] text-base flex items-center h-[40px]">
            Agotado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="pl-4 pr-3 mt-auto"
      style={{ paddingBottom: "calc((var(--font-scale, 1) - 1) * 0.75rem)" }}
    >
      <div className="flex items-center justify-between gap-1">
        <div ref={textRef} className="flex flex-col whitespace-nowrap">
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
        {!isOverflowing && (
          <button
            onClick={onAddToCart}
            className="p-2 rounded-full hover:bg-[var(--color-select)] flex-shrink-0"
            aria-label="Agregar al carrito"
          >
            <AddToCartIcon quantity={quantity} />
          </button>
        )}
      </div>
    </div>
  );
}
