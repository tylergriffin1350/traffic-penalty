"use client";

import React, { useEffect } from "react";
import PenalityTypePage from "@/page/penalityType";
import { useBreadcrumb } from "@/context/bread-crumb-context";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      { label: "Penalty Type", href: "/penaltytype", isPage: true },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <PenalityTypePage />
    </div>
  );
}
