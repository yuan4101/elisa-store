"use client";

import { Product } from "@/features/producto/types/product";
import { ImageSize } from "@/features/producto/types/imageSize";
import { NotificationType } from "@/features/notification/context/NotificationContext";
import { useCart } from "@/features/shoppingCart/hooks/useCart";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { getProductImageUrl } from "@/features/producto/utils/productImageUrl";
import { getStockNotificationMessage } from "@/utils/stockMessages";

export function useAddToCart() {
  const { addToCart, getProductQuantity } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    const availableStock = product.stock - getProductQuantity(product.id);

    if (availableStock === 0) {
      showNotification({
        message: getStockNotificationMessage(product.stock),
        type: NotificationType.Warning,
        duration: 3000,
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImageUrl(product.imagePath, ImageSize.SMALL),
      stock: product.stock,
    });

    showNotification({
      message: `¡${product.name} agregado al carrito!`,
      type: NotificationType.Success,
    });
  };

  return {
    handleAddToCart,
  };
}
