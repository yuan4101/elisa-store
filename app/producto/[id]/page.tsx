"use client";

import { Product } from "../../types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Notification } from '../../components/Notification';

export default function ProductPage({ params }: { params : Promise<{ id: string }>}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, getProductQuantity } = useCart();
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  const productId = React.use(params).id;

  useEffect(() => {    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        if (!res.ok) throw new Error("Error al cargar productos");
        
        const products: Product[] = await res.json();
        const foundProduct = products.find(p => p.id === productId);
        
        if (!foundProduct) throw new Error("Producto no encontrado");
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.stock <= 0) {
      setNotification({
        message: 'Este producto está agotado.',
        type: 'error',
      });
      return;
    }

    const completeImageRoute = product.image_path ? 
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/sm${product.image_path}` : 
      '/icons/file.svg'

    // Obtener la cantidad actual en el carrito
    const currentQuantity = getProductQuantity(product.id);
    
    // Verificar si al agregar 1 más superaría el stock
    if (currentQuantity >= product.stock) {
      setNotification({
        message: `Límite de stock alcanzado (${product.stock} unidades)`,
        type: 'warning',
      });
      return;
    }
      
      addToCart({
        id: product.id,
      name: product.name,
      price: product.price,
      image: completeImageRoute,
      stock: product.stock,
      quantity: 1,
    });

    setNotification({
      message: `"${product.name}" añadido al carrito`,
      type: 'success',
    });
  };

  const handleBackToCatalog = () => {
    router.push('/catalogo');
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-3 py-10">
      <div className="text-center">Cargando producto...</div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-3 py-10">
      <div className="text-center text-red-500">{error}</div>
      <button 
        onClick={handleBackToCatalog}
        className="mt-4 inline-block text-pink-600 hover:underline cursor-pointer"
      >
        ← Volver al catálogo
      </button>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-3 py-10">
      <div className="text-center">Producto no disponible</div>
      <button 
        onClick={handleBackToCatalog}
        className="mt-4 inline-block text-pink-600 hover:underline cursor-pointer shadow-sm"
      >
        ← Volver al catálogo
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
        {/* Imagen del producto */}
        <div className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-md">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image_path ? 
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/lg/${product.image_path}` : 
                '/icons/file.svg'
              }
              alt={product.name}
              fill
              priority={true}
              className="object-cover rounded-t-2xl shadow-sm"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              onError={(e) => {
              // Fallback si la imagen falla al cargar
                (e.target as HTMLImageElement).src = "/icons/file.svg";
                (e.target as HTMLImageElement).classList.add("p-4", "opacity-70");
              }}
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="space-y-6 md:pt-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {product.name}
          </h1>
          
          <p className="text-lg text-[var(--color-text)]">
            {product.description}
          </p>

          <div className="space-y-2">
            <p className="text-xl font-semibold">
              Precio: <span className="text-[var(--color-navbar-bg)]">${product.price.toLocaleString()}</span>
            </p>
            <p>Disponibles: {product.stock}</p>
            <p>Agarre: {product.grip}</p>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {product.stock <= 0 ? (<button className="bg-[var(--color-card)] text-red-500 text-xl px-6 py-3 rounded-lg">Agotado</button>) : (
              <button
              className="shadow-sm bg-[var(--color-badge-light)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-badge)] transition cursor-pointer"
              onClick={handleAddToCart}
              >
                Agregar al carrito
              </button>
            )}
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}
            <button
              onClick={handleBackToCatalog}
              className="shadow-sm bg-[var(--color-button-pink-light)] text-white px-3 py-3 rounded-lg hover:bg-[var(--color-button-pink)] transition cursor-pointer"
            >
              ← Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}