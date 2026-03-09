"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

interface HandoverSummaryProps {
  caseData: {
    caseReference: string;
    submissionDate: string;
    deadline: string;
    totalPenalties: number;
    totalAmount: number;
    status: string;
    priority: string;
  };
  selectedCount: number;
  checklistComplete: boolean;
}

export function HandoverSummary({
  caseData,
  selectedCount,
  checklistComplete,
}: HandoverSummaryProps) {
  const daysUntilDeadline = Math.ceil(
    (new Date(caseData.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const progressPercentage = checklistComplete
    ? 100
    : selectedCount > 0
    ? 50
    : 0;

  return (
    <div className="space-y-4">
      {/* Case Overview */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Case Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reference:</span>
              <span className="font-mono text-sm font-medium">
                {caseData.caseReference}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Penalties:</span>
              <Badge className="bg-blue-100 text-blue-800">
                {caseData.totalPenalties}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Amount:</span>
              <span className="font-medium text-green-600">
                ${caseData.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Selected:</span>
              <Badge
                className={
                  selectedCount > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {selectedCount} of {caseData.totalPenalties}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Review Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completion</span>
              <span>{progressPercentage}%</span>
            </div>
            {/* <Progress value={progressPercentage} className="h-2" /> */}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Penalties Selected:</span>
              <div className="flex items-center">
                {selectedCount > 0 ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                )}
                <span className="text-sm">
                  {selectedCount > 0 ? "Complete" : "Pending"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Checklist:</span>
              <div className="flex items-center">
                {checklistComplete ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                )}
                <span className="text-sm">
                  {checklistComplete ? "Complete" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deadline Alert */}
      <Card
        className={`border-0 shadow-md ${
          daysUntilDeadline <= 2
            ? "bg-red-50"
            : daysUntilDeadline <= 5
            ? "bg-amber-50"
            : "bg-green-50"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            {daysUntilDeadline <= 2 ? (
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            ) : daysUntilDeadline <= 5 ? (
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
            ) : (
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
            )}
            <span
              className={`font-medium ${
                daysUntilDeadline <= 2
                  ? "text-red-800"
                  : daysUntilDeadline <= 5
                  ? "text-amber-800"
                  : "text-green-800"
              }`}
            >
              Review Deadline
            </span>
          </div>
          <p
            className={`text-sm ${
              daysUntilDeadline <= 2
                ? "text-red-700"
                : daysUntilDeadline <= 5
                ? "text-amber-700"
                : "text-green-700"
            }`}
          >
            {format(new Date(caseData.deadline), "MMM d, yyyy 'at' h:mm a")}
          </p>
          <Badge
            className={`mt-2 ${
              daysUntilDeadline <= 2
                ? "bg-red-100 text-red-800"
                : daysUntilDeadline <= 5
                ? "bg-amber-100 text-amber-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {daysUntilDeadline} days remaining
          </Badge>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="mb-2">
              <Badge
                className={
                  checklistComplete && selectedCount > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }
              >
                {checklistComplete && selectedCount > 0
                  ? "Ready for Submission"
                  : "Review in Progress"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              {checklistComplete && selectedCount > 0
                ? "All requirements met. Ready to submit for approval."
                : "Complete the checklist and select penalties to proceed."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
