"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

export function AnimatedContainer({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 20,
  duration = 0.5,
}: AnimatedContainerProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
