import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/features/shoppingCart/context/ShoppingCartContext";
import NotificationProvider from "@/features/notification/context/NotificationContext";
import Header from "../features/header/components/header";
import Footer from "../features/footer/components/footer";

const interFont = Inter({
  weight: ["300", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function getBaseUrl(): string {
  // 1. Dominio personalizado en producción
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 2. Ip de red local
  if (process.env.IP && process.env.PORT) {
    return `http://${process.env.IP}:${process.env.PORT}`;
  }

  // 3. Fallback para desarrollo local
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),

  title: "Elisa & CO - HAIRCLIPS",
  description: "Hairclips, hairclaws y estilo según tu mood 🧡",
  icons: {
    icon: "/icons/elisaicono.webp",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: ["/preview-contacto.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${interFont.variable}`}>
      <body className="min-h-screen flex flex-col">
        <NotificationProvider>
          <CartProvider>
            <Header />
            <main className="max-w-6xl mx-auto px-5 py-3 flex-grow w-full">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </NotificationProvider>
        <Analytics />
      </body>
    </html>
  );
}
