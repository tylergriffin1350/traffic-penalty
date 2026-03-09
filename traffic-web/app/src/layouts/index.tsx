"use client";
import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { BreadcrumbProvider } from "@/context/bread-crumb-context";
import { usePathname } from "next/navigation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthClientProvider } from "@/context/AuthClientProvider";
import ToasterContext from "@/context/ToastContext";
import NextTopLoader from "nextjs-toploader";
import "@/app/globals.css";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            refetchOnReconnect: true,
          },
        },
      })
  );
  const pathname = usePathname();
  const hideSidebarAndHeaderPaths = ["/", "/sign-in"];
  const shouldHideSidebarAndHeader =
    hideSidebarAndHeaderPaths.includes(pathname);
  return (
    <AuthClientProvider>
      <QueryClientProvider client={queryClient}>
        <ToasterContext />
        <SidebarProvider>
          <BreadcrumbProvider>
            {!shouldHideSidebarAndHeader && <AppSidebar />}
            <div
              className={`flex flex-col flex-1 text-foreground transition-colors duration-200`}
            >
              {!shouldHideSidebarAndHeader && <Header />}
              <NextTopLoader color="#E00370" showSpinner={false} />
              {children}
            </div>
          </BreadcrumbProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </AuthClientProvider>
  );
}
