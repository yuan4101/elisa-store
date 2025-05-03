export interface Product {
  id: string;
  name: string;
  description: string;
  grip: string;
  price: number;
  stock: number;
  image_path: string | "/icons/file.svg";
}