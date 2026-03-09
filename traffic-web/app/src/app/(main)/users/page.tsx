"use client";

import React, { useEffect } from "react";
import { useBreadcrumb } from "@/context/bread-crumb-context";
import UserPage from "@/page/users";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([{ label: "Users", href: "/users", isPage: true }]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <UserPage />
    </div>
  );
}
