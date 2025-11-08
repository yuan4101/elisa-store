export const ImageSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type ImageSizeValue = (typeof ImageSize)[keyof typeof ImageSize];