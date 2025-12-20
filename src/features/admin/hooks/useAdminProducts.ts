import { useState, useCallback } from "react";
import { Product } from "@/features/producto/types/product";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminService";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";
import { useProducts } from "@/features/producto/hooks/useProducts";
import { errorMessage } from "@/utils/errorMessage";

export function useAdminProducts() {
  const { products, loading, error, refetch } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const { showNotification } = useNotification();

  // Sincronizar localProducts con products cuando cambia
  if (products.length > 0 && localProducts.length === 0) {
    setLocalProducts(products);
  }

  const handleCreateProduct = useCallback(
    async (productData: Omit<Product, "id" | "imagePath" | "discountedPrice" | "creationDate">) => {
      try {
        await createProduct(productData);
        showNotification({
          message: "Producto creado con éxito",
          type: NotificationType.Success,
        });
        await refetch();
      } catch (err) {
        showNotification({
          message: errorMessage(err),
          type: NotificationType.Error,
        });
      }
    },
    [refetch, showNotification]
  );

  const handleUpdateProduct = useCallback(
    async (id: string, productData: Partial<Product>) => {
      try {
        await updateProduct(id, productData);
        showNotification({
          message: "Producto actualizado con éxito",
          type: NotificationType.Success,
        });
        await refetch();
      } catch (err) {
        showNotification({
          message: errorMessage(err),
          type: NotificationType.Error,
        });
      }
    },
    [refetch, showNotification]
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteProduct(id);
        showNotification({
          message: "Producto eliminado con éxito",
          type: NotificationType.Success,
        });
        await refetch();
      } catch (err) {
        showNotification({
          message: errorMessage(err),
          type: NotificationType.Error,
        });
      }
    },
    [refetch, showNotification]
  );

  // ✅ Notificación SOLO cuando el servidor responde
  const handleStockChange = useCallback(
    async (productId: string, newStock: number) => {
      // 1. Guardar el estado anterior por si hay error
      const previousProducts = [...localProducts];

      // 2. Actualizar localmente INMEDIATAMENTE (sin notificación)
      setLocalProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, stock: newStock }
            : product
        )
      );

      try {
        // 3. Actualizar en el servidor
        await updateProduct(productId, { stock: newStock });

        // ✅ NOTIFICACIÓN AQUÍ (solo si el servidor respondió exitosamente)
        showNotification({
          message: `Stock de actualizado a ${newStock}`,
          type: NotificationType.Success,
        });
      } catch (err) {
        // 4. Si hay error, revertir el cambio local
        setLocalProducts(previousProducts);

        // ✅ NOTIFICACIÓN DE ERROR AQUÍ (solo si falla)
        showNotification({
          message: errorMessage(err),
          type: NotificationType.Error,
        });
      }
    },
    [localProducts, showNotification]
  );

  // ✅ Filtrar y ordenar alfabéticamente A-Z usando localProducts
  const filteredProducts = localProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));

  return {
    products: filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleStockChange,
  };
}
