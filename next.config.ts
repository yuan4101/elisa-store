import type { NextConfig } from "next";

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  /* config options here */
  /*
  allowedDevOrigins: [
    //"http://localhost",
    //"http://localhost:3000",
    //"http://127.0.0.1",
    //"http://127.0.0.1:3000",
    //"http://192.168.1.9",
    //"http://192.168.1.9:3000",
  ],
  */
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
