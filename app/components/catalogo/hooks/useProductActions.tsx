"use client";

import Product from '@/app/types/product';
import { NotificationType } from '@/app/types/notification';
import { useCart } from '@/app/context/shoppingCartContext';
import { useNotification } from '@/app/context/notificationContext';

export default function useProductActions() {
  const { addToCart, getProductQuantity } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    const availableStock = product.stock - getProductQuantity(product.id);
    
    if (availableStock === 0) {
      showNotification({
        message: `Disponibilidad: ${product.stock} unidad${product.stock !== 1 ? 'es' : ''} en stock`,
        type: NotificationType.Warning,
        duration: 3000,
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imagePath ? 
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SMALL_IMAGES}${product.imagePath}` : 
        '/icons/file.svg',
      stock: product.stock,
      quantity: 1,
    });

    showNotification({
      message: `¡${product.name} agregado al carrito!`,
      type: NotificationType.Success,
    });
  };

  return {
    handleAddToCart,
    getProductQuantity,
  };
}