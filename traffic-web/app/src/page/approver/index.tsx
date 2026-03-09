"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Inbox, DollarSign, FileCheck } from "lucide-react";

// Import both hooks
import { useDriverByLicense, useDriverByPhone } from "@/hooks/api/driver";
import { AnimatedContainer } from "@/components/approver/animated-container";
import { Skeleton } from "@/components/ui/skeleton";

// Import components
import { DriverSearch } from "@/components/approver/driver-search";
import { DriverInfoCard } from "@/components/approver/driver-info-card";
import { RackInformation } from "@/components/approver/rack-information";
import { PaymentTracking } from "@/components/approver/payment-tracking";
import { ApprovalProcess } from "@/components/approver/approval-process";
import {
  AddNoteDialog,
  UpdateStatusDialog,
} from "@/components/approver/dialogs";

export default function ApproverPage() {
  // State to hold the current search criteria (type and value)
  const [searchCriteria, setSearchCriteria] = useState<{
    type: "licenseNumber" | "phoneNumber";
    value: string;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("rack");
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] =
    useState(false);

  // Determine if license search should be enabled
  const enableLicenseSearch =
    hasSearched && searchCriteria?.type === "licenseNumber";
  // Determine if phone search should be enabled
  const enablePhoneSearch =
    hasSearched && searchCriteria?.type === "phoneNumber";

  // Call useDriverByLicense conditionally
  const { data: driverByLicense, isLoading: isLoadingLicense } =
    useDriverByLicense(searchCriteria?.value || "", {
      enabled: enableLicenseSearch,
    });

  // Call useDriverByPhone conditionally
  const { data: driverByPhone, isLoading: isLoadingPhone } = useDriverByPhone(
    searchCriteria?.value || "",
    { enabled: enablePhoneSearch }
  );

  // Determine the active driver data and overall loading state
  const driver = driverByLicense || driverByPhone;
  const isLoading = isLoadingLicense || isLoadingPhone;

  const handleSearch = (criteria: {
    type: "licenseNumber" | "phoneNumber";
    value: string;
  }) => {
    setSearchCriteria(criteria);
    setHasSearched(true);
  };

  const handleAddNote = (note: string) => {
    console.log("Adding note:", note);
    // In a real app, this would call an API to add the note
  };

  const handleUpdateStatus = (status: string, note?: string) => {
    console.log("Updating status to:", status, "with note:", note);
    // In a real app, this would call an API to update the status
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <AnimatedContainer delay={0}>
        <DriverSearch onSearch={handleSearch} isLoading={isLoading} />
      </AnimatedContainer>

      {isLoading && (
        <AnimatedContainer delay={0.1}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      )}

      {!isLoading && hasSearched && !driver && (
        <AnimatedContainer delay={0.1}>
          <Card className="border-0 shadow-md bg-amber-50 text-amber-800">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Driver Found</h3>
              <p className="text-amber-700">
                No driver found with{" "}
                <span className="font-semibold">
                  {searchCriteria?.type === "licenseNumber"
                    ? "license number"
                    : "phone number"}
                </span>
                :{" "}
                <span className="font-mono font-medium">
                  {searchCriteria?.value}
                </span>
              </p>
              <p className="text-sm text-amber-600 mt-2">
                Please check the{" "}
                {searchCriteria?.type === "licenseNumber"
                  ? "license number"
                  : "phone number"}{" "}
                and try again.
              </p>
            </CardContent>
          </Card>
        </AnimatedContainer>
      )}

      {!isLoading && driver && (
        <AnimatedContainer delay={0.2}>
          <div className="space-y-6">
            <DriverInfoCard driver={driver} />

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger
                        value="rack"
                        className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                      >
                        <Inbox className="mr-2 h-4 w-4" />
                        Rack Information
                      </TabsTrigger>
                      {/* <TabsTrigger
                        value="payment"
                        className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        Payment Tracking
                      </TabsTrigger>
                      <TabsTrigger
                        value="approval"
                        className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        Approval Process
                      </TabsTrigger> */}
                    </TabsList>
                  </div>

                  <TabsContent value="rack" className="mt-0 p-6">
                    <RackInformation
                      onUpdateStatus={() => setIsUpdateStatusDialogOpen(true)}
                      onAddNote={() => setIsAddNoteDialogOpen(true)}
                    />
                  </TabsContent>

                  <TabsContent value="payment" className="mt-0 p-6">
                    <PaymentTracking />
                  </TabsContent>

                  <TabsContent value="approval" className="mt-0 p-6">
                    <ApprovalProcess />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </AnimatedContainer>
      )}

      <AddNoteDialog
        open={isAddNoteDialogOpen}
        onOpenChange={setIsAddNoteDialogOpen}
        onAdd={handleAddNote}
      />

      <UpdateStatusDialog
        open={isUpdateStatusDialogOpen}
        onOpenChange={setIsUpdateStatusDialogOpen}
        onUpdate={handleUpdateStatus}
      />
    </div>
  );
}
