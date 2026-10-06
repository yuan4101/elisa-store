"use client";

import { AccessibilityProvider } from "../context/AccessibilityContext";
import AccessibilityToolbox from "../components/AccessibilityToolbox";

export default function AccessibilityWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AccessibilityProvider>
      {children}
      <AccessibilityToolbox />
    </AccessibilityProvider>
  );
}
