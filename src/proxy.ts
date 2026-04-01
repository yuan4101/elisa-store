// middleware.ts  ← raíz del proyecto, al mismo nivel que package.json
import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config"

export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas EXCEPTO:
     * - _next/static  → assets de Next.js
     * - _next/image   → optimización de imágenes
     * - favicon.ico   → ícono del sitio
     * - maintenance   → la propia página de mantenimiento (evita bucle)
     * - api           → endpoints internos / webhooks
     */
    "/((?!_next/static|_next/image|favicon.ico|maintenance|api).*)",
  ],
};

export async function proxy(req: NextRequest) {
  try {
    const isInMaintenanceMode = await get<boolean>("isInMaintenanceMode");

    if (isInMaintenanceMode) {
      const url = req.nextUrl.clone();
      url.pathname = "/maintenance";
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    console.log("Edge Config error:", error);
  }

  return NextResponse.next();
}