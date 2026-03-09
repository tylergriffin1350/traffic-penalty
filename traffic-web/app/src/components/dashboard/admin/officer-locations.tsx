"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Interface for Officer Location
interface OfficerLocation {
  id: string;
  name: string;
  location: string;
  status: "Active" | "On Break" | "Off Duty";
  lastUpdated: string;
  assignedArea: string;
}

// Mock data for officer locations
const officerLocations: OfficerLocation[] = [
  {
    id: "OFF-001",
    name: "John Smith",
    location: "Main St & 5th Ave",
    status: "Active",
    lastUpdated: "10 minutes ago",
    assignedArea: "Downtown",
  },
  {
    id: "OFF-002",
    name: "Maria Garcia",
    location: "Highway 101, Mile 24",
    status: "Active",
    lastUpdated: "5 minutes ago",
    assignedArea: "Highway Patrol",
  },
  {
    id: "OFF-003",
    name: "David Chen",
    location: "Central Park",
    status: "On Break",
    lastUpdated: "15 minutes ago",
    assignedArea: "Park District",
  },
  {
    id: "OFF-004",
    name: "Sarah Johnson",
    location: "Shopping Mall Parking",
    status: "Active",
    lastUpdated: "2 minutes ago",
    assignedArea: "Commercial District",
  },
  {
    id: "OFF-005",
    name: "Michael Brown",
    location: "School Zone, Elementary",
    status: "Off Duty",
    lastUpdated: "1 hour ago",
    assignedArea: "School District",
  },
];

export function OfficerLocations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          Officer Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {officerLocations.map((officer) => (
            <div
              key={officer.id}
              className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-pink-100 mr-3">
                    <User size={18} className="text-pink-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {officer.name}
                    </h3>
                    <p className="text-sm text-gray-600">{officer.id}</p>
                  </div>
                </div>
                <Badge
                  className={
                    officer.status === "Active"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : officer.status === "On Break"
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                >
                  {officer.status}
                </Badge>
              </div>
              <div className="ml-9">
                <div className="flex items-center text-sm text-gray-800 mb-1">
                  <MapPin size={14} className="mr-1 text-pink-600" />
                  <span className="font-medium">Location:</span>{" "}
                  {officer.location}
                </div>
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Area:</span>{" "}
                  {officer.assignedArea}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Last updated: {officer.lastUpdated}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
