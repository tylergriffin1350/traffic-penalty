"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={cn("relative overflow-hidden", className)}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <motion.span
          className="absolute inset-0 bg-white/10 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        {children}
      </Button>
    </motion.div>
  );
}

export function AnimatedCTA({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("flex flex-col gap-2 min-[400px]:flex-row", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
