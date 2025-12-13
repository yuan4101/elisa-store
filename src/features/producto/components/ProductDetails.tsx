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

  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-3 pt-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
        <div className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-md relative">
          {hasDiscount && (
            <div className="absolute top-4 right-4 z-10 bg-[var(--color-button-pink)] text-white px-4 py-2 rounded-lg text-lg font-bold shadow-md">
              -{discountPercentage}%
            </div>
          )}
          <ProductImage
            imagePath={product.imagePath}
            imageSize={ImageSize.LARGE}
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
            <div>
              <p className="text-xl font-semibold">Precio:</p>
              {hasDiscount ? (
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-lg text-gray-500 line-through">
                    {formatPriceCOP(product.price)}
                  </span>
                  <span className="text-2xl font-bold text-[var(--color-button-pink)]">
                    {formatPriceCOP(product.discountedPrice)}
                  </span>
                  <span className="bg-[var(--color-button-pink)] text-white px-2 py-1 rounded text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-[var(--color-navbar-bg)]">
                  {formatPriceCOP(product.price)}
                </span>
              )}
            </div>
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
