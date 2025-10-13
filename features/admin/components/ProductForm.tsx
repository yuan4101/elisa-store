import {
  GripType,
  GripValues,
  SeasonType,
  SeasonValues,
  Product,
} from "@/features/producto/types/product";
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
  formData: Omit<Product, "imagePath">;
  onFieldChange: <K extends keyof Omit<Product, "imagePath">>(
    field: K,
    value: Omit<Product, "imagePath">[K]
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
            label="ID"
            hint="(Identificador unico)"
            value={formData.id}
            onChange={(value) => onFieldChange("id", sanitizeProductId(value))}
          />
          <TextInput
            label="Nombre"
            hint="(Vista)"
            value={formData.name}
            onChange={(value) => onFieldChange("name", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <SelectInput
            label="Agarre"
            value={formData.grip}
            onChange={(value) => onFieldChange("grip", value as GripType)}
            options={GripValues}
          />
          <SelectInput
            label="Temporada"
            value={formData.season}
            onChange={(value) => onFieldChange("season", value as SeasonType)}
            options={SeasonValues}
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
