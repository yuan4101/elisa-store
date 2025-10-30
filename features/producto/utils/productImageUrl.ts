import { ImageSizeValue, ImageSize } from "../types/imageSize";

const IMAGE_SIZE_URLS = {
  [ImageSize.SMALL]: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/sm`,
  [ImageSize.MEDIUM]: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/md`,
  [ImageSize.LARGE]: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/lg`,
} as const;

export const DEFAULT_PLACEHOLDER = "/icons/file.svg";

export function getProductImageUrl(
  imagePath: string | null | undefined,
  size: ImageSizeValue
): string {
  if (!imagePath) {
    return DEFAULT_PLACEHOLDER;
  }

  const baseUrl = IMAGE_SIZE_URLS[size];

  return baseUrl ? `${baseUrl}${imagePath}` : DEFAULT_PLACEHOLDER;
}
