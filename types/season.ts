export const SeasonEnum = {
  AMOR_AMISTAD: 'Amor y amistad',
  HALLOWEEN: 'Halloween',
  NAVIDAD: 'Navidad',
  SIN_DEFINIR: 'Sin definir',
} as const;

export type Season = (typeof SeasonEnum)[keyof typeof SeasonEnum];

export const SeasonEnumOptions = Object.values(SeasonEnum).map(value => ({
  value: value,
  label: value
}));