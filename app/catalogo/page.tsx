"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import Image from "next/image";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { useCart } from '../context/shoppingCartContext';
import { Notification } from '../components/notification';
import { errorMessage } from "../lib/utilities";

type GripValue = 'all' | 'mi' | 'ba' | 'me' | 'metoal' | 'al';
type PriceValue = 'all' | 'metoma' | 'matome';

interface Filters {
  grip: GripValue;
  price: PriceValue;
}

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, getProductQuantity } = useCart();
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    grip: 'all',
    price: 'all'
  });

  const gripLabels: Record<GripValue, string> = {
    all: 'Agarre',
    mi: 'Micro',
    ba: 'Bajo',
    me: 'Medio',
    metoal: 'Medio a alto',
    al: 'Alto'
  };

  const priceLabels: Record<PriceValue, string> = {
    all: 'Precio',
    metoma: 'Menor a mayor',
    matome: 'Mayor a menor',
  };

  const applyFilters = useCallback(() => {
    let result = [...products];
    
    if (filters.grip !== 'all') {
      switch(filters.grip) {
        case 'mi':
          result = result.filter(product => product.grip === 'Micro');
          break;
        case 'ba':
          result = result.filter(product => product.grip === 'Bajo');
          break;
        case 'me':
          result = result.filter(product => product.grip === 'Medio');
          break;
        case 'metoal':
          result = result.filter(product => product.grip === 'Medio a alto');
          break;
        case 'al':
          result = result.filter(product => product.grip === 'Alto');
          break;
      }
    }
    
    if (filters.price !== 'all') {
      switch(filters.price) {
        case 'metoma':
          result = [...result].sort((a, b) => a.price - b.price);
          break;
        case 'matome':
          result = [...result].sort((a, b) => b.price - a.price);
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [products, filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        
        const data = await response.json();
        const showableData = data.filter((product: Product) => product.grip != 'No especificado').sort((actual: Product, siguiente: Product) => {
          return actual.name.localeCompare(siguiente.name);
        });
        const productsWithStock = showableData.filter((product: Product) => product.stock != 0);
        const productsWithoutStock = showableData.filter((product: Product) => product.stock == 0);
        const orderedData = [...productsWithStock, ...productsWithoutStock];
        setProducts(orderedData);
        setFilteredProducts(orderedData);
      } catch (eventError) {
        setError(errorMessage(eventError));
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

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleGripFilter = (filterType: GripValue) => {
    setFilters(prev => ({...prev, grip: filterType}));
  };

  const handlePriceFilter = (filterType: PriceValue) => {
    setFilters(prev => ({...prev, price: filterType}));
  };

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
      '/icons/file.svg';

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-2">
        <div className="whitespace-nowrap">
          Filtrar por: 
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Dropdown de Agarre */}
          <Menu as="div" className="relative flex-1 min-w-[150px]">
            <MenuButton
              className={`
                w-full px-3 py-2 border rounded
                text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)]
                hover:border-[var(--color-select)] hover:bg-transparent
                transition-colors focus:outline-none
                text-left flex justify-between items-center
              `}
            >
              <span>{gripLabels[filters.grip]}</span>
              <span>▾</span>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems className="absolute left-0 sm:left-auto sm:right-0 z-10 mt-2 w-full sm:w-56 origin-top-right bg-white shadow-lg rounded-md focus:outline-none">
                <div className="py-1 max-h-60 overflow-y-auto">
                  {Object.entries(gripLabels).map(([value, label]) => (
                    <MenuItem key={value}>
                      {({ focus }) => (
                        <button
                          onClick={() => handleGripFilter(value as GripValue)}
                          className={`${
                            focus ? 'bg-[var(--color-select)] text-white' : 'text-gray-900'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          {value === 'all' ? 'Todos los agarres' : label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Dropdown de Precio */}
          <Menu as="div" className="relative flex-1 min-w-[160px]">
            <MenuButton
              className={`
                w-full px-3 py-2 border rounded
                text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)]
                hover:border-[var(--color-select)] hover:bg-transparent
                transition-colors focus:outline-none
                text-left flex justify-between items-center
              `}
            >
              <span>{priceLabels[filters.price]}</span>
              <span>▾</span>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems className="absolute left-0 sm:left-auto sm:right-0 z-10 mt-2 w-full sm:w-56 origin-top-right bg-white shadow-lg rounded-md focus:outline-none">
                <div className="py-1 max-h-60 overflow-y-auto">
                  {Object.entries(priceLabels).map(([value, label]) => (
                    <MenuItem key={value}>
                      {({ focus }) => (
                        <button
                          onClick={() => handlePriceFilter(value as PriceValue)}
                          className={`${
                            focus ? 'bg-[var(--color-select)] text-white' : 'text-gray-900'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          {value === 'all' ? 'Sin orden' : label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Botón Limpiar filtros */}
          {(filters.grip !== 'all' || filters.price !== 'all') && (
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <div className="w-0.5 bg-[var(--color-navbar-bg)] self-stretch hidden sm:block"></div>
              <button
                onClick={() => setFilters({ grip: 'all', price: 'all' })}
                className={`
                  w-full px-4 py-2 border rounded
                  text-[var(--color-navbar-bg)] border-[var(--color-navbar-bg)]
                  hover:border-[var(--color-select)] hover:bg-transparent
                  transition-colors focus:outline-none
                `}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
      
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-10">
          <p>No se encontraron productos con los filtros seleccionados</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {filteredProducts.map((product, index) => (
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
                  unoptimized
                  alt={product.name}
                  fill
                  priority={index < 2}
                  loading={index > 1 ? 'lazy' : 'eager'}
                  className="object-cover rounded-t-2xl"
                  onError={(e) => {
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
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2 rounded-full hover:bg-[var(--color-select)]"
                    >
                      <div className="relative">
                        {getProductQuantity(product.id) > 0 && (
                          <span className="absolute -top-2 -right-2 bg-[var(--color-badge)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {getProductQuantity(product.id)}
                          </span>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[var(--color-navbar-bg)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </button>
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