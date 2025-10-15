"use client";

import { useRouter } from "next/navigation";

export function useNavigation() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const goAdmin = () => {
    router.push("/admin");
  };

  const goCatalog = () => {
    router.push("/catalogo");
  };

  const goAbout = () => {
    router.push("/about");
  };

  const goContact = () => {
    router.push("/contacto");
  };

  const goProduct = (productName: string) => {
    router.push(`/producto/${productName}`);
  };

  return {
    goHome,
    goAdmin,
    goCatalog,
    goAbout,
    goContact,
    goProduct,
  };
}
