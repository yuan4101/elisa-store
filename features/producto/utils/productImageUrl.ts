import { ImageSize } from "../types/imageSize";

const IMAGE_SIZE_URLS = {
  [ImageSize.Small]: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SMALL_IMAGES,
  [ImageSize.Medium]: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_MEDIUM_IMAGES,
  [ImageSize.Large]: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_LARGE_IMAGES,
} as const;

export const DEFAULT_PLACEHOLDER = "/icons/file.svg";

export function getProductImageUrl(
  imagePath: string | null | undefined,
  size: ImageSize
): string {
  if (!imagePath) {
    return DEFAULT_PLACEHOLDER;
  }

  const baseUrl = IMAGE_SIZE_URLS[size];

  return baseUrl ? `${baseUrl}${imagePath}` : DEFAULT_PLACEHOLDER;
}
