'use client';

import React, { createContext, useContext, useState } from 'react';

export interface cartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

interface cartContextProps {
  cartItems: cartItem[];
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  getProductQuantity: (productId: string) => number;
  addToCart: (item: cartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<cartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados.
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Contador del carrito.
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Alterna el estado del carrito (Abierto / Cerrado).
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Obtiene la cantidad de un item en el carrito.
  const getProductQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Agrega un item al carrito, de existir, actualiza su cantidad con el stock disponible como limite.
  const addToCart = (newItem: cartItem) => {
    setCartItems(prev => {
      const itemIndex = prev.findIndex(item => item.id === newItem.id);
      if (itemIndex === -1) {
        return [...prev, newItem];
      } else {
        const updatedCart = [...prev];
        updatedCart[itemIndex] = {...prev[itemIndex], quantity: Math.min(prev[itemIndex].quantity + 1, prev[itemIndex].stock)};
        return updatedCart;
      }
    });
  };

  // Actualiza la cantidad de un item en el carrito, de ser 0, se elimina.
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setCartItems(prev => {
      const itemIndex = prev.findIndex(item => item.id === id);
      if (itemIndex === -1) return prev;
      if (newQuantity === 0) return removeItemById(prev, id);
      const updatedCart = [...prev];
      updatedCart[itemIndex] = {...prev[itemIndex], quantity: Math.min(newQuantity, prev[itemIndex].stock)};
      return updatedCart;
    });
  };

  // Elimina un item del carrito.
  const removeFromCart = (id: string) => {
    setCartItems(prev => removeItemById(prev, id));
  };

  // (Utilitaria) Eliminar item por id.
  const removeItemById = (prev: cartItem[], id: string) => {
    const itemIndex = prev.findIndex(item => item.id === id);
    if (itemIndex === -1) return prev;
    const updatedCart = [...prev];
    updatedCart.splice(itemIndex, 1);
    return updatedCart;
  };

  // Limpiar el carrito
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        getProductQuantity,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): cartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};