import { GripType } from "@/features/producto/types/product";

export const GripFilter = {
  All: "Todos los agarres",
  Micro: GripType.Micro,
  Bajo: GripType.Bajo,
  Medio: GripType.Medio,
  MedioAlto: GripType.MedioAlto,
  Alto: GripType.Alto,
} as const;

export type GripFilter = (typeof GripFilter)[keyof typeof GripFilter];

export enum PriceSort {
  None = "Sin orden",
  LowToHigh = "Menor a mayor",
  HighToLow = "Mayor a menor",
}

export enum AlphabetSort {
  None = "Sin orden",
  AToZ = "A - Z",
  ZToA = "Z - A",
}

export interface ProductFilters {
  grip: GripFilter;
  priceSort: PriceSort;
  alphabetSort: AlphabetSort;
}

export const DEFAULT_FILTERS: ProductFilters = {
  alphabetSort: AlphabetSort.AToZ,
  grip: GripFilter.All,
  priceSort: PriceSort.None,
};
