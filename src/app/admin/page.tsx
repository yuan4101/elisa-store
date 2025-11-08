"use client";

import { useState, useCallback, useEffect } from "react";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProducts";
import { SearchBox } from "@/features/admin/components/SearchBox";
import { ProductList } from "@/features/admin/components/ProductList";
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
    handleStockChange: originalHandleStockChange,
  } = useAdminProducts();

  const { showNotification } = useNotification();

  // ✅ Scroll al inicio cuando se autentica
  useEffect(() => {
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [isAuthenticated]);

  // Optimizar handleStockChange con useCallback
  const handleStockChange = useCallback(
    (productId: string, newStock: number) => {
      originalHandleStockChange(productId, newStock);
    },
    [originalHandleStockChange]
  );

  // Optimizar handleEdit con useCallback
  const handleEdit = useCallback(() => {}, []);

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

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center container flex-grow ">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-xl w-96"
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
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Header con título y botones de acción */}
      <div className="flex justify-between items-center mb-5 gap-2">
        <span className="text-2xl md:text-3xl font-bold text-gray-800">
          Administrar Stock
        </span>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-semibold transition-colors shadow-md"
        >
          Cerrar sesión
        </button>
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
    </div>
  );
}
