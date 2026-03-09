"use client";

import React, { useEffect } from "react";
import ApproverPage from "@/page/approver";
import { useBreadcrumb } from "@/context/bread-crumb-context";

export default function Page() {
  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      { label: "Approver", href: "/approver", isPage: true },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="h-screen m-5">
      <ApproverPage />
    </div>
  );
}
