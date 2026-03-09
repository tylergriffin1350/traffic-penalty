import React from "react";
import { NavMain } from "@/components/nav-main";
import SidebarSkeleton from "./sidebar-skeleton";
import useAppData from "@/components/app-sidebar/menu-data";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, navMain } = useAppData();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="m-3">
        <img src="/cheche/cheche.svg" alt="Cheche Logo" width={160} />
      </SidebarHeader>
      <SidebarContent className="mt-2">
        {navMain.length > 0 ? <NavMain items={navMain} /> : <SidebarSkeleton />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
