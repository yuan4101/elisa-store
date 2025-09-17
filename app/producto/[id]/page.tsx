import { Metadata } from "next";
import ProductPage from "./productPage";
import { Product } from "../../types/product";

function getBaseUrl(): string {
  // 1. Si tienes un dominio personalizado en producción
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // 2. Ip de red local
  if (process.env.IP && process.env.PORT) {
    return `http://${process.env.IP}:${process.env.PORT}`
  }

  // 3. Fallback para desarrollo local
  return 'http://localhost:3000';
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const products: Product[] = await res.json();
    return products.find((p) => p.id === id) || null;
  } catch {
    return null;
  }
}

// Función compartida para ambos
async function getProductData(params: Promise<{ id: string }>) {
  const { id } = await params;
  const product = await getProduct(id);
  return { product, id };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { product } = await getProductData(params);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "Este producto no existe en el catálogo",
    };
  }

  const imageUrl = product.image_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/md/${product.image_path}`
    : "/icons/file.svg";

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { product } = await getProductData(params);
  return <ProductPage productData={product} />;
}