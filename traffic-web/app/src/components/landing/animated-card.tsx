"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={className}
    >
      <Card className="h-full overflow-hidden border-muted/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {children}
      </Card>
    </motion.div>
  );
}

export function AnimatedFeature({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mt-1 text-primary">{icon}</div>
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export function AnimatedStep({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-2 h-full p-6 bg-background rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-xl font-bold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
