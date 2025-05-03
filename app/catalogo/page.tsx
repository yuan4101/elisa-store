"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import { Badge, IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';
import { Notification } from '../components/Notification';

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, getProductQuantity } = useCart();
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        
        const data = await response.json();
        const filteredData = data.filter((product: Product) => product.image_path);
        setProducts(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setNotification({
          message: 'Error al cargar el catálogo',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productName: string) => {
    router.push(`/producto/${productName}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
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

    const currentQuantity = getProductQuantity(product.id);
    const availableStock = product.stock - currentQuantity;
    
    if (availableStock <= 0) {
      setNotification({
        message: availableStock === 0 
          ? 'Producto agotado' 
          : `Solo ${product.stock} disponible(s)`,
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
      message: `"${product.name}" añadido al carrito (${availableStock - 1} restantes)`,
      type: 'success',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 py-10">
        <div className="text-center">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-3 py-10">
        <div className="text-center text-red-500">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg mx-auto block"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3">
      {products.length === 0 && !loading && (
        <div className="text-center py-10">
          <p>No se encontraron productos</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="lg:w-[200px] group bg-[var(--color-card-bg)] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:text-[var(--color-navbar-bg)] transition transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
          >
            <div className="flex-1">
              <div className="relative w-full aspect-square bg-[var(--color-card-bg)]">
                <Image
                  src={product.image_path ? 
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/md${product.image_path}` : 
                    '/icons/file.svg'
                  }
                  alt={product.name}
                  fill
                  priority={index < 2}
                  loading={index > 1 ? 'lazy' : 'eager'}
                  className="object-cover rounded-t-2xl"
                  onError={(e) => {
                  // Fallback si la imagen falla al cargar
                    (e.target as HTMLImageElement).src = "/icons/file.svg";
                    (e.target as HTMLImageElement).classList.add("p-4", "opacity-70");
                  }}
                />
              </div>
              <div className="pt-2 px-4">
                <h2 className="text-md font-normal text-[var(--color-text)] group-hover:text-[var(--color-navbar-bg)] text-left">
                  {product.name}
                </h2>
              </div>
            </div>
            <div className="pl-4 pr-2 mt-auto">
              <div className="flex items-center justify-between gap-2">
                {product.stock <= 0 ? (
                  <span className="pr-4 text-[var(--color-badge)] text-md flex items-center h-[40px]">Agotado</span>
                ) : (
                  <>
                    <span>$ {product.price.toLocaleString()}</span>
                    <IconButton 
                      onClick={(e) => handleAddToCart(e, product)}
                      sx={{ '&:hover': { backgroundColor: 'var(--color-select)',} }}
                    >
                      <Badge
                        badgeContent={getProductQuantity(product.id)}
                        invisible={getProductQuantity(product.id) == 0}
                        sx={{
                          "& .MuiBadge-badge": {  // Clase interna del badge
                            backgroundColor: "var(--color-badge)",
                            color: 'white',
                          },
                        }}
                      >
                        <AddIcon sx={{color: 'var(--color-navbar-bg)'}}/>
                      </Badge>
                    </IconButton>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}