"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedContainer({
  children,
  delay = 0,
  className = "",
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
