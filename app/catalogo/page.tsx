"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import Product, { SeasonType } from "../types/product";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { errorMessage } from "../lib/utilities";
import DropdownProducts from "../components/catalogo/dropdownProducts";
import ProductCard from "../components/catalogo/productCard";

type GripValue = 'all' | 'mi' | 'ba' | 'me' | 'metoal' | 'al';
type PriceValue = 'all' | 'metoma' | 'matome';

interface Filters {
  grip: GripValue;
  price: PriceValue;
}

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loveProducts, setLoveProducts] = useState<Product[]>([]);
  const [halloweenProducts, setHalloweenProducts] = useState<Product[]>([]);
  const [christmasProducts, setChristmasProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredLoveProducts, setFilteredLoveProducts] = useState<Product[]>([]);
  const [/*filteredHalloweenProducts*/, setFilteredHalloweenProducts] = useState<Product[]>([]);
  const [/*filteredChristmasProducts*/, setFilteredChristmasProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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

  const applyFilters = useCallback((productsArray: Product[]) => {
    let result = [...productsArray];
    
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
    
    return result;
  }, [filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        
        const data = await response.json();
        const visibleProducts = data.filter((product: Product) => product.visible == true).sort((actual: Product, siguiente: Product) => {
          return actual.name.localeCompare(siguiente.name);
        });
        const productsLove = visibleProducts.filter((product: Product) => product.season == SeasonType.AmorAmistad);
        const productsHalloween = visibleProducts.filter((product: Product) => product.season == SeasonType.Halloween);
        const productsChristmas = visibleProducts.filter((product: Product) => product.season == SeasonType.Navidad);
        const visibleProductsNoSeason = visibleProducts.filter((product: Product) => product.season == SeasonType.NoEspecificado)
        const productsWithStock = visibleProductsNoSeason.filter((product: Product) => product.stock > 0);
        const productsWithoutStock = visibleProductsNoSeason.filter((product: Product) => product.stock == 0); 
        const orderedData = [...productsWithStock, ...productsWithoutStock];

        // Setear los productos originales
        setProducts(orderedData);
        setLoveProducts(productsLove);
        setHalloweenProducts(productsHalloween);
        setChristmasProducts(productsChristmas);
        
        // Inicializar los productos filtrados
        setFilteredProducts(orderedData);
        setFilteredLoveProducts(productsLove);
        setFilteredHalloweenProducts(productsHalloween);
        setFilteredChristmasProducts(productsChristmas);
      } catch (eventError) {
        setError(errorMessage(eventError));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Aplicar filtros a cada sección
    setFilteredProducts(applyFilters(products));
    setFilteredLoveProducts(applyFilters(loveProducts));
    setFilteredHalloweenProducts(applyFilters(halloweenProducts));
    setFilteredChristmasProducts(applyFilters(christmasProducts));
  }, [applyFilters, products, loveProducts, halloweenProducts, christmasProducts]);

  const handleGripFilter = (filterType: GripValue) => {
    setFilters(prev => ({...prev, grip: filterType}));
  };

  const handlePriceFilter = (filterType: PriceValue) => {
    setFilters(prev => ({...prev, price: filterType}));
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
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 pb-5">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>

      <DropdownProducts products={filteredLoveProducts} title="Amor y amistad"/>

      {/*
      <DropdownProducts products={filteredHalloweenProducts} title="Halloween"/>
      <DropdownProducts products={filteredChristmasProducts} title="Navidad"/>
      */}
      
    </div>
  );
}