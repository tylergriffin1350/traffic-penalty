"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image"; // Assuming you might use this later, keeping it. If not, it can be removed.
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation"; // Import useRouter

export function AnimatedHeader() {
  const { scrollY } = useScroll();
  const router = useRouter(); // Initialize the router

  // Only apply box shadow on scroll, keep background fully transparent
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.1)"]
  );

  const [language, setLanguage] = useState("English");
  const [languageCode, setLanguageCode] = useState("EN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { name: "English", code: "EN" },
    { name: "ኣማርኛ", code: "ኣማ" },
    { name: "Oromifa", code: "OR" },
    { name: "Somali", code: "SO" },
  ];

  const handleLanguageChange = (lang: string, code: string) => {
    setLanguage(lang);
    setLanguageCode(code);
    // Here you would implement actual language change logic
  };

  const handleNavigateToSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-sm supports-[backdrop-filter]:bg-transparent"
      style={{ boxShadow }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2 ml-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Use Next.js Image component if the image is in the public directory */}
          {/* <Image src="/cheche/cheche.svg" alt="cheche logo" width={160} height={40} /> */}
          {/* Or keep img tag if it's handled differently (e.g. in public but accessed via relative path in development) */}
          <img src="./cheche/cheche.svg" alt="cheche logo" width={160} />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center gap-3 mr-7"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[hsl(var(--brand)/0.1)] flex items-center gap-1.5 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{languageCode}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className={
                    language === lang.name ? "bg-muted font-medium" : ""
                  }
                  onClick={() => handleLanguageChange(lang.name, lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="border-[hsl(var(--brand)/0.3)] text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand)/0.1)] hover:text-[hsl(var(--brand-hover))] hover:border-[hsl(var(--brand-hover))] transition-colors"
            onClick={handleNavigateToSignIn} // Updated onClick handler
          >
            For Traffic Authorities
          </Button>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-[hsl(var(--brand)/0.1)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {isMobileMenuOpen && (
          <div className="container py-4 border-t flex flex-col space-y-3 bg-background/80 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Language
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.name ? "secondary" : "ghost"}
                    size="sm"
                    className={`justify-start ${
                      language === lang.name
                        ? "bg-[hsl(var(--brand)/0.1)] text-[hsl(var(--brand))]"
                        : "hover:bg-[hsl(var(--brand)/0.1)]"
                    } transition-colors`}
                    onClick={() => {
                      handleLanguageChange(lang.name, lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Globe className="h-3.5 w-3.5 mr-2" />
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border-[hsl(var(--brand)/0.3)] text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand)/0.1)] hover:text-[hsl(var(--brand-hover))] hover:border-[hsl(var(--brand-hover))] transition-colors"
                onClick={() => {
                  handleNavigateToSignIn(); // Updated onClick handler
                  setIsMobileMenuOpen(false);
                }}
              >
                For Traffic Authorities
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.header>
  );
}
