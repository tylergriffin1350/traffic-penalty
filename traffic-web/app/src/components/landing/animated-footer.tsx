"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function AnimatedFooter() {
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer id="contact" className="w-full border-t bg-muted py-12">
      <motion.div
        className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="space-y-4" variants={item}>
          <div className="flex items-center gap-2">
            <img src="./cheche/cheche.svg" alt="cheche logo" width={160} />
          </div>
          <p className="text-sm text-muted-foreground">
            The official online payment system for traffic penalties. Quick,
            secure, and easy to use.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
              { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
              { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
            ].map((social, index) => (
              <motion.div
                key={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {[
          {
            title: "Quick Links",
            links: [
              { label: "Home", href: "#" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "FAQ", href: "#faq" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Terms of Service", href: "#" },
              { label: "Privacy Policy", href: "#" },
              { label: "Cookie Policy", href: "#" },
              { label: "Data Protection", href: "#" },
            ],
          },
          {
            title: "Contact",
            links: [
              {
                label: "Traffic Authority Headquarters",
                href: "#",
                isText: true,
              },
              {
                label: "support@trafficpay.com",
                href: "mailto:support@trafficpay.com",
              },
              { label: "+1 (234) 567-890", href: "tel:+1234567890" },
              { label: "For Traffic Authorities", href: "#" },
            ],
          },
        ].map((column, columnIndex) => (
          <motion.div key={column.title} className="space-y-4" variants={item}>
            <h3 className="text-lg font-medium">{column.title}</h3>
            <ul className="space-y-2 text-sm">
              {column.links.map((link, linkIndex) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + columnIndex * 0.1 + linkIndex * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {link.isText ? (
                    <span className="text-muted-foreground">{link.label}</span>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="container mt-8 border-t pt-8 px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CHECHE. Official traffic penalty payment system.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item, index) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
