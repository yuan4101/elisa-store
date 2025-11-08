export const PriceSort = {
  NONE: 'Sin orden',
  LOW_HIGH: 'Menor a mayor',
  HIGH_LOW: 'Mayor a menor',
} as const;

export type PriceSortValue = (typeof PriceSort)[keyof typeof PriceSort];

export const PriceSortOptions = Object.values(PriceSort);