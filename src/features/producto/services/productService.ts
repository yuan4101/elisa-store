import { Product } from "../types/product";
import { getBaseUrl } from "@/services/baseUrl";

export async function getProductBySku(sku: string): Promise<Product | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/products/sku/${sku}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const product = await res.json();
    return product;
  } catch {
    return null;
  }
}
