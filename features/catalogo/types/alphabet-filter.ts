export const AlphabetSort = {
  NONE: 'Sin orden',
  A_Z: 'A - Z',
  Z_A: 'Z - A',
} as const;

export type AlphabetSortValue = (typeof AlphabetSort)[keyof typeof AlphabetSort];