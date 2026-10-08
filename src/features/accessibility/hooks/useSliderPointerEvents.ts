import { useRef, useState, useEffect } from "react";

export function useSliderPointerEvents(
  globalValue: number,
  min: number,
  max: number,
  step: number,
  onChange: (val: number) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(globalValue);
  const isDragging = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (!isDragging.current) {
      setLocalValue(globalValue);
    }
  }, [globalValue]);

  const calculateValue = (e: React.PointerEvent<HTMLInputElement>) => {
    const rect = rectRef.current || e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const range = max - min;
    let newValue = min + percentage * range;
    newValue = Math.round(newValue / step) * step;
    return Math.max(min, Math.min(max, newValue));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLInputElement>) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    rectRef.current = e.currentTarget.getBoundingClientRect();
    const newValue = calculateValue(e);
    setLocalValue(newValue);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLInputElement>) => {
    if (!isDragging.current) return;
    if (e.buttons !== 1 && e.pointerType !== "touch") return;
    
    const newValue = calculateValue(e);
    setLocalValue(newValue);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLInputElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const newValue = calculateValue(e);
    setLocalValue(newValue);
    
    // Disparamos el recálculo global de manera estricta e instantánea
    onChange(newValue);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Intercept the native input onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.currentTarget.value);
    setLocalValue(newValue);
    // If not dragging with a pointer (e.g. keyboard), update immediately
    if (!isDragging.current) {
      onChange(newValue);
    }
  };

  return {
    value: localValue,
    pointerProps: {
      ref: inputRef,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onChange: handleChange,
      style: { touchAction: "none" } as React.CSSProperties
    }
  };
}
