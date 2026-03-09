"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Copy,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface DriverHandoverInfoProps {
  driver: {
    licenseNumber: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    licenseExpiry: string;
    violations: number;
    lastViolation: string;
  };
  caseReference: string;
  onDispatchToApprover: () => void;
}

export function DriverHandoverInfo({
  driver,
  caseReference,
  onDispatchToApprover,
}: DriverHandoverInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLicense = async () => {
    await navigator.clipboard.writeText(driver.licenseNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLicenseExpiringSoon =
    new Date(driver.licenseExpiry) <
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
  const hasRecentViolations = driver.violations > 2;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          Driver Information
        </h3>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onDispatchToApprover}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Send to Approver
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Driver Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              Primary Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-lg font-medium text-gray-800">
                  {driver.name}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Driver License Number
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-mono font-medium text-blue-600">
                    {driver.licenseNumber}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyLicense}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click to copy license number
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  License Expiry
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    {format(new Date(driver.licenseExpiry), "MMM d, yyyy")}
                  </p>
                  {isLicenseExpiringSoon && (
                    <Badge className="bg-amber-100 text-amber-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Expiring Soon
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Phone className="h-5 w-5 text-green-600 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-sm font-medium">
                    <a
                      href={`tel:${driver.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {driver.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm font-medium">
                    <a
                      href={`mailto:${driver.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {driver.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-sm font-medium text-gray-800">
                    {driver.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Violation History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
              Violation History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Total Violations
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-800">
                    {driver.violations}
                  </p>
                  {hasRecentViolations && (
                    <Badge className="bg-red-100 text-red-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      High
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Last Violation
                </label>
                <p className="text-sm font-medium">
                  {format(new Date(driver.lastViolation), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Risk Assessment
              </h5>
              <div className="flex items-center gap-2">
                {hasRecentViolations ? (
                  <>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">
                      High Risk - Multiple violations
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">
                      Low Risk - Few violations
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Connection */}
        <Card className="border-0 shadow-sm bg-purple-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              Case Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Handover Reference
                </label>
                <p className="text-lg font-mono font-medium text-purple-600">
                  {caseReference}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Ready for Dispatch
                </label>
                <p className="text-sm text-gray-700">
                  This driver information will be automatically populated in the
                  approver system
                </p>
              </div>

              <div className="bg-white p-3 rounded-md border border-purple-200">
                <h5 className="text-sm font-medium text-purple-700 mb-2">
                  Next Steps
                </h5>
                <ol className="text-sm text-purple-600 space-y-1">
                  <li>1. Review all penalty details</li>
                  <li>2. Complete verification checklist</li>
                  <li>
                    3. Dispatch to approver with license:{" "}
                    <span className="font-mono">{driver.licenseNumber}</span>
                  </li>
                  <li>4. Approver will search and process</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Driver
            </Button>
            <Button
              variant="outline"
              className="justify-start border-green-200 text-green-700 hover:bg-green-50"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Driver
            </Button>
            <Button
              variant="outline"
              className="justify-start border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <User className="mr-2 h-4 w-4" />
              View Full Profile
            </Button>
            <Button
              className="justify-start bg-purple-600 hover:bg-purple-700 text-white"
              onClick={onDispatchToApprover}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Dispatch Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
