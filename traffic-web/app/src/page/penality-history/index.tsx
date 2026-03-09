"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useDriverById, usePenaltiesByDriver } from "@/hooks/api/driver";
import HistoryList from "./history-list";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  FileText,
  Filter,
  History,
  User,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PenaltyHistory({ driverId }: { driverId: string }) {
  const [activeTab, setActiveTab] = useState("all");
  const [filterYear, setFilterYear] = useState<string>("all");

  const {
    data: penaltiesResponse,
    isLoading: isLoadingPenalties,
    isError: isErrorPenalties,
    error: errorPenalties,
  } = usePenaltiesByDriver(driverId) as {
    data: { data: any[] } | any[];
    isLoading: boolean;
    isError: boolean;
    error: any;
  };

  const {
    data: driverData,
    isLoading: isLoadingDriver,
    isError: isErrorDriver,
    error: errorDriver,
  } = useDriverById(driverId);

  // Loading state
  if (isLoadingPenalties || isLoadingDriver) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isErrorPenalties || isErrorDriver) {
    console.error("Error fetching penalty history:", errorPenalties);
    console.error("Error fetching driver details:", errorDriver);

    let errorMessage = "Failed to load data. Please try again later.";
    if (isErrorPenalties && isErrorDriver) {
      errorMessage = "Failed to load penalty history and driver details.";
    } else if (isErrorPenalties) {
      errorMessage = "Failed to load penalty history.";
    } else if (isErrorDriver) {
      errorMessage = "Failed to load driver details.";
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 my-8 p-6 border border-red-200 bg-red-50 rounded-lg shadow-sm"
      >
        <div className="flex items-start">
          <div className="mr-4 mt-0.5">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-700 mb-4">{errorMessage}</p>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Missing data state
  if (!penaltiesResponse || !driverData) {
    return (
      <div className="m-6 p-6 border border-amber-200 bg-amber-50 rounded-lg shadow-sm">
        <div className="flex items-start">
          <div className="mr-4 mt-0.5">
            <AlertCircle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">
              No Data Available
            </h3>
            <p className="text-amber-700 mb-1">
              Could not load complete history for driver ID: {driverId}.
            </p>
            <p className="text-amber-600 text-sm mb-4">
              {!driverData && "Driver details could not be found. "}
              {!penaltiesResponse && "Penalty history could not be found. "}
              Please check if the ID is correct or try again later.
            </p>
            <Button
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const driverName = driverData?.name;
  const driverLicense = driverData?.licenseNumber;

  // Calculate summary statistics
  let penalties = [];
  if (Array.isArray(penaltiesResponse)) {
    penalties = penaltiesResponse;
  } else if (penaltiesResponse && typeof penaltiesResponse === "object") {
    penalties = Array.isArray(penaltiesResponse.data)
      ? penaltiesResponse.data
      : [];
  }
  const totalPenalties = penalties.length;

  // Get unique years for filtering - with defensive check
  const penaltyYears =
    penalties.length > 0
      ? [
          ...new Set(
            penalties.map((p) => {
              if (p && p.committedAt) {
                return new Date(p.committedAt).getFullYear();
              }
              return new Date().getFullYear(); // Fallback to current year
            })
          ),
        ].sort((a, b) => b - a) // Sort descending
      : [];

  // Calculate total amount
  const totalAmount = penalties.reduce((sum, penalty) => {
    const penaltyType = penalty.penaltyType;
    return sum + (penaltyType?.fee || 0);
  }, 0);

  // Calculate total points
  const totalPoints = penalties.reduce((sum, penalty) => {
    const penaltyType = penalty.penaltyType;
    return sum + (penaltyType?.point || 0);
  }, 0);

  // Get most recent penalty date
  const mostRecentDate =
    penalties.length > 0
      ? new Date(
          Math.max(...penalties.map((p) => new Date(p.committedAt).getTime()))
        )
      : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      {/* Driver Information Card */}
      <Card className="border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-pink-800">
                  {driverName || "Unknown Driver"}
                </CardTitle>
                <CardDescription className="text-pink-600 mt-1 flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  License Number:{" "}
                  <Badge variant="outline" className="ml-2 font-mono bg-white">
                    {driverLicense}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <User className="mr-2 h-4 w-4" />
              View Driver Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">
                Total Penalties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <History className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {totalPenalties}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  ${totalAmount.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">
                  {totalPoints}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="border-0 shadow-md h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 uppercase tracking-wider">
                Most Recent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-pink-600" />
                </div>
                <div className="text-xl font-bold text-gray-800">
                  {mostRecentDate
                    ? format(mostRecentDate, "MMM d, yyyy")
                    : "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Penalty History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <History className="mr-2 h-5 w-5 text-pink-600" />
                  Penalty History
                </CardTitle>
                <CardDescription>
                  Complete record of traffic violations and penalties
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500 mr-2">
                    Filter by year:
                  </span>
                </div>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {penaltyYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                  >
                    All Penalties
                  </TabsTrigger>
                  <TabsTrigger
                    value="paid"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                  >
                    Paid
                  </TabsTrigger>
                  <TabsTrigger
                    value="unpaid"
                    className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                  >
                    Unpaid
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0 p-3">
                <HistoryList
                  driverId={driverId}
                  filterYear={filterYear}
                  filterStatus="all"
                />
              </TabsContent>

              <TabsContent value="paid" className="mt-0 p-3">
                <HistoryList
                  driverId={driverId}
                  filterYear={filterYear}
                  filterStatus="paid"
                />
              </TabsContent>

              <TabsContent value="unpaid" className="mt-0 p-3">
                <HistoryList
                  driverId={driverId}
                  filterYear={filterYear}
                  filterStatus="unpaid"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
