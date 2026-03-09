"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  User,
  FileText,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { useDriverByLicense, useDriverByPhone } from "@/hooks/api/driver";
import { AnimatedContainer } from "@/components/approver/animated-container";
import { Skeleton } from "@/components/ui/skeleton";

// Import components
import { TrafficDriverSearch } from "@/components/handover/traffic-driver-search";
import { DriverInfoCard } from "@/components/approver/driver-info-card";
import { TrafficPenaltyList } from "@/components/handover/traffic-penalty-list";
import { TrafficDocuments } from "@/components/handover/traffic-documents";
import { TrafficNotes } from "@/components/handover/traffic-notes";
import { AddToRackModal } from "@/components/handover/add-to-rack-modal";

export default function HandoverPage() {
  const [searchCriteria, setSearchCriteria] = useState<{
    type: "licenseNumber" | "phoneNumber";
    value: string;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("driver");
  const [isAddToRackModalOpen, setIsAddToRackModalOpen] = useState(false);
  const [selectedPenalties, setSelectedPenalties] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

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

  const handleAddToRack = () => {
    setIsAddToRackModalOpen(true);
  };

  const handleRackSubmit = (rackData: any) => {
    console.log("Adding to rack:", rackData);
    // In real app, this would call an API to add the case to rack
    setIsAddToRackModalOpen(false);
    // Show success message or redirect
  };

  const handlePenaltySelection = (penaltyId: string, selected: boolean) => {
    if (selected) {
      setSelectedPenalties((prev) => [...prev, penaltyId]);
    } else {
      setSelectedPenalties((prev) => prev.filter((id) => id !== penaltyId));
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <AnimatedContainer delay={0}>
        <TrafficDriverSearch onSearch={handleSearch} isLoading={isLoading} />
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
                No driver found with:{" "}
                <span className="font-mono font-medium">
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
            <DriverInfoCard
              driver={driver}
              showAddToRack={true}
              onAddToRack={handleAddToRack}
            />

            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-4 mb-4">
                      <TabsTrigger
                        value="driver"
                        className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Driver Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="penalties"
                        className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Penalties
                      </TabsTrigger>
                      <TabsTrigger
                        value="documents"
                        className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Documents
                      </TabsTrigger>
                      <TabsTrigger
                        value="notes"
                        className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Notes
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="driver" className="mt-0 p-6">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          Driver Information Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              License Number
                            </p>
                            <p className="font-mono font-medium text-pink-600">
                              {driver.licenseNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{driver.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{driver.phoneNumber}</p>
                          </div>
                          {/* <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{driver.}</p>
                          </div> */}
                          {/* <div>
                            <p className="text-sm text-gray-500">
                              License Status
                            </p>
                            <p className="font-medium text-green-600">
                              {driver.licenseStatus}
                            </p>
                          </div> */}
                          {/* <div>
                            <p className="text-sm text-gray-500">
                              Total Violations
                            </p>
                            <p className="font-medium text-red-600">
                              {driver.totalViolations}
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="penalties" className="mt-0 p-6">
                    <TrafficPenaltyList
                      driverLicense={searchCriteria}
                      selectedPenalties={selectedPenalties}
                      onPenaltySelection={handlePenaltySelection}
                    />
                  </TabsContent>

                  <TabsContent value="documents" className="mt-0 p-6">
                    <TrafficDocuments driverLicense={searchCriteria} />
                  </TabsContent>

                  <TabsContent value="notes" className="mt-0 p-6">
                    <TrafficNotes
                      notes={notes}
                      onNotesChange={setNotes}
                      driverLicense={searchCriteria}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </AnimatedContainer>
      )}

      <AddToRackModal
        open={isAddToRackModalOpen}
        onOpenChange={setIsAddToRackModalOpen}
        onSubmit={handleRackSubmit}
        driver={driver}
        selectedPenalties={selectedPenalties}
        notes={notes}
      />
    </div>
  );
}
