import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../supabase-server";
import { errorMessage } from "@/utils/errorMessage";

// PRODUCTION
//const TABLE = "products";

// TEST
const TABLE = "products_duplicate";

/**
 * Obtiene todos los productos desde la base de datos
 * @summary Endpoint GET para obtener la lista completa de productos
 * @description Recupera todos los registros de la tabla de productos desde Supabase
 * @returns {Promise<NextResponse>} JSON con array de productos o error
 * @throws {Error} Si hay un error en la consulta a la base de datos
 * @example
 * // Response exitosa:
 * // HTTP 200
 * // [{ id: "1", name: "Producto 1", price: 100 }]
 *
 * // Response de error:
 * // HTTP 500
 * // { error: "Mensaje de error descriptivo" }
 */
export async function GET() {
  try {
    const { data, error } = await supabaseServer.from(TABLE).select("*");
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { oldId, newId, name, price, description, grip, ...rest } =
      await request.json();

    // Validación: Campos requeridos
    if (!oldId) {
      return NextResponse.json(
        { error: "Se requiere el ID original del producto (oldId)" },
        { status: 400 }
      );
    }

    // Validación: Si se intenta cambiar el ID, verificar que no exista
    if (newId && newId !== oldId) {
      // Verificar que el nuevo ID no tenga espacios
      if (newId.includes(" ")) {
        return NextResponse.json(
          { error: "El ID no puede contener espacios" },
          { status: 400 }
        );
      }

      // Verificar que el nuevo ID no esté en uso
      const { count } = await supabaseServer
        .from(TABLE)
        .select("*", { count: "exact" })
        .eq("id", newId);

      if (count && count > 0) {
        return NextResponse.json(
          { error: "El nuevo ID ya está en uso por otro producto" },
          { status: 400 }
        );
      }
    }

    // Datos a actualizar
    const updateData = {
      ...(newId && { id: newId }), // Actualiza el ID solo si se proporciona
      ...(name && { name }),
      ...(price && { price }),
      ...(description && { description }),
      ...(grip && { grip }),
      ...rest,
    };

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron datos para actualizar" },
        { status: 400 }
      );
    }

    // Actualizar el producto en Supabase
    const { data: updatedProduct, error: updateError } = await supabaseServer
      .from(TABLE)
      .update(updateData)
      .eq("id", oldId) // Buscar por ID original
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { id, name, price, description, grip, ...rest } =
      await request.json();

    // Validaciones básicas
    if (!id) {
      return NextResponse.json(
        { error: "El ID del producto es obligatorio" },
        { status: 400 }
      );
    }

    // Validar ID sin espacios
    if (id.includes(" ")) {
      return NextResponse.json(
        { error: "El ID no puede contener espacios" },
        { status: 400 }
      );
    }

    // Verificar unicidad del ID
    const { count } = await supabaseServer
      .from(TABLE)
      .select("*", { count: "exact" })
      .eq("id", id);

    if (count && count > 0) {
      return NextResponse.json(
        { error: "El ID ya está en uso por otro producto" },
        { status: 400 }
      );
    }

    // Construir nuevo producto
    const newProduct = {
      id,
      name,
      price,
      description,
      grip,
      stock: 0,
      imagePath: "",
      ...rest,
    };

    const { data, error } = await supabaseServer
      .from(TABLE)
      .insert([newProduct])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Se requiere el ID del producto a eliminar" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from(TABLE).delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      message: `Producto con ID '${id}' eliminado correctamente`,
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
