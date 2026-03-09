"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useBreadcrumb } from "@/context/bread-crumb-context";
import { NavUser, NavUserLoader } from "@/components/nav-user";
import useAppData from "@/components/app-sidebar/menu-data";
import { Button } from "../ui/button";
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Globe } from "lucide-react";

function Header() {
  const { breadcrumbItems } = useBreadcrumb();
  const { user } = useAppData();
  const { isMobile } = useSidebar();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-sidebar text-sidebar-foreground ">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex justify-between w-full items-center">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem className="hidden md:block">
                    {item.isPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href || "#"}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className={isMobile ? "w-20" : "w-72"}>
            {user.id ? <NavUser user={user} /> : <NavUserLoader />}
          </div>
        </div>
      </header>
    </SidebarInset>
  );
}

export default Header;
