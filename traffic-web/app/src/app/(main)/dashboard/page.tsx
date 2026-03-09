"use client";
import React, { useEffect } from "react";
import { useBreadcrumb } from "@/context/bread-crumb-context";
import { rolePermissions } from "@/config/roles";
import { useAuthContext } from "@/context/AuthClientProvider";
import Traffic from "@/page/dashboard/traffic";
import Admin from "@/page/dashboard/Admin";
import Approver from "@/page/dashboard/approver";

export default function Page() {
  const { user } = useAuthContext();
  const { setBreadcrumbItems } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbItems([{ label: "Dashboard", href: "/dashboard" }]);
  }, [setBreadcrumbItems]);

  // Get all role names for this user
  const roleNames =
    user?.roles?.map((role) => rolePermissions[role.id]?.name) || [];

  return (
    <div className="h-screen">
      {roleNames.includes("Traffic") && <Traffic />}
      {roleNames.includes("Admin") && <Admin />}
      {roleNames.includes("Approver") && <Approver />}
      {roleNames.includes("Agency") && <Approver />}
    </div>
  );
}
