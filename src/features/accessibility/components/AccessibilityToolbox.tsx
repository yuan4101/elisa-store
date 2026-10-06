"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccessibility } from "../context/AccessibilityContext";
import { modulesRegistry } from "../config/registry";
import { useMagneticDraggable } from "@/hooks/useMagneticDraggable";
import { getButtonStyle, getPanelStyle } from "./AccessibilityToolbox.styles";

export default function AccessibilityToolbox() {
  const {
    resetSettings,
    isOpen,
    togglePanel,
    buttonPosition,
    updateButtonPosition,
  } = useAccessibility();
  const { ref, pos, corner, hasMoved, isDragging, isReady } =
    useMagneticDraggable(updateButtonPosition, buttonPosition);
  const wasOpenRef = useRef(false);
  const prevDraggingRef = useRef(false);

  useEffect(() => {
    if (isDragging && !prevDraggingRef.current) {
      wasOpenRef.current = isOpen;
      if (isOpen) {
        togglePanel();
      }
    } else if (!isDragging && prevDraggingRef.current && wasOpenRef.current) {
      togglePanel();
    }
    prevDraggingRef.current = isDragging;
  }, [isDragging, isOpen, togglePanel]);

  const handleButtonClick = () => {
    if (!hasMoved.current) {
      togglePanel();
    }
  };

  return (
    <>
      <div
        className="hidden lg:block"
        ref={ref}
        style={{
          ...getButtonStyle(pos, isDragging),
          visibility: isReady ? "visible" : "hidden",
        }}
      >
        <button
          onClick={handleButtonClick}
          className="w-20 h-20 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center bg-white border border-gray-200"
          aria-label="Abrir panel de accesibilidad"
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
        >
          <Image
            src="/Símbolo_Internacional_de_Accesibilidad.png"
            alt="Simbolo Internacional de Accesibilidad"
            width={52}
            height={52}
            className="object-contain pointer-events-none rounded-full"
            style={{ width: "52px", height: "52px" }}
            unoptimized
            draggable={false}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="accessibility-panel"
            aria-label="Controles de accesibilidad"
            style={getPanelStyle(pos, corner)}
            className="hidden lg:block w-[360px] sm:w-[420px] max-w-[90vw] rounded-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto bg-[var(--color-bg)] border border-gray-200 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              style={{ 
                "--font-scale": "1.15", 
                "--line-height": "1.6",
                "--letter-spacing": "0em" 
              } as React.CSSProperties}
              className="space-y-6"
            >
              <div>
                <h2 className="text-[24px] font-semibold mb-4" style={{ color: "var(--color-text)" }}>
                  Accesibilidad
                </h2>
              </div>

              <div className="space-y-4">
                {modulesRegistry.map((module) => (
                  <div key={module.id}>
                    {typeof module.component === "function" && (
                      <module.component />
                    )}
                  </div>
                ))}

                <button
                  onClick={resetSettings}
                  className="w-full px-4 py-3 rounded-lg text-[18px] font-medium transition-colors bg-[var(--color-card-bg)] text-[var(--color-text)] border border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
                  aria-label="Restaurar configuración de accesibilidad predeterminada"
                >
                  Restaurar predeterminados
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Enforcers run silently in the background regardless of panel state */}
      {modulesRegistry.map((module) => (
        <div key={`enforcer-${module.id}`} style={{ display: "none" }}>
          {module.enforcer && <module.enforcer />}
        </div>
      ))}
    </>
  );
}
