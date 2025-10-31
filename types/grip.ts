export const GripEnum = {
  MICRO: 'Micro',
  BAJO: 'Bajo',
  MEDIO: 'Medio',
  ALTO: 'Alto',
  SIN_DEFINIR: 'Sin definir'
} as const;

export type Grip = (typeof GripEnum)[keyof typeof GripEnum];

export const GripEnumOptions = Object.values(GripEnum).map(value => ({
  value: value,
  label: value
}));