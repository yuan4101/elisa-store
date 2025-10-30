import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { PencilIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface ProductItemProps {
  product: Product;
  onEdit: () => void;
  onStockChange: (productId: string, newStock: number) => void;
}

export function ProductItem({
  product,
  onEdit,
  onStockChange,
}: ProductItemProps) {
  const handleIncrement = () => {
    onStockChange(product.id, product.stock + 1);
  };

  const handleDecrement = () => {
    if (product.stock > 0) {
      onStockChange(product.id, product.stock - 1);
    }
  };

  return (
    <div
      className={`
        relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
        transform hover:-translate-y-1 overflow-hidden
        ${
          product.visible
            ? "bg-[var(--color-card-bg)]"
            : "bg-[var(--color-card-bg-unavailable)]"
        }
        border-2 ${
          product.visible
            ? "border-[var(--color-navbar-bg)]/30"
            : "border-[var(--color-navbar-bg)]/60"
        }
      `}
    >
      {/* Botón de editar superpuesto en esquina superior derecha */}
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-select)] hover:bg-[var(--color-button-pink)] text-[var(--color-text)] shadow-lg transition-all duration-200 hover:scale-110"
      >
        <PencilIcon className="w-4 h-4" />
      </button>

      {/* Imagen cuadrada */}
      <div className="relative aspect-square">
        <ProductImage
          imagePath={product.imagePath}
          productName={product.name}
          imageSize={ImageSize.SMALL}
        />

        {!product.visible && (
          <div className="absolute top-2 left-2 bg-[var(--color-navbar-bg)] text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow-lg">
            Oculto
          </div>
        )}
      </div>

      {/* Footer compacto */}
      <div className="p-2.5 space-y-2">
        {/* Nombre del producto */}
        <h3 className="font-bold text-s text-[var(--color-text)] line-clamp-2 min-h-[2rem] leading-tight">
          {product.name}
        </h3>

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-select)] to-transparent"></div>

        {/* Botones de stock */}
        <div className="flex items-center justify-center gap-2 bg-white/50 rounded-lg py-2 px-1">
          <button
            onClick={handleDecrement}
            disabled={product.stock === 0}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-navbar-bg)] to-[#8a0829] hover:from-[#8a0829] hover:to-[var(--color-navbar-bg)] text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
          >
            <MinusIcon className="w-4 h-4" />
          </button>

          <span className="text-xl font-bold text-[var(--color-text)] min-w-[2rem] text-center">
            {product.stock}
          </span>

          <button
            onClick={handleIncrement}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-button-pink)] to-[var(--color-button-pink-light)] hover:from-[var(--color-button-pink-light)] hover:to-[var(--color-button-pink)] text-white transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra decorativa inferior */}
      <div className="h-1 bg-gradient-to-r from-[var(--color-navbar-bg)] via-[var(--color-badge)] to-[var(--color-select)]"></div>
    </div>
  );
}
