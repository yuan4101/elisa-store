import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "../../lib/supabase-server";
import { errorMessage } from "@/app/lib/utilities";

export async function GET() {
  try {
    const { data, error } = await supabaseServer.from("products").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (eventError) {
    return NextResponse.json({ error: errorMessage(eventError) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try{
    const body = await request.json();

    if(!body.id){
      return NextResponse.json({error: errorMessage("Se requiere el ID del producto")},{status: 400})
    }

    const { data, error } = await supabaseServer
      .from("products")
      .update(body)
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw new Error(errorMessage(error));

    return NextResponse.json(data)
  } catch(eventError){
    return NextResponse.json({ error: errorMessage(eventError) }, { status: 500 });
  }
}