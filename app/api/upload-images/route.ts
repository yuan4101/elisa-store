import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { errorMessage } from "@/utils/errorMessage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Esta clave bypassa RLS
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sku = formData.get("sku") as string;
    const originalImage = formData.get("original") as Blob;
    const croppedImage = formData.get("cropped") as Blob;
    const thumbnailImage = formData.get("thumbnail") as Blob;

    if (!sku || !originalImage || !croppedImage || !thumbnailImage) {
      return NextResponse.json(
        { error: "Faltan archivos o SKU" },
        { status: 400 }
      );
    }

    const fileName = `${sku}.webp`;

    // Subir imagen original (lg)
    const { error: errorLg } = await supabase.storage
      .from("product-images")
      .upload(`Productos-test/lg/${fileName}`, originalImage, {
        contentType: "image/webp",
        upsert: true,
      });

    if (errorLg) throw errorLg;

    // Subir imagen recortada (md)
    const { error: errorMd } = await supabase.storage
      .from("product-images")
      .upload(`Productos-test/md/${fileName}`, croppedImage, {
        contentType: "image/webp",
        upsert: true,
      });

    if (errorMd) throw errorMd;

    // Subir thumbnail (sm)
    const { error: errorSm } = await supabase.storage
      .from("product-images")
      .upload(`Productos-test/sm/${fileName}`, thumbnailImage, {
        contentType: "image/webp",
        upsert: true,
      });

    if (errorSm) throw errorSm;

    return NextResponse.json({
      success: true,
      message: "Imágenes subidas exitosamente",
    });
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    return NextResponse.json(
      { error: errorMessage(error) || "Error al subir imágenes" },
      { status: 500 }
    );
  }
}
