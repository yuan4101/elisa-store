import { Metadata } from "next";
import { Product } from "../types/product";
import { getProductImageUrl } from "./productImageUrl";
import { ImageSize } from "../types/imageSize";

export function generateProductMetadata(product: Product | null): Metadata {
  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "Este producto no existe en el catálogo",
    };
  }

  const imageUrl = getProductImageUrl(product.imagePath, ImageSize.MEDIUM);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}
