// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number; // Agregamos stock
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  getProductQuantity: (productId: string) => number;
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const getProductQuantity = (productId: string) => {
  const item = cartItems.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        // Verifica si la cantidad no supera el stock
        const updatedQuantity = Math.min(existingItem.quantity + newItem.quantity, existingItem.stock);
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: updatedQuantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === id) {
          // Si la cantidad es menor que 1, elimina el producto
          if (newQuantity <= 0) {
            return null;
          }
          // Asegurarse de que la cantidad no supere el stock
          const validQuantity = Math.max(1, Math.min(item.stock, newQuantity));
          return { ...item, quantity: validQuantity };
        }
        return item;
      }).filter(item => item !== null);
      return updatedCart;
    });
  };

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
