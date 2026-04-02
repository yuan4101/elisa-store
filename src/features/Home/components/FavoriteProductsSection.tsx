"use client";
import { useState, useRef } from "react";
import { useProducts } from "@/features/producto/hooks/useProducts";
import { FavoriteProductCard } from "./FavoriteProductCard";

export function FavoriteProductsSection() {
  const { products } = useProducts();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const intentionLocked = useRef<"horizontal" | "vertical" | null>(null);
  const isTransitioning = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const allowedSkus = ["iguania", "megaptera", "aurelia", "lybica"];
  const selected = products.filter((p) => allowedSkus.includes(p.sku));

  const slides =
    selected.length > 0
      ? [selected[selected.length - 1], ...selected, selected[0]]
      : [];

  const [current, setCurrent] = useState(1);
  const [animated, setAnimated] = useState(true);

  const goTo = (index: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimated(true);
    setCurrent(index);
  };

  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (current === slides.length - 1) {
      setAnimated(false);
      setCurrent(1);
    }
    if (current === 0) {
      setAnimated(false);
      setCurrent(selected.length);
    }
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleTouchMoveNative = (e: TouchEvent) => {
    const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);

    if (!intentionLocked.current && (diffX > 5 || diffY > 5)) {
      intentionLocked.current = diffX > diffY ? "horizontal" : "vertical";
    }

    if (intentionLocked.current === "horizontal") {
      e.preventDefault();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    intentionLocked.current = null;
    trackRef.current?.addEventListener("touchmove", handleTouchMoveNative, {
      passive: false,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    trackRef.current?.removeEventListener("touchmove", handleTouchMoveNative);
    if (intentionLocked.current === "horizontal") {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      if (diffX > 50) next();
      if (diffX < -50) prev();
    }
  };

  const activeDot =
    current === 0
      ? selected.length - 1
      : current === slides.length - 1
        ? 0
        : current - 1;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-row px-4 pb-4 pt-3">
        <div className="w-full grid md:grid-cols-4 gap-x-6 gap-y-5">
          {selected.map((product, index) => (
            <FavoriteProductCard
              key={product.id}
              product={product}
              index={index}
              stock={product.stock}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <div
          ref={trackRef}
          className="w-full overflow-hidden px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${animated ? "transition-transform duration-300 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((product, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <FavoriteProductCard
                  product={product}
                  index={index}
                  stock={product.stock}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Puntos */}
        <div className="flex justify-center gap-2">
          {selected.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + 1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeDot
                  ? "bg-[var(--color-navbar-bg)] w-4"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
