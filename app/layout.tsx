import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from './context/shoppingCartContext';
import Header from './components/layout/server/header';
import Footer from './components/layout/server/footer';

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
    type: 'website',
  },
};

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