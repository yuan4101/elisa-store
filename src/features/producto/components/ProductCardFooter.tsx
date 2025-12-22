import { formatPriceCOP } from "@/utils/formatters";

interface ProductCardFooterProps {
  stock: number;
  price: number;
}

export function ProductCardFooter({ stock, price }: ProductCardFooterProps) {
  if (stock === 0) {
    return (
      <div className="pl-4 pr-2 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <span className="pr-4 text-[var(--color-badge)] text-md flex items-center h-[40px]">
            Agotado
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-4 pr-2 mt-auto">
      <div className="flex items-center justify-between gap-2">
        <span>{formatPriceCOP(price)}</span>
        <button
          className="p-2 rounded-full hover:bg-[var(--color-select)]"
          aria-label="Agregar al carrito"
        ></button>
      </div>
    </div>
  );
}
