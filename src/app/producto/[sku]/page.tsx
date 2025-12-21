import { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";

type Props = {
  params: Promise<{ sku: string }>;
};

// ✅ generateMetadata - Server Component
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products/sku/${sku}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        title: "Producto no encontrado",
        description: "Este producto no existe en el catálogo",
      };
    }

    const product = await response.json();

    const imageUrl = product.imagePath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/md/${product.imagePath}`
      : "/icons/file.svg";

    return {
      title: `${product.name} - Elisa & CO`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Error",
      description: "Error al cargar el producto",
    };
  }
}

// ✅ Exporta el Client Component
export default ProductPageClient;
