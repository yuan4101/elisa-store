export const TypeEnum = {
  HAIRCLIP: 'Hairclip',
  PEINETA: 'Peineta',
  HAIRSTICK: 'Hairstick',
  PINZA: 'Pinza',
} as const;

export type Type = (typeof TypeEnum)[keyof typeof TypeEnum];

export const TypeEnumOptions = Object.values(TypeEnum).map(value => ({
  value: value,
  label: value
}));