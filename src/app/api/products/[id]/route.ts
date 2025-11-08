import { supabaseServer} from "../../supabase-server";
import { Product } from "@/features/producto/types/product";
import { NextRequest, NextResponse } from "next/server";
import { errorMessage } from "@/utils/errorMessage";

// PATCH /api/products/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // Validación: No se puede cambiar el ID
    if (updates.id && updates.id !== id) {
      return NextResponse.json(
        { error: "No se puede cambiar el ID del producto" },
        { status: 400 }
      );
    }

    // Actualizar el producto
    const { data, error } = await supabaseServer
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseServer.from("products").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      message: `Producto con ID '${id}' eliminado correctamente`,
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

// GET /api/products/:id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: product, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("id", id)
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
