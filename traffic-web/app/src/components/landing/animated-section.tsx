"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id={id} ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function AnimatedHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center space-y-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTitle({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.h2
      className="text-3xl font-bold tracking-tighter md:text-4xl/tight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  );
}

export function AnimatedText({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedBadge({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
