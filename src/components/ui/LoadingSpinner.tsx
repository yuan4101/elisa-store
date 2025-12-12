"use client";

import { useState } from "react";

export function LoadingSpinner() {
  const [animationDelay] = useState(() => `-${Math.random()}s`);

  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
      <div
        className="absolute inset-0 border-4 border-transparent border-t-(--color-navbar-bg) rounded-full animate-spin"
        style={{ animationDelay }}
      ></div>
    </div>
  );
}
