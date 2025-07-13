//layout.tsx

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import Navbar from "./components/navbar";
import ShoppingCart from "./components/shoppingCart";
import { CartProvider } from './context/CartContext';

const interFont = Inter({
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
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/preview-contacto.webp`],
  },
};

function Logo() {
  return (
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
  );
}

function HeaderContent() {
  return (
    <div className="bg-[var(--color-navbar-bg)] py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Navbar />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky bg-[var(--color-bg)] top-0 z-50 shadow-md pt-3">
      <Logo />
      <HeaderContent />
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="font-bold">
            <h3>Elisa&CO Hairclips</h3>
          </div>
          <div className="text-lg px-2 hidden md:block">|</div>
          <div className="">
            <Link href="/contacto">Contacto</Link>
          </div>
          <div className="text-lg px-2 hidden md:block">|</div>
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${interFont.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-5 py-3">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}