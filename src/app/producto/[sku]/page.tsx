import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/producto/components/ProductDetails";
import { getProductBySku } from "@/features/producto/services/productService";
import { generateProductMetadata } from "@/features/producto/utils/productMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProductBySku(sku);
  return generateProductMetadata(product);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProductBySku(sku);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
