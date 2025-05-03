/**
 * @file layout.tsx
 * @brief Plantilla principal de la aplicacion
 * @details Estructura base compartida por todas las paginas (Color de fondo, Fuentes, Iconos, Metadata)
 * @author Juan Ante
 * @date 2025
 */

import "./globals.css";
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/navbar";
import ShoppingCart from "./components/shoppingCart";
import { CartProvider } from './context/CartContext';
import Image from "next/image";

const inter = Inter({
  weight: ['300','500', '700'],
  style:['normal', 'italic'],
  subsets: ['latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Elisa & CO - HAIRCLIPS",
  description: "Hairclips, hairclaws y estilo según tu mood 🧡",
  icons: {
    icon: "/icons/elisaicono.webp",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/preview-contacto.webp`], // Imagen específica
  },
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {

  return (
    <html lang="es" className={`${inter.variable}`}>
      <body>
        <CartProvider>
          <header className="sticky bg-[var(--color-bg)] top-0 z-50 shadow-md pt-3">
            <div className="pb-2">
              <div className="flex justify-center h-[70px]">
                <Link href="/catalogo" className="relative block w-full h-full">
                  <Image
                    src="/elisalogoweb.webp"
                    alt="Logo Elisa & Co"
                    fill
                    priority={true}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="bg-[var(--color-navbar-bg)] py-2">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <Navbar></Navbar>
                  <ShoppingCart></ShoppingCart>
                </div>
              </div>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-5 py-3">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
