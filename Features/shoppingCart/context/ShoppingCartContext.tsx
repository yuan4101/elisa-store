"use client";

import React, { createContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface CartContextProps {
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  getProductQuantity: (productId: string) => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === newItem.id);
      if (itemIndex === -1) {
        return [...prev, newItem];
      } else {
        const updatedCart = [...prev];
        updatedCart[itemIndex] = {
          ...prev[itemIndex],
          quantity: Math.min(
            prev[itemIndex].quantity + 1,
            prev[itemIndex].stock
          ),
        };
        return updatedCart;
      }
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prev;
      if (newQuantity === 0) return removeItemById(prev, id);

      const updatedCart = [...prev];
      updatedCart[itemIndex] = {
        ...prev[itemIndex],
        quantity: Math.min(newQuantity, prev[itemIndex].stock),
      };
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => removeItemById(prev, id));
  };

  const removeItemById = (prev: CartItem[], id: string) => {
    const itemIndex = prev.findIndex((item) => item.id === id);
    if (itemIndex === -1) return prev;

    const updatedCart = [...prev];
    updatedCart.splice(itemIndex, 1);
    return updatedCart;
  };

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
