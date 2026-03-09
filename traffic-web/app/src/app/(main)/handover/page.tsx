"use client";

import React, { useEffect } from "react";

import { useBreadcrumb } from "@/context/bread-crumb-context";
import HandoverPage from "@/page/handover";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      { label: "Handover", href: "/handover", isPage: true },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <HandoverPage />
    </div>
  );
}
