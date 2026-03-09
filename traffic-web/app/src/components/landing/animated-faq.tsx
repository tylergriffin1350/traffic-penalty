"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export function AnimatedFAQ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 py-12">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          index={index}
        />
      ))}
    </div>
  );
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="overflow-hidden border rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        className="flex w-full items-center justify-between bg-background p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        whileTap={{ backgroundColor: "rgba(0,0,0,0.04)" }}
      >
        <h3 className="text-xl font-bold">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.button>
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="p-4 pt-0">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
