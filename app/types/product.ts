export default interface Product {
  id: string;
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
  MedioAlto = "Medio a alto",
  Alto = "Alto",
  NoEspecificado = "Sin definir",
}

export enum SeasonType {
  AmorAmistad = "Amor y amistad",
  Halloween = "Halloween",
  Navidad = "Navidad",
  NoEspecificado = "Sin definir",
}