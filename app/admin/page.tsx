"use client";

import { useState } from "react";
import { Product } from "@/features/producto/types/product";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProducts";
import { SearchBox } from "@/features/admin/components/SearchBox";
import { ProductList } from "@/features/admin/components/ProductList";
import { ProductFormModal } from "@/features/admin/components/ProductFormModal";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const {
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useAdminProducts();

  const { showNotification } = useNotification();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogin = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (password === "camila29") {
      setIsAuthenticated(true);
      showNotification({
        message: "Inicio de sesión con éxito",
        type: NotificationType.Success,
      });
    } else {
      showNotification({
        message: "Contraseña incorrecta",
        type: NotificationType.Error,
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (
    productData: Partial<Product>
  ): Promise<boolean> => {
    try {
      if (editingProduct) {
        // Actualizar producto existente
        await handleUpdateProduct(editingProduct.id, productData);
      } else {
        // Crear nuevo producto (excluir id e imagePath)
        const { ...createData } = productData;
        await handleCreateProduct(
          createData as Omit<Product, "id" | "imagePath">
        );
      }

      // Si llegamos aquí, el guardado fue exitoso
      // NO cerrar el modal aquí - retornar true para que el modal maneje el cierre
      return true;
    } catch (error) {
      console.error("Error al guardar producto:", error);

      // Mostrar notificación de error
      showNotification({
        message: `Error al ${
          editingProduct ? "actualizar" : "crear"
        } el producto`,
        type: NotificationType.Error,
      });

      // Retornar false para indicar que falló
      return false;
    }
  };

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="pt-25 pb-40 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-[var(--color-card-bg)] p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl mb-4 text-center">Acceso Administrador</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[var(--color-badge-light)] text-white p-2 rounded hover:bg-[var(--color-badge)] transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-40 pb-60 text-xl flex items-center justify-center">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-bold pb-2">Administrar Stock</h1>
          <div className="pb-3">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="flex justify-right gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[var(--color-badge-light)] text-white px-4 py-2 rounded hover:bg-[var(--color-badge)] transition"
            >
              Agregar producto
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-[var(--color-button-pink-light)] text-white px-4 py-2 rounded hover:bg-[var(--color-button-pink)] transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
        />

        {showForm && (
          <ProductFormModal
            product={editingProduct}
            onSubmit={handleSubmit}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
}
