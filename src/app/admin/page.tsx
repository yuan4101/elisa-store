"use client";

import { useState } from "react";
import { Product } from "@/features/producto/types/product";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProductsPro";
import { SearchBox } from "@/features/admin/components/SearchBox";
import { ProductList } from "@/features/admin/components/ProductListPro";
import { ProductFormModal } from "@/features/admin/components/ProductFormModal";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { NotificationType } from "@/features/notification/types/notification";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleStockChange,
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
        // Crear nuevo producto
        const { ...createData } = productData;
        await handleCreateProduct(
          createData as Omit<Product, "id" | "imagePath">
        );
      }

      return true;
    } catch (error) {
      console.error("Error al guardar producto:", error);
      showNotification({
        message: `Error al ${
          editingProduct ? "actualizar" : "crear"
        } el producto`,
        type: NotificationType.Error,
      });
      return false;
    }
  };

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Acceso Administrador
          </h2>
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con título y botones de acción */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Administrar Stock</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            + Nuevo Producto
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Lista de productos */}
      <ProductList
        products={products}
        onEdit={handleEdit}
        onStockChange={handleStockChange}
      />

      {/* Modal de formulario con botón eliminar */}
      {showForm && (
        <ProductFormModal
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          onDelete={handleDeleteProduct}
          product={editingProduct}
        />
      )}
    </div>
  );
}
