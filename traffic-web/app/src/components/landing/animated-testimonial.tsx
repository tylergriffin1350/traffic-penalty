"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  index: number;
}

export function AnimatedTestimonial({
  testimonials,
}: {
  testimonials: TestimonialProps[];
}) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          quote={testimonial.quote}
          author={testimonial.author}
          role={testimonial.role}
          index={index}
        />
      ))}
    </div>
  );
}

function Testimonial({ quote, author, role, index }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      className="h-full"
    >
      <Card className="flex flex-col gap-4 p-6 h-full">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-yellow-500"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.2 + index * 0.1 + star * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </motion.svg>
          ))}
        </div>
        <blockquote className="text-lg">"{quote}"</blockquote>
        <div className="flex items-center gap-4 mt-auto">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
