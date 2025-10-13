import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/producto/components/ProductDetails";
import { getProductById } from "@/features/producto/services/productService";
import { generateProductMetadata } from "@/features/producto/utils/productMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  return generateProductMetadata(product);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
