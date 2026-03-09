"use client";
import { useBreadcrumb } from "@/context/bread-crumb-context";
import PenalityHistoty from "@/page/penality-history";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface HistoryrUrlInfo {
  id: string;
}

function PenalityHistoryLoader() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [historyInfo, setHistoryInfo] = useState<HistoryrUrlInfo | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      setHistoryInfo({ id });
    } else {
      console.warn("Driver ID missing from URL parameters.");
    }
    setIsLoading(false);
  }, [searchParams]);

  const { setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumbItems([
      {
        label: "Penalty history",
        href: "/penalty/history",
        isPage: true,
      },
    ]);
  }, [setBreadcrumbItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">
          Loading penalty history Details...
        </p>
      </div>
    );
  }

  if (!historyInfo?.id) {
    return (
      <div className="flex items-center justify-center h-64 p-4 border border-destructive bg-destructive/10 rounded">
        <p className="text-destructive-foreground">
          Driver ID not found in URL. Cannot load details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PenalityHistoty driverId={historyInfo.id} />
    </div>
  );
}

export default function PenaltyHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100svh-200px)] w-full items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      }
    >
      <PenalityHistoryLoader />
    </Suspense>
  );
}
