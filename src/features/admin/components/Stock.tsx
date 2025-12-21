"use client";

import { useEffect } from "react";
import { useAdminProducts } from "@/features/admin/hooks/useAdminProductsPro";
import { SearchBox } from "@/features/admin/components/SearchBox";
import { ProductList } from "@/features/admin/components/ProductList";

export default function AdminStockPage() {
  const {
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleStockChange,
  } = useAdminProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="flex justify-between items-center mb-5 gap-2">
        <span className="text-2xl md:text-3xl font-bold text-gray-800">
          Administrar Stock
        </span>
      </div>

      <div className="mb-6">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <ProductList
        products={products}
        onStockChange={handleStockChange}
        showEditButton={false}
      />
    </div>
  );
}
