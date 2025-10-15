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
    productData: Omit<Product, "id" | "imagePath">
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
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

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

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    products: filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
