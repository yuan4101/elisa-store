import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, TABLE } from "../supabase-server";
import { errorMessage } from "@/utils/errorMessage";

// GET /api/products
export async function GET() {
  try {
    const { data, error } = await supabaseServer.from(TABLE).select("*");
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    // Validar SKU
    if (!productData.sku) {
      return NextResponse.json(
        { error: "El SKU del producto es obligatorio" },
        { status: 400 }
      );
    }

    if (productData.sku.includes(" ")) {
      return NextResponse.json(
        { error: "El SKU no puede contener espacios" },
        { status: 400 }
      );
    }

    // Validar nombre
    if (!productData.name) {
      return NextResponse.json(
        { error: "El nombre del producto es obligatorio" },
        { status: 400 }
      );
    }

    // Verificar que el SKU no exista
    const { count: skuCount } = await supabaseServer
      .from(TABLE)
      .select("*", { count: "exact" })
      .eq("sku", productData.sku);

    if (skuCount && skuCount > 0) {
      return NextResponse.json(
        { error: "Ya existe un producto con ese SKU" },
        { status: 400 }
      );
    }

    // Verificar que el nombre no exista
    const { count: nameCount } = await supabaseServer
      .from(TABLE)
      .select("*", { count: "exact" })
      .eq("name", productData.name);

    if (nameCount && nameCount > 0) {
      return NextResponse.json(
        { error: "Ya existe un producto con ese nombre" },
        { status: 400 }
      );
    }

    const { ...dataWithoutId } = productData;

    const { data, error } = await supabaseServer
      .from(TABLE)
      .insert([dataWithoutId])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
