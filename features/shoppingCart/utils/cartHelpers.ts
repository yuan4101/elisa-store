import { CartItem } from "../context/ShoppingCartContext";

export function generateWhatsAppMessage(
  cartItems: CartItem[],
  precioTotal: number
): string {
  const productDetails = cartItems
    .map(
      (item) =>
        `*${item.name}* (Cantidad: ${item.quantity}) - $${(
          item.price * item.quantity
        ).toLocaleString()}`
    )
    .join("\n");

  const message = `Hola 🧡 Ya encontré los hairclips que van perfecto conmigo. 
Aquí están los detalles de mi carrito, ¿me confirmas mi pedido? 🌸\n\n${productDetails}\n\nTotal: $${precioTotal.toLocaleString()}`;

  return `https://wa.me/573016980292?text=${encodeURIComponent(message)}`;
}

export function calculateTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
