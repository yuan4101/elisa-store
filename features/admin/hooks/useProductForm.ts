import { useState } from "react";
import {
  Product,
  GripType,
  SeasonType,
} from "@/features/producto/types/product";

interface UseProductFormProps {
  product: Product | null;
}

export function useProductForm({ product }: UseProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id" | "imagePath">>({
    sku: product?.sku || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    grip: product?.grip || GripType.NoEspecificado,
    season: product?.season || SeasonType.NoEspecificado,
    visible: product?.visible ?? false,
  });

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildProductData = (): Partial<Product> => {
    const data: Partial<Product> = {
      ...formData,
      imagePath: `/${formData.sku}.webp`, // Usar SKU para el nombre de imagen
    };

    // Si estamos editando, incluir el ID
    if (product) {
      data.id = product.id;
    }

    return data;
  };

  return {
    formData,
    updateField,
    buildProductData,
  };
}
