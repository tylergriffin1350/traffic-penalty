"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRight } from "lucide-react";

export function NavMain({ items }: { items: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.children
            ? item.children.some((child) => pathname === child.href)
            : pathname === item.href;

          if (item.children) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link key={item.href} href={item.href}>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.title}
                        className={pathname === item.href ? "active" : ""}
                      >
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.href}>
                          <Link key={subItem.href} href={subItem.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.href}
                              className={
                                pathname === subItem.href ? "active" : ""
                              }
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathname === item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  {Icon && <Icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
