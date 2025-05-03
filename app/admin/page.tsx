// src/app/admin/page.tsx
"use client";

//import { useState } from 'react';
//import { Product } from '../types/product'
//import { products, Product } from '../../data/products';

export default function AdminPage() {
  /*
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [localProducts] = [{}];
  const [notification, setNotification] = useState('');

  // Verificación básica de contraseña (¡NO es seguro para producción!)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "camila29") { // Contraseña hardcodeada (solo para desarrollo)
      setIsAuthenticated(true);
    } else {
      setNotification("Contraseña incorrecta");
    }
  };

  // Actualizar stock
  const updateStock = (id: string, newStock: number) => {
    if (isNaN(newStock)) return;
    /*
    setLocalProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
    */
   /*
    setNotification(`Stock actualizado para ID: ${id}`);
    setTimeout(() => setNotification(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4">Acceso Administrador</h2>
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Ingresar
          </button>
          {notification && <p className="mt-4 text-red-500">{notification}</p>}
        </form>
      </div>
    );
  }
*/
  return (
    <div></div>
  )
}

/*
<div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Administrar Stock</h1>
      {notification && (
        <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
          {notification}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
      </div>
    </div>
  );
{localProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <div className="mt-2 flex items-center">
              <label className="mr-2">Stock:</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                className="w-20 p-1 border rounded"
                min="0"
              />
            </div>
          </div>
        ))}
          */