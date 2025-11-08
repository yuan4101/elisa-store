"use client";

import { Suspense } from "react";
import Navbar from "./Navbar";
import NavbarSkeleton from "../skeletons/NavbarSkeleton";

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  );
}
