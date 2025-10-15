"use client";

import { useRef, useState } from "react";
import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "@/features/producto/types/imageSize";
import { Modal } from "./Modal";
import { useProductForm } from "../hooks/useProductForm";
import { ProductForm } from "./ProductForm";
import { ImageCropUpload, ImageCropUploadRef } from "./ImageCropUpload";

interface ProductFormModalProps {
  product: Product | null;
  onSubmit: (productData: Partial<Product>) => Promise<boolean>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageCropRef = useRef<ImageCropUploadRef>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("🔵 INICIO - handleSubmit");

    try {
      // Guardar referencia al componente de imágenes al inicio
      const imageComponent = imageCropRef.current;
      console.log("🔵 imageComponent guardado:", imageComponent);

      // 1. Si no estamos editando, verificar si hay imagen con recorte válido y guardado
      if (!isEditing) {
        console.log("🔵 Es creación, verificando imágenes...");
        console.log("🔵 imageComponent:", imageComponent);
        console.log("🔵 hasImages:", imageComponent?.hasImages());

        if (imageComponent?.hasImages()) {
          console.log("🔵 Hay imágenes, verificando validez...");

          if (!imageComponent.isCropValid()) {
            console.log("❌ Recorte no válido");
            alert(
              "Por favor asegúrate de que el recorte sea válido (mínimo 600x600)"
            );
            setIsSubmitting(false);
            return;
          }
          console.log("✅ Recorte válido");

          if (!imageComponent.isCropSaved()) {
            console.log("❌ Recorte no guardado");
            alert("Por favor guarda el recorte antes de continuar");
            setIsSubmitting(false);
            return;
          }
          console.log("✅ Recorte guardado");
        } else {
          console.log("❌ No hay imágenes");
          alert("Por favor selecciona y recorta una imagen para el producto");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Intentar guardar el producto en la base de datos
      console.log("🔵 Guardando producto en BD...");
      const productData = buildProductData();
      console.log("🔵 productData:", productData);
      const productSaved = await onSubmit(productData);
      console.log("🔵 productSaved:", productSaved);

      // 3. Si el producto NO se guardó, detener aquí
      if (!productSaved) {
        console.log("❌ Producto NO guardado en BD");
        alert("Error al guardar el producto en la base de datos");
        setIsSubmitting(false);
        return;
      }
      console.log("✅ Producto guardado en BD");

      // 4. Si es edición, cerrar modal inmediatamente (sin subir imágenes)
      if (isEditing) {
        console.log("🔵 Es edición, cerrando modal...");
        alert("Producto actualizado exitosamente");
        onClose();
        return;
      }

      // 5. Si es creación y hay imágenes, subirlas DESPUÉS de guardar el producto
      console.log(
        "🔵 Verificando si hay imágenes para subir (usando referencia guardada)..."
      );
      console.log("🔵 imageComponent antes de subir:", imageComponent);
      console.log(
        "🔵 imageComponent?.hasImages():",
        imageComponent?.hasImages()
      );

      if (imageComponent?.hasImages()) {
        console.log("✅ Hay imágenes, iniciando subida...");
        try {
          console.log("🔵 Llamando a uploadImages()...");
          await imageComponent.uploadImages();
          console.log("✅ Imágenes subidas exitosamente");
          alert("Producto e imágenes guardados exitosamente");
          onClose();
        } catch (imageError) {
          console.error("❌ Error al subir imágenes:", imageError);
          alert(
            `Producto guardado en base de datos, pero error al subir imágenes: ${
              imageError instanceof Error
                ? imageError.message
                : "Error desconocido"
            }. Por favor, contacta al administrador.`
          );
        }
      } else {
        console.log("⚠️ No hay imágenes para subir");
        console.log(
          "⚠️ Verificación: imageCropRef.current:",
          imageCropRef.current
        );
        console.log("⚠️ Verificación: imageComponent:", imageComponent);
        alert("Producto guardado exitosamente (sin imágenes)");
        onClose();
      }
    } catch (error) {
      console.error("❌ Error inesperado:", error);
      alert(
        `Error inesperado: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setIsSubmitting(false);
      console.log("🔵 FIN - handleSubmit");
    }
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

      {/* Mostrar componente de recorte solo al crear producto y cuando tenga SKU */}
      {!isEditing && formData.sku && (
        <div className="mb-6">
          <ImageCropUpload ref={imageCropRef} sku={formData.sku} />
        </div>
      )}

      <ProductForm formData={formData} onFieldChange={updateField} />

      <div className="flex justify-end space-x-2 pt-4">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="px-4 py-2 text-white border rounded-lg bg-[var(--color-button-pink-light)] hover:bg-[var(--color-button-pink)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-[var(--color-badge-light)] text-white rounded-lg hover:bg-[var(--color-badge)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}
