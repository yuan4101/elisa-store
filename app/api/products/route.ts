import { NextResponse } from "next/server";
import { supabaseServer } from "../../lib/supabase-server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer.from("products").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("API error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}