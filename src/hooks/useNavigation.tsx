"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/catalogo") {
      const query = searchParams.toString();
      if (query) {
        localStorage.setItem("catalogFilters", query);
      } else {
        localStorage.removeItem("catalogFilters");
      }
    }
  }, [searchParams, pathname]);

  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const goAdmin = useCallback(() => {
    router.push("/admin");
  }, [router]);

  const goCatalog = useCallback(() => {
    let query = searchParams.toString();

    if (!query && typeof window !== "undefined") {
      query = localStorage.getItem("catalogFilters") || "";
    }

    const url = query ? `/catalogo?${query}` : "/catalogo";
    router.push(url);
  }, [router, searchParams]);

  const goAbout = useCallback(() => {
    router.push("/about");
  }, [router]);

  const goContact = useCallback(() => {
    router.push("/contacto");
  }, [router]);

  const goProduct = useCallback(
    (productName: string) => {
      router.push(`/producto/${productName}`);
    },
    [router]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    goHome,
    goAdmin,
    goCatalog,
    goAbout,
    goContact,
    goProduct,
    goBack,
  };
}
