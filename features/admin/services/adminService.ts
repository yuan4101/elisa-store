import { Product } from "@/features/producto/types/product";
import { getBaseUrl } from "@/services/baseUrl";

/**
 * Crea un nuevo producto
 * @param {Omit<Product, "id" | "imagePath">} productData - Datos del producto sin ID ni imagePath
 * @returns {Promise<Product>} Producto creado
 */
export async function createProduct(
  productData: Omit<Product, "id" | "imagePath">
): Promise<Product> {
  const response = await fetch(`${getBaseUrl()}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al crear el producto");
  }

  return response.json();
}

/**
 * Actualiza un producto existente
 * @param {string} id - ID del producto a actualizar
 * @param {Partial<Product>} productData - Datos a actualizar
 * @returns {Promise<Product>} Producto actualizado
 */
export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<Product> {
  const response = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al actualizar el producto");
  }

  return response.json();
}

/**
 * Elimina un producto
 * @param {string} id - ID del producto a eliminar
 * @returns {Promise<void>}
 */
export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al eliminar el producto");
  }
}
