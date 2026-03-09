"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, FileText, History, Printer } from "lucide-react";
import type { Driver } from "@/types/driver";
import { Plus } from "lucide-react";

interface DriverInfoCardProps {
  driver: Driver;
  showAddToRack?: boolean;
  onAddToRack?: () => void;
}

export function DriverInfoCard({
  driver,
  showAddToRack,
  onAddToRack,
}: DriverInfoCardProps) {
  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-pink-800">
                {driver.name || "Unknown Driver"}
              </CardTitle>
              <CardDescription className="text-pink-600 mt-1 flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                License Number:{" "}
                <Badge variant="outline" className="ml-2 font-mono bg-white">
                  {driver.licenseNumber}
                </Badge>
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Personal Information
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span> {driver.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span>{" "}
                {driver.phoneNumber || "N/A"}
              </p>
              {/* <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {driver.email || "N/A"}
              </p> */}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              License Information
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">License Number:</span>{" "}
                {driver.licenseNumber}
              </p>
              {/* <p className="text-sm text-gray-700">
                <span className="font-medium">Issue Date:</span>{" "}
                {driver.licenseIssueDate || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Expiry Date:</span>{" "}
                {driver.licenseExpiryDate || "N/A"}
              </p> */}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              Penalty Summary
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Total Penalties:</span> 12
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Pending Approval:</span> 2
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Last Penalty:</span> May 15, 2025
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              {showAddToRack && (
                <Button
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={onAddToRack}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Rack
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
