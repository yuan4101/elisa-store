import { useState, useEffect } from "react";
import { Product } from "@/features/producto/types/product";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminService";
import { getBaseUrl } from "@/services/baseUrl";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { showNotification } = useNotification();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getBaseUrl()}/api/products`);
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData: Omit<Product, "id">) => {
    try {
      await createProduct(productData);
      showNotification({
        message: "Producto creado con éxito",
        type: NotificationType.Success,
      });
      await fetchProducts();
    } catch (err) {
      showNotification({
        message: err instanceof Error ? err.message : "Error al crear producto",
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
      await fetchProducts();
    } catch (err) {
      showNotification({
        message:
          err instanceof Error ? err.message : "Error al actualizar producto",
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
      await fetchProducts();
    } catch (err) {
      showNotification({
        message:
          err instanceof Error ? err.message : "Error al eliminar producto",
        type: NotificationType.Error,
      });
    }
  };

  const filteredProducts = products.filter((product) =>
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
