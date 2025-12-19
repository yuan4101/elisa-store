import { useState } from "react";
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
  const { showNotification } = useNotification();

  const handleCreateProduct = async (
    productData: Omit<Product, "id" | "imagePath" | "discountedPrice">
  ) => {
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
  };

  const handleUpdateProduct = async (
    id: string,
    productData: Partial<Product>
  ) => {
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
  };

  const handleDeleteProduct = async (id: string) => {
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
  };

  // ✅ Función para actualizar solo el stock
  const handleStockChange = async (productId: string, newStock: number) => {
    try {
      await updateProduct(productId, { stock: newStock });
      showNotification({
        message: `Stock actualizado a ${newStock}`,
        type: NotificationType.Success,
      });
      await refetch();
    } catch (err) {
      showNotification({
        message: errorMessage(err),
        type: NotificationType.Error,
      });
    }
  };

  // ✅ Filtrar y ordenar alfabéticamente A-Z
  const filteredProducts = products
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
    handleStockChange, // ✅ Exportar la función
  };
}
