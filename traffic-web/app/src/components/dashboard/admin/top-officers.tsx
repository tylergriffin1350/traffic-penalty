"use client";

import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Interface for Top Officers Data
interface TopOfficer {
  id: string;
  name: string;
  penalties: number;
  status: "High" | "Medium" | "Low";
  avatarInitials: string;
}

// Mock data for top performing officers
const topOfficers: TopOfficer[] = [
  {
    id: "TR-3-79637",
    name: "John Smith",
    penalties: 30,
    status: "High",
    avatarInitials: "JS",
  },
  {
    id: "TR-3-79622",
    name: "Maria Garcia",
    penalties: 27,
    status: "High",
    avatarInitials: "MG",
  },
  {
    id: "TR-3-79633",
    name: "David Chen",
    penalties: 34,
    status: "High",
    avatarInitials: "DC",
  },
  {
    id: "TR-3-79639",
    name: "Sarah Johnson",
    penalties: 32,
    status: "High",
    avatarInitials: "SJ",
  },
  {
    id: "TR-3-79640",
    name: "Michael Brown",
    penalties: 12,
    status: "Medium",
    avatarInitials: "MB",
  },
];

export function TopOfficers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-600">
          Top Performing Officers
        </CardTitle>
        <Button
          variant="ghost"
          className="text-pink-600 hover:text-pink-800 hover:bg-pink-50"
        >
          View all <ArrowRight size={16} className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topOfficers.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center justify-between p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-all duration-200"
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4 bg-pink-100 text-pink-700">
                  <AvatarFallback>{officer.avatarInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-800 text-md">
                    {officer.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {officer.id} • {officer.penalties} penalties
                  </p>
                </div>
              </div>
              <Badge
                className={
                  officer.status === "High"
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : officer.status === "Medium"
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }
              >
                {officer.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
