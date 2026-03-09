"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Phone,
  Mail,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface HandoverHeaderProps {
  caseData: {
    caseReference: string;
    submissionDate: string;
    deadline: string;
    trafficOfficer: {
      name: string;
      badge: string;
      phone: string;
      email: string;
      department: string;
    };
    totalPenalties: number;
    totalAmount: number;
    status: string;
    priority: string;
  };
  onDownloadReport: () => void;
}

export function HandoverHeader({
  caseData,
  onDownloadReport,
}: HandoverHeaderProps) {
  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-blue-800">
                  Case Handover
                </CardTitle>
                <p className="text-blue-600 font-mono text-lg">
                  {caseData.caseReference}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                className={
                  caseData.status === "Pending Review"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
                }
              >
                {caseData.status}
              </Badge>
              <Badge
                className={
                  caseData.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : caseData.priority === "Medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
                }
              >
                {caseData.priority} Priority
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={onDownloadReport}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Traffic Officer Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <User className="h-4 w-4 mr-1" />
              Traffic Officer
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-800">
                {caseData.trafficOfficer.name}
              </p>
              <p className="text-sm text-gray-600">
                Badge: {caseData.trafficOfficer.badge}
              </p>
              <p className="text-sm text-gray-600">
                {caseData.trafficOfficer.department}
              </p>
              <div className="flex items-center text-sm text-blue-600">
                <Phone className="h-3 w-3 mr-1" />
                <a
                  href={`tel:${caseData.trafficOfficer.phone}`}
                  className="hover:underline"
                >
                  {caseData.trafficOfficer.phone}
                </a>
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Mail className="h-3 w-3 mr-1" />
                <a
                  href={`mailto:${caseData.trafficOfficer.email}`}
                  className="hover:underline"
                >
                  {caseData.trafficOfficer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Case Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Case Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Penalties:</span>
                <span className="font-medium">{caseData.totalPenalties}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="font-medium text-green-600">
                  ${caseData.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Priority:</span>
                <span className="font-medium">{caseData.priority}</span>
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Important Dates
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Submitted</p>
                <p className="text-sm font-medium">
                  {format(
                    new Date(caseData.submissionDate),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Review Deadline</p>
                <p className="text-sm font-medium text-red-600">
                  {format(
                    new Date(caseData.deadline),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Next Steps
            </h3>
            <div className="space-y-2">
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  1. Review all penalties
                </p>
                <p className="text-gray-600">
                  Check violation details and evidence
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  2. Complete checklist
                </p>
                <p className="text-gray-600">Verify compliance requirements</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-800">3. Submit decision</p>
                <p className="text-gray-600">
                  Approve, reject, or request clarification
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
