import { Product } from "@/features/producto/types/product";
import { getBaseUrl } from "@/services/baseUrl";

/**
 * Crea un nuevo producto
 * @param {Omit<Product, "id" | "imagePath">} productData - Datos del producto sin ID ni imagePath
 * @returns {Promise<Product>} Producto creado
 */
export async function createProduct(
  productData: Omit<Product, "id" | "imagePath" | "discountedPrice" | "creationDate">
): Promise<Product> {
  const response = await fetch(`${getBaseUrl()}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({...productData, discountedPrice: null}),
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
 * Elimina un producto y sus imágenes asociadas
 * @param {string} id - ID del producto a eliminar
 * @returns {Promise<void>}
 */
export async function deleteProduct(id: string): Promise<void> {
  // Primero obtener el producto para tener el SKU
  const getResponse = await fetch(`${getBaseUrl()}/api/products/${id}`);

  if (!getResponse.ok) {
    const errorData = await getResponse.json();
    throw new Error(errorData.error || "Error al obtener el producto");
  }

  const product: Product = await getResponse.json();

  // Eliminar el producto de la base de datos
  const deleteResponse = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    method: "DELETE",
  });

  if (!deleteResponse.ok) {
    const errorData = await deleteResponse.json();
    throw new Error(errorData.error || "Error al eliminar el producto");
  }

  // Eliminar las imágenes del storage (no lanzar error si falla)
  if (product?.sku) {
    try {
      const imageResponse = await fetch(
        `${getBaseUrl()}/api/delete-images?sku=${product.sku}`,
        {
          method: "DELETE",
        }
      );

      if (!imageResponse.ok) {
        console.warn(
          "No se pudieron eliminar todas las imágenes, pero el producto fue eliminado"
        );
      } else {
        const result = await imageResponse.json();
        console.log("Imágenes eliminadas:", result);
      }
    } catch (imageError) {
      console.warn("Error al eliminar imágenes:", imageError);
      // No lanzar error aquí, el producto ya fue eliminado exitosamente
    }
  }
}
