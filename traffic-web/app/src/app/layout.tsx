"use client";
import React from "react";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden max-w-[2000px] mx-auto">
        {children}
      </body>
    </html>
  );
}
