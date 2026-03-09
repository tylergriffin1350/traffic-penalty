"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  Download,
  MapPin,
  Car,
  Calendar,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

// Mock penalty data
const mockPenalties = [
  {
    id: "PEN-001",
    violationType: "Speeding",
    fineAmount: 150.0,
    violationDate: "2025-06-08T14:30:00Z",
    location: "Main St & 5th Ave",
    vehicle: {
      plate: "ABC-123",
      make: "Toyota",
      model: "Camry",
      year: "2020",
    },
    status: "Under Review",
    evidence: ["photo1.jpg", "radar_reading.pdf"],
    notes: "Driver was going 45 mph in a 25 mph zone",
  },
  {
    id: "PEN-002",
    violationType: "Illegal Parking",
    fineAmount: 75.0,
    violationDate: "2025-06-08T16:45:00Z",
    location: "City Hall Parking Lot",
    vehicle: {
      plate: "XYZ-789",
      make: "Honda",
      model: "Civic",
      year: "2019",
    },
    status: "Pending",
    evidence: ["parking_violation.jpg"],
    notes: "Parked in handicap space without permit",
  },
  {
    id: "PEN-003",
    violationType: "Red Light Violation",
    fineAmount: 200.0,
    violationDate: "2025-06-09T09:15:00Z",
    location: "Broadway & 2nd St",
    vehicle: {
      plate: "DEF-456",
      make: "Ford",
      model: "F-150",
      year: "2021",
    },
    status: "Under Review",
    evidence: ["red_light_camera.mp4", "intersection_photo.jpg"],
    notes: "Vehicle ran red light 2.3 seconds after signal change",
  },
];

interface PenaltyListProps {
  selectedPenalties: string[];
  onPenaltySelection: (penaltyId: string, selected: boolean) => void;
}

export function PenaltyList({
  selectedPenalties,
  onPenaltySelection,
}: PenaltyListProps) {
  const [expandedPenalty, setExpandedPenalty] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-amber-100 text-amber-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getViolationTypeColor = (type: string) => {
    switch (type) {
      case "Speeding":
        return "bg-red-100 text-red-800";
      case "Illegal Parking":
        return "bg-orange-100 text-orange-800";
      case "Red Light Violation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          Penalty Details ({mockPenalties.length} penalties)
        </h3>
        <div className="text-sm text-gray-600">
          {selectedPenalties.length} selected
        </div>
      </div>

      {mockPenalties.map((penalty) => (
        <Card
          key={penalty.id}
          className="border border-gray-200 hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedPenalties.includes(penalty.id)}
                  onCheckedChange={(checked) =>
                    onPenaltySelection(penalty.id, checked as boolean)
                  }
                />
                <div>
                  <CardTitle className="text-lg font-medium">
                    {penalty.id}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={getViolationTypeColor(penalty.violationType)}
                    >
                      {penalty.violationType}
                    </Badge>
                    <Badge className={getStatusColor(penalty.status)}>
                      {penalty.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">
                    ${penalty.fineAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Fine Amount</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setExpandedPenalty(
                      expandedPenalty === penalty.id ? null : penalty.id
                    )
                  }
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Violation Details */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Violation Details
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">Date:</span>{" "}
                    {format(
                      new Date(penalty.violationDate),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                    <span className="text-gray-500">Location:</span>{" "}
                    {penalty.location}
                  </p>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  Vehicle Information
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">Plate:</span>{" "}
                    <span className="font-mono font-medium">
                      {penalty.vehicle.plate}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-500">Vehicle:</span>{" "}
                    {penalty.vehicle.year} {penalty.vehicle.make}{" "}
                    {penalty.vehicle.model}
                  </p>
                </div>
              </div>

              {/* Evidence & Actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Evidence ({penalty.evidence.length})
                </h4>
                <div className="space-y-1">
                  {penalty.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 truncate">{file}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedPenalty === penalty.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Officer Notes
                  </h5>
                  <p className="text-sm text-gray-600">{penalty.notes}</p>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Evidence
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
