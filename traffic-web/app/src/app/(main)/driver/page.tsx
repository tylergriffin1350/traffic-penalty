"use client";

import React, { useEffect } from "react";
import DriversPage from "@/page/driver";
import { useBreadcrumb } from "@/context/bread-crumb-context";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([{ label: "Driver", href: "/driver", isPage: true }]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <DriversPage />
    </div>
  );
}
