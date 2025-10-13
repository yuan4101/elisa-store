import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../supabase-server";
import { errorMessage } from "@/utils/errorMessage";

const TABLE = "products_duplicate";

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

    // Validaciones
    if (!productData.id) {
      return NextResponse.json(
        { error: "El ID del producto es obligatorio" },
        { status: 400 }
      );
    }

    if (productData.id.includes(" ")) {
      return NextResponse.json(
        { error: "El ID no puede contener espacios" },
        { status: 400 }
      );
    }

    // Verificar que el ID no exista
    const { count } = await supabaseServer
      .from(TABLE)
      .select("*", { count: "exact" })
      .eq("id", productData.id);

    if (count && count > 0) {
      return NextResponse.json(
        { error: "El ID ya está en uso" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from(TABLE)
      .insert([productData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
