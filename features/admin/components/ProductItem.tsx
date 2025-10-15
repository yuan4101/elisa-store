import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductItemProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  const formatPriceCOP = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  let bg;
  if (!product.visible) {
    bg =
      "bg-red-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow";
  } else {
    bg = "bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow";
  }
  return (
    <div className={bg}>
      {/* Contenedor más pequeño con bordes redondeados */}
      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-xl">
        <ProductImage
          imagePath={product.imagePath}
          imageSize={ImageSize.Small}
          productName={product.name}
          priority={false}
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>

      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <p>Precio: {formatPriceCOP(product.price)}</p>
        <p>Stock: {product.stock}</p>
        <p>Agarre: {product.grip}</p>
      </div>

      <div className="flex gap-2">
        <IconButton
          onClick={onEdit}
          color="primary"
          size="small"
          className="flex-1"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
          color="error"
          size="small"
          className="flex-1"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
