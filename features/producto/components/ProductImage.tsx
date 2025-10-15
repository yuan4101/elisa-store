import Image from "next/image";
import {
  getProductImageUrl,
  DEFAULT_PLACEHOLDER,
} from "../utils/productImageUrl";
import { ImageSize } from "../types/imageSize";

interface ProductImageProps {
  imagePath: string | null | undefined;
  imageSize: ImageSize;
  productName: string;
  priority?: boolean;
}

export function ProductImage({
  imagePath,
  imageSize,
  productName,
  priority = false,
}: ProductImageProps) {
  const imageUrl = getProductImageUrl(imagePath, imageSize);
  console.log(imageUrl);

  return (
    <div className="relative w-full aspect-square bg-[var(--color-card-bg)]">
      <Image
        src={imageUrl}
        unoptimized
        alt={productName}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = DEFAULT_PLACEHOLDER;
          img.classList.add("p-4", "opacity-70");
        }}
      />
    </div>
  );
}
