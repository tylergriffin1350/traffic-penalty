"use client";

import React, { useEffect } from "react";
import { useBreadcrumb } from "@/context/bread-crumb-context";
import PenalitiesPage from "@/page/penality";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      {
        label: "Penalty",
        href: "/penalty",
        isPage: true,
      },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <PenalitiesPage />
    </div>
  );
}
