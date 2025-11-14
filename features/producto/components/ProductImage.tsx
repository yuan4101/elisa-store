"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getProductImageUrl,
  DEFAULT_PLACEHOLDER,
} from "../utils/productImageUrl";
import { ImageSizeValue } from "@/features/producto/types/imageSize";

interface ProductImageProps {
  imagePath: string | null | undefined;
  imageSize: ImageSizeValue;
  productName: string;
  priority?: boolean;
}

export function ProductImage({
  imagePath,
  imageSize,
  productName,
  priority = false,
}: ProductImageProps) {
  const [imageUrl, setImageUrl] = useState(() =>
    getProductImageUrl(imagePath, imageSize)
  );
  const [intentos, setIntentos] = useState(0);
  const MAX_INTENTOS = 3;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;

    if (intentos < MAX_INTENTOS && imagePath) {
      setTimeout(() => {
        const baseUrl = getProductImageUrl(imagePath, imageSize);
        const urlConCacheBusting = `${baseUrl}${
          baseUrl.includes("?") ? "&" : "?"
        }cb=${Date.now()}`;
        setImageUrl(urlConCacheBusting);
        setIntentos((prev) => prev + 1);
      }, 2000 * (intentos + 1));
    } else {
      img.src = DEFAULT_PLACEHOLDER;
      img.classList.add("p-4", "opacity-70");
    }
  };

  return (
    <div className="relative w-full aspect-square bg-[var(--color-card-bg)]">
      <Image
        key={imageUrl}
        src={imageUrl}
        unoptimized
        alt={productName}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
        onError={handleError}
      />
    </div>
  );
}
