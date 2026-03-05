import { useNavigation } from "@/hooks/useNavigation";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/features/shoppingCart/hooks/useCart";
import { Product } from "../types/product";

export function useProductCard(product: Product, index: number) {
  const { goProduct } = useNavigation();
  const { handleAddToCart } = useAddToCart();
  const { getProductQuantity } = useCart();

  const quantity = getProductQuantity(product.id);
  const isPriority = index < 15;

  const discountPercentage = product.discountedPrice
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;
  const hasStock = product.stock > 0;

  function isNewProduct(creationDate: string, diasParaSerNuevo = 30): boolean {
    const [year, month, day] = creationDate.split("-").map(Number);
    const fechaCreacion = new Date(year, month - 1, day);
    const fechaActual = new Date();
    fechaCreacion.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);
    const diffEnDias = Math.floor(
      (fechaActual.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffEnDias < diasParaSerNuevo;
  }

  const isNew = isNewProduct(product.creationDate, 30);

  return {
    quantity,
    isPriority,
    discountPercentage,
    hasDiscount,
    hasStock,
    isNew,
    goProduct: () => goProduct(product.sku),
    addToCart: (e: React.MouseEvent) => handleAddToCart(e, product),
  };
}
