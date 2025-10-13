"use client";

import { useState, useEffect } from "react";
import {
  Product,
  SeasonType,
  GripType,
} from "@/features/producto/types/product";

interface UseProductFormProps {
  product?: Product | null;
}

export function useProductForm({ product }: UseProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "imagePath">>({
    id: "",
    name: "",
    grip: GripType.NoEspecificado,
    price: 0,
    stock: 0,
    description: "",
    season: SeasonType.NoEspecificado,
    visible: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        grip: product.grip,
        price: product.price,
        stock: product.stock,
        description: product.description,
        season: product.season,
        visible: product.visible,
      });
    }
  }, [product]);

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildProductData = (): Partial<Product> => ({
    ...formData,
    imagePath: `/${formData.id}.webp`,
  });

  return {
    formData,
    updateField,
    buildProductData,
  };
}
