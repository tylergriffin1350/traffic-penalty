'use client'
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthClientProvider } from "@/context/AuthClientProvider";
import ToasterContext from "@/context/ToastContext";
import "@/app/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthClientProvider>
      <QueryClientProvider client={queryClient}>
        <ToasterContext />
        {children}
      </QueryClientProvider>
    </AuthClientProvider>
  );
}