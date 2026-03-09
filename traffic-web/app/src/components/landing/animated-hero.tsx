"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Image from "next/image";

export function AnimatedHero({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="container px-4 md:px-6 relative z-10"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rounded-lg shadow-xl object-cover"
      />
    </motion.div>
  );
}

export function AnimatedHeading({ children }: { children: ReactNode }) {
  const words = children?.toString().split(" ") || [];

  // Animation variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em] last:mr-0"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function AnimatedSubtitle({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      className="max-w-[600px] text-muted-foreground md:text-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-5%] h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
