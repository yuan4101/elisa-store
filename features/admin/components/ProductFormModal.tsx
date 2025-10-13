"use client";

import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { Modal } from "./Modal";
import { useProductForm } from "../hooks/useProductForm";
import { ProductForm } from "./ProductForm";

interface ProductFormModalProps {
  product: Product | null;
  onSubmit: (productData: Partial<Product>) => void;
  onClose: () => void;
}

export function ProductFormModal({
  product,
  onSubmit,
  onClose,
}: ProductFormModalProps) {
  const isEditing = product !== null;
  const { formData, updateField, buildProductData } = useProductForm({
    product,
  });

  const handleSubmit = () => {
    onSubmit(buildProductData());
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl flex-shrink-0">
          {isEditing ? "Editando producto" : "Creando producto"}
        </h3>
        {isEditing && product && (
          <div className="w-20 h-20 overflow-hidden rounded-xl">
            <ProductImage
              imagePath={product.imagePath}
              imageSize={ImageSize.Small}
              productName={product.name}
              priority={true}
            />
          </div>
        )}
      </div>
      <div className="h-0.5 bg-[var(--color-navbar-bg)] self-stretch mt-1 mb-3"></div>
      <ProductForm formData={formData} onFieldChange={updateField} />

      <div className="flex justify-end space-x-2 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-white border rounded-lg bg-[var(--color-button-pink-light)] hover:bg-[var(--color-button-pink)]"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[var(--color-badge-light)] text-white rounded-lg hover:bg-[var(--color-badge)]"
        >
          Guardar
        </button>
      </div>
    </Modal>
  );
}
