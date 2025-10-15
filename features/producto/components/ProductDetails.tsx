"use client";

import React from "react";
import { Product } from "@/features/producto/types/product";
import { ProductImage } from "@/features/producto/components/ProductImage";
import { ImageSize } from "../types/imageSize";
import { useNavigation } from "@/hooks/useNavigation";
import { useAddToCart } from "@/hooks/useAddToCart";
import { formatPriceCOP } from "@/utils/formatters";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { handleAddToCart } = useAddToCart();
  const { goCatalog } = useNavigation();

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-3 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
        <div className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-md">
          <ProductImage
            imagePath={product.imagePath}
            imageSize={ImageSize.Large}
            productName={product.name}
            priority={true}
          />
        </div>

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
                {formatPriceCOP(product.price)}
              </span>
            </p>
            <p>Disponibles: {product.stock}</p>
            {product.grip && <p>Agarre: {product.grip}</p>}
          </div>

          <div className="flex flex-col gap-4 pt-2">
            {isOutOfStock ? (
              <button
                className="bg-[var(--color-card)] text-red-500 text-xl px-6 py-3 rounded-lg cursor-not-allowed"
                disabled
              >
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
