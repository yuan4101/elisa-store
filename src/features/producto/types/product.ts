import { Grip } from "@/types/grip";
import { Season } from "@/types/season";

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  grip: Grip;
  price: number;
  discountedPrice: number;
  stock: number;
  type: string;
  imagePath: string;
  season: Season;
  visible: boolean;
  creationDate: string;
}