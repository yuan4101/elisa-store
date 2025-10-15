import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { errorMessage } from "@/utils/errorMessage";

// PRODUCTION
const storage = "Productos";

// TEST
//const storage = "Productos-test";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Usa service role para bypasear RLS
);

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("sku");

    if (!sku) {
      return NextResponse.json({ error: "SKU es requerido" }, { status: 400 });
    }

    const fileName = `${sku}.webp`;
    const errors: string[] = [];

    // Eliminar imagen lg
    const { error: errorLg } = await supabase.storage
      .from("product-images")
      .remove([`${storage}/lg/${fileName}`]);

    if (errorLg) {
      console.error("Error al eliminar lg:", errorLg);
      errors.push(`lg: ${errorLg.message}`);
    }

    // Eliminar imagen md
    const { error: errorMd } = await supabase.storage
      .from("product-images")
      .remove([`${storage}/md/${fileName}`]);

    if (errorMd) {
      console.error("Error al eliminar md:", errorMd);
      errors.push(`md: ${errorMd.message}`);
    }

    // Eliminar imagen sm
    const { error: errorSm } = await supabase.storage
      .from("product-images")
      .remove([`${storage}/sm/${fileName}`]);

    if (errorSm) {
      console.error("Error al eliminar sm:", errorSm);
      errors.push(`sm: ${errorSm.message}`);
    }

    // Si hubo errores pero no en todas, retornar éxito parcial
    if (errors.length > 0 && errors.length < 3) {
      return NextResponse.json({
        success: true,
        message: "Algunas imágenes no se pudieron eliminar",
        errors,
      });
    }

    // Si todas fallaron, retornar error
    if (errors.length === 3) {
      return NextResponse.json(
        { error: "No se pudieron eliminar las imágenes", details: errors },
        { status: 500 }
      );
    }

    // Todo exitoso
    return NextResponse.json({
      success: true,
      message: "Imágenes eliminadas exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar imágenes:", error);
    return NextResponse.json(
      { error: errorMessage(error) || "Error al eliminar imágenes" },
      { status: 500 }
    );
  }
}
