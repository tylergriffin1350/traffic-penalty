"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  FileClock,
  ClipboardList,
  Play,
  FileX,
} from "lucide-react";
import { format } from "date-fns";

const mockApprovalHistory = [
  {
    id: "APV-001",
    action: "Document Verification",
    status: "Completed",
    by: "Sarah Johnson",
    date: "2025-05-16T11:20:00Z",
    notes: "All documents verified and approved.",
  },
  {
    id: "APV-002",
    action: "Payment Verification",
    status: "Pending",
    by: "Michael Chen",
    date: "2025-05-18T15:10:00Z",
    notes: "Waiting for payment confirmation from bank.",
  },
  {
    id: "APV-003",
    action: "Final Approval",
    status: "Not Started",
    by: null,
    date: null,
    notes: null,
  },
];

export function ApprovalProcess() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Approval Process</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            View Checklist
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-200"></div>
        <div className="space-y-6 relative">
          {mockApprovalHistory.map((step: any) => (
            <div key={step.id} className="flex gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  step.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "Pending"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "Completed" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : step.status === "Pending" ? (
                  <Clock className="h-5 w-5" />
                ) : (
                  <FileClock className="h-5 w-5" />
                )}
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{step.action}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.status === "Completed" ? (
                        <>
                          Completed by {step.by} on{" "}
                          {format(new Date(step.date), "MMM d, yyyy")}
                        </>
                      ) : step.status === "Pending" ? (
                        <>
                          In progress by {step.by} since{" "}
                          {format(new Date(step.date), "MMM d, yyyy")}
                        </>
                      ) : (
                        <>Waiting to be started</>
                      )}
                    </p>
                  </div>
                  <Badge
                    className={
                      step.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : step.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {step.status}
                  </Badge>
                </div>
                {step.notes && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm">
                    <p className="text-gray-700">{step.notes}</p>
                  </div>
                )}
                {step.status === "Not Started" && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start This Step
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Approval Requirements
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <p className="text-sm text-gray-700">
                All required documents verified
              </p>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <p className="text-sm text-gray-700">
                Driver information confirmed
              </p>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-600 mr-2" />
              <p className="text-sm text-gray-700">
                Payment verification pending
              </p>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-sm text-gray-700">
                Final approval by supervisor
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Final Approval
          </h4>
          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Approval Process
            </Button>
            <Button
              variant="outline"
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Clock className="mr-2 h-4 w-4" />
              Request Additional Review
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              <FileX className="mr-2 h-4 w-4" />
              Reject and Close Case
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
