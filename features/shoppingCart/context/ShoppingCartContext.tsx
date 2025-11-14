"use client";

import React, { createContext, useState, useEffect, useRef } from "react";
import { useProducts } from "@/features/producto/hooks/useProducts";

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
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

const CART_STORAGE_KEY = "shoppingCart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const hasValidated = useRef(false);
  const { products } = useProducts();

  useEffect(() => {
    if (
      !products ||
      products.length === 0 ||
      cartItems.length === 0 ||
      hasValidated.current
    )
      return;

    const productMap = new Map(products.map((p) => [p.id, p]));

    const validatedCart = cartItems
      .map((cartItem) => {
        const currentProduct = productMap.get(cartItem.id);

        if (!currentProduct) {
          return null;
        }

        if (currentProduct.stock === 0) {
          return null;
        }

        if (cartItem.quantity > currentProduct.stock) {
          return {
            ...cartItem,
            quantity: currentProduct.stock,
            stock: currentProduct.stock,
          };
        }

        if (cartItem.stock !== currentProduct.stock) {
          return {
            ...cartItem,
            stock: currentProduct.stock,
          };
        }

        return cartItem;
      })
      .filter((item): item is CartItem => item !== null);

    if (JSON.stringify(validatedCart) !== JSON.stringify(cartItems)) {
      setCartItems(validatedCart);
    }

    hasValidated.current = true;
  }, [products, cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      return;
    }
  }, [cartItems]);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const getProductQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === newItem.id);
      if (itemIndex === -1) {
        return [...prev, { ...newItem, quantity: 1 }];
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

  const clearCart = () => {
    setCartItems([]);
    toggleCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        toggleCart,
        getProductQuantity,
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
