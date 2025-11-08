export function formatPriceCOP(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

export function sanitizeProductId(value: string): string {
  return value.replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
}
