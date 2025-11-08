"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/product";
import { errorMessage } from "@/utils/errorMessage";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }

      const data = await response.json();
      setProducts(data);
    } catch (eventError) {
      setError(errorMessage(eventError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
