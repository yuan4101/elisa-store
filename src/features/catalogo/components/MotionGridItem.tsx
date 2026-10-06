"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function MotionGridItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
