"use client";

import { useRef, useState } from "react";
import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { Modal } from "./Modal";
import { useProductForm } from "../hooks/useProductForm";
import { ProductForm } from "./ProductForm";
import { ImageCropUpload, ImageCropUploadRef } from "./ImageCropUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductFormModalProps {
  product: Product | null;
  onSubmit: (productData: Partial<Product>) => Promise<boolean>;
  onClose: () => void;
  onDelete?: (id: string) => void; // ✅ Nueva prop para eliminar
  isOpen: boolean;
}

export function ProductFormModal({
  product,
  onSubmit,
  onClose,
  onDelete, // ✅ Nueva prop
  isOpen,
}: ProductFormModalProps) {
  const isEditing = product !== null;
  const { formData, updateField, buildProductData } = useProductForm({
    product,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageCropRef = useRef<ImageCropUploadRef>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const imageComponent = imageCropRef.current;

      // Si es creación, validar imágenes
      if (!isEditing) {
        if (imageComponent?.hasImages()) {
          if (!imageComponent.isCropValid()) {
            alert(
              "Por favor asegúrate de que el recorte sea válido (mínimo 600x600)"
            );
            setIsSubmitting(false);
            return;
          }

          if (!imageComponent.isCropSaved()) {
            alert("Por favor guarda el recorte antes de continuar");
            setIsSubmitting(false);
            return;
          }
        } else {
          alert("Por favor selecciona y recorta una imagen para el producto");
          setIsSubmitting(false);
          return;
        }
      }

      // Guardar producto en BD
      const productData = buildProductData();
      const productSaved = await onSubmit(productData);

      if (!productSaved) {
        alert("Error al guardar el producto en la base de datos");
        setIsSubmitting(false);
        return;
      }

      // Si es edición, cerrar modal
      if (isEditing) {
        alert("Producto actualizado exitosamente");
        onClose();
        return;
      }

      // Si es creación, subir imágenes
      if (imageComponent?.hasImages()) {
        try {
          await imageComponent.uploadImages();
          alert("Producto e imágenes guardados exitosamente");
          onClose();
        } catch (imageError) {
          alert(
            `Producto guardado en base de datos, pero error al subir imágenes: ${
              imageError instanceof Error
                ? imageError.message
                : "Error desconocido"
            }`
          );
        }
      } else {
        alert("Producto guardado exitosamente (sin imágenes)");
        onClose();
      }
    } catch (error) {
      alert(
        `Error inesperado: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handler para eliminar producto
  const handleDelete = () => {
    if (!product || !onDelete) return;

    const confirmed = confirm(
      `¿Estás seguro de que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`
    );

    if (confirmed) {
      onDelete(product.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        {/* Título y botón eliminar */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Editar producto" : "Crear producto"}
          </h2>

          {/* ✅ Botón eliminar (solo si es edición) */}
          {isEditing && onDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
              Eliminar
            </button>
          )}
        </div>

        {/* Imagen actual (solo en edición) */}
        {isEditing && product && (
          <div className="flex justify-center">
            <ProductImage
              imagePath={product.imagePath}
              productName={product.name}
              imageSize={ImageSize.MEDIUM}
            />
          </div>
        )}

        {/* Formulario */}
        <ProductForm formData={formData} onFieldChange={updateField} />

        {/* Upload de imagen (solo en creación) */}
        {!isEditing && formData.sku && (
          <ImageCropUpload ref={imageCropRef} sku={formData.sku} />
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:bg-gray-300 transition-colors font-medium"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
