"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Interface for Incident Report
interface IncidentReport {
  id: string;
  date: string;
  location: string;
  type: string;
  status: "Pending" | "In Progress" | "Resolved";
  severity: "High" | "Medium" | "Low";
}

// Mock data for incident reports
const incidentReports: IncidentReport[] = [
  {
    id: "IR-2025-001",
    date: "May 15, 2025",
    location: "Main St & 5th Ave",
    type: "Traffic Light Malfunction",
    status: "Resolved",
    severity: "High",
  },
  {
    id: "IR-2025-002",
    date: "May 16, 2025",
    location: "Highway 101, Mile 24",
    type: "Road Obstruction",
    status: "In Progress",
    severity: "Medium",
  },
  {
    id: "IR-2025-003",
    date: "May 17, 2025",
    location: "Downtown Plaza",
    type: "Parking Violation Dispute",
    status: "Pending",
    severity: "Low",
  },
  {
    id: "IR-2025-004",
    date: "May 18, 2025",
    location: "Central Park West",
    type: "Speed Camera Malfunction",
    status: "In Progress",
    severity: "Medium",
  },
];

export function IncidentReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          Recent Incident Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidentReports.map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-pink-100 mr-3">
                    <FileText size={18} className="text-pink-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{incident.id}</h3>
                    <p className="text-sm text-gray-600">{incident.date}</p>
                  </div>
                </div>
                <Badge
                  className={
                    incident.severity === "High"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : incident.severity === "Medium"
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                  }
                >
                  {incident.severity} Severity
                </Badge>
              </div>
              <div className="ml-9">
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-medium">Type:</span> {incident.type}
                </p>
                <p className="text-sm text-gray-800 mb-2">
                  <span className="font-medium">Location:</span>{" "}
                  {incident.location}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <Badge
                    className={
                      incident.status === "Resolved"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : incident.status === "In Progress"
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }
                  >
                    {incident.status === "Resolved" ? (
                      <CheckCircle size={14} className="mr-1" />
                    ) : incident.status === "In Progress" ? (
                      <Clock size={14} className="mr-1" />
                    ) : (
                      <AlertTriangle size={14} className="mr-1" />
                    )}
                    {incident.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-600 hover:text-pink-800 hover:bg-pink-100"
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
