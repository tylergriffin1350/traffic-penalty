"use client";

import React, { useEffect } from "react";
import RolesPage from "@/page/roles";
import { useBreadcrumb } from "@/context/bread-crumb-context";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([{ label: "Roles", href: "/roles", isPage: true }]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <RolesPage />
    </div>
  );
}
