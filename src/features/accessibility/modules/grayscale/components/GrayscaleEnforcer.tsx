"use client";

import { useEffect } from "react";
import { useAccessibility } from "../../../context/AccessibilityContext";

export default function GrayscaleEnforcer() {
  const { settings } = useAccessibility();
  const isGrayscale = settings.grayscale ?? false;

  useEffect(() => {
    if (isGrayscale) {
      document.documentElement.classList.add("accessibility-grayscale");
    } else {
      document.documentElement.classList.remove("accessibility-grayscale");
    }
  }, [isGrayscale]);

  return null;
}
