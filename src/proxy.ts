import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Verificar si existe la cookie de sesión
  const isAuthenticated = request.cookies.get('admin-authenticated');
  
  // Si no está autenticado y no está en la página de login
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // Si está autenticado y trata de acceder al login, redirigir al dashboard
  if (isAuthenticated && request.nextUrl.pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*', // Aplica a todas las rutas que empiezan con /admin
};
