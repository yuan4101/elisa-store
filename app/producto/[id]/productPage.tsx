"use client";

import Product from "../../types/product";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useProductActions from "@/app/components/catalogo/hooks/useProductActions";
import useNavigation from "@/app/components/utils/useNavigation";

export default function ProductPage({ productData }: { productData: Product | null }) {
  const [product, setProduct] = useState<Product | null>(productData);

  const { handleAddToCart } = useProductActions();
  const { goCatalog } = useNavigation();

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-3 py-10">
        <div className="text-center">Producto no disponible</div>
        <button
          onClick={goCatalog}
          className="mt-4 inline-block text-pink-600 hover:underline cursor-pointer shadow-sm"
        >
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
        {/* Imagen del producto */}
        <div className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-md">
          <div className="relative w-full aspect-square">
            <Image
              src={
                product.imagePath
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_LARGE_IMAGES}${product.imagePath}`
                  : "/icons/file.svg"
              }
              unoptimized
              alt={product.name}
              fill
              priority={true}
              className="object-cover rounded-t-2xl shadow-sm"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/icons/file.svg";
                (e.target as HTMLImageElement).classList.add(
                  "p-4",
                  "opacity-70"
                );
              }}
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="space-y-6 md:pt-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            {product.name}
          </h1>

          <p className="text-lg text-[var(--color-text)]">
            {product.description}
          </p>

          <div className="space-y-2">
            <p className="text-xl font-semibold">
              Precio:{" "}
              <span className="text-[var(--color-navbar-bg)]">
                ${product.price.toLocaleString()}
              </span>
            </p>
            <p>Disponibles: {product.stock}</p>
            <p>Agarre: {product.grip}</p>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {product.stock <= 0 ? (
              <button className="bg-[var(--color-card)] text-red-500 text-xl px-6 py-3 rounded-lg">
                Agotado
              </button>
            ) : (
              <button
                className="shadow-sm bg-[var(--color-badge-light)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-badge)] transition cursor-pointer"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Agregar al carrito
              </button>
            )}

            <button
              onClick={goCatalog}
              className="shadow-sm bg-[var(--color-button-pink-light)] text-white px-3 py-3 rounded-lg hover:bg-[var(--color-button-pink)] transition cursor-pointer"
            >
              ← Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}