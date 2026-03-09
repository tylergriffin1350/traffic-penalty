"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Interface for Reversal Followup
interface ReversalFollowup {
  id: string;
  date: string;
  reason: string;
  amount: number;
  status: "Approved" | "Rejected" | "Pending Review";
  requestedBy: string;
}

// Mock data for reversal followups
const reversalFollowups: ReversalFollowup[] = [
  {
    id: "REV-2025-001",
    date: "May 15, 2025",
    reason: "Incorrect vehicle identification",
    amount: 150,
    status: "Approved",
    requestedBy: "John Smith",
  },
  {
    id: "REV-2025-002",
    date: "May 16, 2025",
    reason: "Medical emergency",
    amount: 200,
    status: "Pending Review",
    requestedBy: "Maria Garcia",
  },
  {
    id: "REV-2025-003",
    date: "May 17, 2025",
    reason: "Stolen vehicle report filed",
    amount: 175,
    status: "Approved",
    requestedBy: "David Chen",
  },
  {
    id: "REV-2025-004",
    date: "May 18, 2025",
    reason: "Insufficient evidence",
    amount: 125,
    status: "Rejected",
    requestedBy: "Sarah Johnson",
  },
];

export function ReversalFollowups() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          Penalty Reversal Followups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reversalFollowups.map((reversal) => (
            <div
              key={reversal.id}
              className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-pink-100 mr-3">
                    <RotateCcw size={18} className="text-pink-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{reversal.id}</h3>
                    <p className="text-sm text-gray-600">{reversal.date}</p>
                  </div>
                </div>
                <Badge
                  className={
                    reversal.status === "Approved"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : reversal.status === "Rejected"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }
                >
                  {reversal.status === "Approved" ? (
                    <CheckCircle size={14} className="mr-1" />
                  ) : reversal.status === "Rejected" ? (
                    <XCircle size={14} className="mr-1" />
                  ) : (
                    <AlertCircle size={14} className="mr-1" />
                  )}
                  {reversal.status}
                </Badge>
              </div>
              <div className="ml-9">
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Reason:</span> {reversal.reason}
                </p>
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Amount:</span> $
                  {reversal.amount}
                </p>
                <p className="text-sm text-gray-800 mb-2">
                  <span className="font-medium">Requested by:</span>{" "}
                  {reversal.requestedBy}
                </p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-600 hover:text-pink-800 hover:bg-pink-50"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
