"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getProductImageUrl,
  DEFAULT_PLACEHOLDER,
} from "../utils/productImageUrl";
import { ImageSizeValue } from "@/features/producto/types/imageSize";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true);
      }, 2000 * (intentos + 1));
    } else {
      img.src = DEFAULT_PLACEHOLDER;
      img.classList.add("p-4", "opacity-70");
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full aspect-square bg-[var(--color-card-bg)]">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <Image
        key={imageUrl}
        src={imageUrl}
        unoptimized
        alt={productName}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
