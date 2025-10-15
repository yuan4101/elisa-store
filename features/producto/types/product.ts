export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  grip: GripType;
  price: number;
  stock: number;
  imagePath: string;
  season: SeasonType;
  visible: boolean;
}

export enum GripType {
  Micro = "Micro",
  Bajo = "Bajo",
  Medio = "Medio",
  Alto = "Alto",
  NoEspecificado = "Sin definir",
}

export enum SeasonType {
  AmorAmistad = "Amor y amistad",
  Halloween = "Halloween",
  Navidad = "Navidad",
  NoEspecificado = "Sin definir",
}

export const GripValues = Object.values(GripType).map((value) => ({
  value: value as string,
  label: value as string,
}));

export const SeasonValues = Object.values(SeasonType).map((value) => ({
  value: value as string,
  label: value as string,
}));
