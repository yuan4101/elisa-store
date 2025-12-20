"use client";

import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/producto/components/ProductDetails";
import { useProducts } from "@/features/producto/hooks/useProducts";
import { Product } from "@/features/producto/types/product";
import { useParams } from "next/navigation";

export default function ProductPageClient() {
  const params = useParams();
  const sku = params.sku as string;
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 pt-1 min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text)]">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-3 pt-1 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          Error al cargar el producto
        </div>
      </div>
    );
  }

  const product = products.find((p: Product) => p.sku === sku);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
