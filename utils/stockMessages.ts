export function getStockNotificationMessage(stock: number): string {
  const unit = stock === 1 ? "unidad" : "unidades";
  return `Disponibilidad: ${stock} ${unit} en stock`;
}

export function getStockMessage(stock: number): string {
  const unit = stock === 1 ? "unidad" : "unidades";
  return `${stock} ${unit}`;
}
