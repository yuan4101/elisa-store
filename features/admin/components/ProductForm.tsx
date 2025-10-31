import { Product } from "@/features/producto/types/product";
import { Grip, GripEnumOptions } from "@/types/grip";
import { Season, SeasonEnumOptions } from "@/types/season";

import {
  TextInput,
  SelectInput,
  NumberInput,
  TextareaInput,
  CheckboxInput,
} from "./Input";
import { formatPriceCOP, sanitizeProductId } from "@/utils/formatters";
import { getStockMessage } from "@/utils/stockMessages";

interface ProductFormProps {
  formData: Omit<Product, "id" | "imagePath">;
  onFieldChange: <K extends keyof Omit<Product, "id" | "imagePath">>(
    field: K,
    value: Omit<Product, "id" | "imagePath">[K]
  ) => void;
}

export function ProductForm({ formData, onFieldChange }: ProductFormProps) {
  return (
    <div className="space-y-4">
      <CheckboxInput
        id="visible-create"
        label="Producto visible en la tienda"
        checked={formData.visible}
        onChange={(checked) => onFieldChange("visible", checked)}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-5">
          <TextInput
            label="SKU"
            hint="(Código)"
            value={formData.sku}
            onChange={(value) => onFieldChange("sku", sanitizeProductId(value))}
          />
          <TextInput
            label="Nombre"
            value={formData.name}
            onChange={(value) => onFieldChange("name", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <SelectInput
            label="Agarre"
            value={formData.grip}
            onChange={(value) => onFieldChange("grip", value as Grip)}
            options={GripEnumOptions}
          />
          <SelectInput
            label="Temporada"
            value={formData.season}
            onChange={(value) => onFieldChange("season", value as Season)}
            options={SeasonEnumOptions}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <NumberInput
            label="Precio"
            hint={`(${formatPriceCOP(formData.price)})`}
            value={formData.price}
            onChange={(value) => onFieldChange("price", value)}
            allowDecimals={false}
          />
          <NumberInput
            label="Stock"
            hint={`(${getStockMessage(formData.stock)})`}
            value={formData.stock}
            onChange={(value) => onFieldChange("stock", value)}
            allowDecimals={false}
          />
        </div>
      </div>
      <TextareaInput
        label="Descripción"
        value={formData.description}
        onChange={(value) => onFieldChange("description", value)}
        minRows={2}
      />
    </div>
  );
}
