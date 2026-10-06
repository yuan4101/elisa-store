"use client";

import { useEffect } from "react";
import { useAccessibility } from "../../../context/AccessibilityContext";

export default function HighContrastEnforcer() {
  const { settings } = useAccessibility();
  const isHighContrast = settings.highContrast ?? false;

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add("accessibility-high-contrast");
    } else {
      document.documentElement.classList.remove("accessibility-high-contrast");
    }
  }, [isHighContrast]);

  return null;
}
