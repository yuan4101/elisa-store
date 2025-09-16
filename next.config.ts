import type { NextConfig } from "next";

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  allowedDevOrigins: [`${process.env.IP}`, "localhost", "127.0.0.1"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname, // Extraído dinámicamente de tu variable de entorno
        port: "",
        pathname: "/storage/v1/object/public/product-images/**", // Asegura que solo imágenes de este path sean permitidas
      },
    ],
    minimumCacheTTL: 2678400, // 31 días en segundos (máximo permitido)
    formats: ["image/webp"], // Solo WebP, evita AVIF (más pesado de procesar)
  },
};

export default nextConfig;