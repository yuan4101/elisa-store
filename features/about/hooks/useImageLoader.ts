"use client";
import { useState } from "react";

export function useImageLoader() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return { isImageLoaded, handleImageLoad };
}
