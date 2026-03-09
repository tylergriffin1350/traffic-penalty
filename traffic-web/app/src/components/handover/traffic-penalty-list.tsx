"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Calendar,
  MapPin,
  Car,
  DollarSign,
  Eye,
  Download,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

// Mock penalty data
const mockPenalties = [
  {
    id: "PEN-001",
    type: "Speeding",
    amount: 150.0,
    date: "2025-06-15T10:30:00Z",
    location: "Main Street & 5th Avenue",
    vehicle: {
      plate: "ABC-123",
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    status: "Pending",
    evidence: ["photo1.jpg", "radar_reading.pdf"],
    officerNotes: "Driver was exceeding speed limit by 15 mph in school zone",
  },
  {
    id: "PEN-002",
    type: "Parking Violation",
    amount: 75.0,
    date: "2025-06-14T14:15:00Z",
    location: "City Hall Parking Lot",
    vehicle: {
      plate: "ABC-123",
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    status: "Pending",
    evidence: ["parking_photo.jpg"],
    officerNotes: "Vehicle parked in handicap space without permit",
  },
  {
    id: "PEN-003",
    type: "Red Light Violation",
    amount: 200.0,
    date: "2025-06-13T16:45:00Z",
    location: "Oak Street & Park Avenue",
    vehicle: {
      plate: "ABC-123",
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    status: "Under Review",
    evidence: ["traffic_cam_video.mp4", "intersection_photo.jpg"],
    officerNotes: "Vehicle ran red light, clear video evidence available",
  },
];

interface TrafficPenaltyListProps {
  driverLicense: {
    type: "licenseNumber" | "phoneNumber";
    value: string;
  } | null;
  selectedPenalties: string[];
  onPenaltySelection: (penaltyId: string, selected: boolean) => void;
}

export function TrafficPenaltyList({
  driverLicense,
  selectedPenalties,
  onPenaltySelection,
}: TrafficPenaltyListProps) {
  const [expandedPenalty, setExpandedPenalty] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    mockPenalties.forEach((penalty) => {
      if (checked && !selectedPenalties.includes(penalty.id)) {
        onPenaltySelection(penalty.id, true);
      } else if (!checked && selectedPenalties.includes(penalty.id)) {
        onPenaltySelection(penalty.id, false);
      }
    });
  };

  const allSelected =
    mockPenalties.length > 0 &&
    mockPenalties.every((p) => selectedPenalties.includes(p.id));
  const someSelected = selectedPenalties.length > 0 && !allSelected;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Traffic Penalties</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={allSelected}
              onCheckedChange={handleSelectAll}
              className={someSelected ? "data-[state=checked]:bg-blue-600" : ""}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All ({selectedPenalties.length}/{mockPenalties.length})
            </label>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            Total: $
            {mockPenalties.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {mockPenalties.map((penalty) => (
          <Card key={penalty.id} className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedPenalties.includes(penalty.id)}
                    onCheckedChange={(checked) =>
                      onPenaltySelection(penalty.id, !!checked)
                    }
                  />
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-600" />
                      {penalty.type}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Penalty ID: {penalty.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      penalty.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : penalty.status === "Under Review"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {penalty.status}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <DollarSign className="h-3 w-3 mr-1" />$
                    {penalty.amount.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-sm font-medium">
                      {format(
                        new Date(penalty.date),
                        "MMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{penalty.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Car className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Vehicle</p>
                    <p className="text-sm font-medium">
                      {penalty.vehicle.plate} - {penalty.vehicle.year}{" "}
                      {penalty.vehicle.make} {penalty.vehicle.model}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Evidence</p>
                    <p className="text-sm font-medium">
                      {penalty.evidence.length} files
                    </p>
                  </div>
                </div>
              </div>

              {penalty.officerNotes && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">Officer Notes</p>
                  <p className="text-sm">{penalty.officerNotes}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  {penalty.evidence.map((file, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {file}
                    </Button>
                  ))}
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
                  <Eye className="h-4 w-4 mr-1" />
                  {expandedPenalty === penalty.id
                    ? "Hide Details"
                    : "View Details"}
                </Button>
              </div>

              {expandedPenalty === penalty.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <h5 className="font-medium text-blue-800 mb-2">
                    Additional Details
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-blue-600 font-medium">
                        Violation Details
                      </p>
                      <p>Type: {penalty.type}</p>
                      <p>Fine Amount: ${penalty.amount.toFixed(2)}</p>
                      <p>Status: {penalty.status}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">
                        Processing Info
                      </p>
                      <p>
                        Created: {format(new Date(penalty.date), "MMM d, yyyy")}
                      </p>
                      <p>Evidence Count: {penalty.evidence.length}</p>
                      <p>
                        Ready for Rack:{" "}
                        {selectedPenalties.includes(penalty.id) ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {mockPenalties.length === 0 && (
        <Card className="border-0 shadow-sm bg-gray-50">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Penalties Found
            </h3>
            <p className="text-gray-500">
              No traffic penalties found for this driver.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
