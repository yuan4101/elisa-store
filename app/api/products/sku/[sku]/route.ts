import { supabaseServer, TABLE } from "../../../supabase-server";
import { Product } from "@/features/producto/types/product";
import { NextResponse } from "next/server";

// GET /api/products/sku/:sku
export async function GET(
  request: Request,
  { params }: { params: Promise<{ sku: string }> }
) {
  try {
    const { sku } = await params;

    const { data: product, error } = await supabaseServer
      .from(TABLE)
      .select("*")
      .eq("sku", sku)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product as Product);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}
