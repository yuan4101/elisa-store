import type { NextConfig } from "next";

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://192.168.1.11"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname, // Extraído dinámicamente de tu variable de entorno
        port: "",
        pathname: "/storage/v1/object/public/product-images/**", // Asegura que solo imágenes de este path sean permitidas
      },
    ],
  },
};

export default nextConfig;
