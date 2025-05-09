// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { errorMessage } from '../lib/utilities';
import { Notification } from '../components/Notification';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'warning' | 'error' | 'info';
    duration?: number;
  } | null>(null);

  // Obtener productos al autenticar
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        
        if (!response.ok) {
          throw new Error(errorMessage(response.status));
        }

        const data: Product[] = await response.json();
        setLocalProducts(data);
      } catch (eventError) {
        setError(errorMessage(`Error al cargar los productos (${errorMessage(eventError)})`));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  // Verificación básica de contraseña
  const handleLogin = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (password === "camila29") {
      setIsAuthenticated(true);
      setNotification({message: 'Inicio de sesion con exito', type: 'success'});
    } else {
      setNotification({message: "Contraseña incorrecta", type: 'error'});
    }
  };

  // Actualizar stock (ahora con persistencia en API)
  const updateStock = async (id: string, newStock: number) => {
    if (isNaN(newStock)) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          stock: newStock
        })
      });

      if (!response.ok) throw new Error(errorMessage(`Error al actualizar (${response.status})`));

      // Actualizar estado local solo si la API responde correctamente
      setLocalProducts(productos => 
        productos.map(producto => producto.id === id ? { ...producto, stock: newStock } : producto)
      );
      
      setNotification({message: `Stock actualizado para ${id}`, type: 'success', duration: 3000});
    } catch (eventError) {
      setNotification({message: errorMessage(eventError), type: 'error'});
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Ingresar
          </button>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </form>
      </div>
    );
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando productos...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Administrar Stock</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-1">ID: {product.id}</p>
              <p className="mb-3">Precio: <span className="font-semibold">${product.price}</span></p>
              
              <div className="flex items-center justify-between">
                <label className="font-medium">Stock:</label>
                <input
                  type="number"
                  value={product.stock || 0}
                  onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                  className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-300"
                  min="0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}