import { useState } from "react";
import {Product} from "@/features/producto/types/product";
import { GripEnum } from "@/types/grip";
import { SeasonEnum } from "@/types/season";

interface UseProductFormProps {
  product: Product | null;
}

export function useProductForm({ product }: UseProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id" | "imagePath" | "creationDate" | "type">>({
    sku: product?.sku || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    discountedPrice: product?.discountedPrice || undefined || 0,
    stock: product?.stock || 0,
    grip: product?.grip || GripEnum.SIN_DEFINIR,
    season: product?.season || SeasonEnum.SIN_DEFINIR,
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
      imagePath: `/${formData.sku}.webp`,
    };

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
