"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  MoreHorizontal,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Car,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface RecentPenaltiesProps {
  timeRange: string;
  filterType?: "all" | "payments";
}

export function RecentPenalties({
  timeRange,
  filterType = "all",
}: RecentPenaltiesProps) {
  const penalties = [
    {
      id: "TRF-2025-001",
      type: "Speeding Violation",
      driver: "John Smith",
      licenseNumber: "ABC-123",
      vehicle: "Toyota Camry",
      plate: "XYZ-789",
      location: "Highway 101, Mile 24",
      amount: 150.0,
      status: "Unpaid",
      issuedAt: "2025-05-18T14:30:00Z",
      dueDate: "2025-06-18T23:59:59Z",
      paymentMethod: null,
    },
    {
      id: "TRF-2025-002",
      type: "Parking Violation",
      driver: "Maria Garcia",
      licenseNumber: "DEF-456",
      vehicle: "Honda Civic",
      plate: "ABC-456",
      location: "Downtown Plaza",
      amount: 75.0,
      status: "Paid",
      issuedAt: "2025-05-18T13:15:00Z",
      dueDate: "2025-06-18T23:59:59Z",
      paymentMethod: "Credit Card",
    },
    {
      id: "TRF-2025-003",
      type: "Red Light Violation",
      driver: "David Chen",
      licenseNumber: "GHI-789",
      vehicle: "BMW X5",
      plate: "DEF-123",
      location: "Main St & 5th Ave",
      amount: 200.0,
      status: "Pending Review",
      issuedAt: "2025-05-18T12:45:00Z",
      dueDate: "2025-06-18T23:59:59Z",
      paymentMethod: null,
    },
    {
      id: "TRF-2025-004",
      type: "Stop Sign Violation",
      driver: "Sarah Johnson",
      licenseNumber: "JKL-012",
      vehicle: "Ford Explorer",
      plate: "GHI-789",
      location: "Oak Street",
      amount: 125.0,
      status: "Unpaid",
      issuedAt: "2025-05-18T11:20:00Z",
      dueDate: "2025-06-18T23:59:59Z",
      paymentMethod: null,
    },
    {
      id: "TRF-2025-005",
      type: "Parking Violation",
      driver: "Michael Brown",
      licenseNumber: "MNO-345",
      vehicle: "Nissan Altima",
      plate: "JKL-456",
      location: "City Center",
      amount: 50.0,
      status: "Paid",
      issuedAt: "2025-05-18T10:30:00Z",
      dueDate: "2025-06-18T23:59:59Z",
      paymentMethod: "Bank Transfer",
    },
  ];

  const filteredPenalties =
    filterType === "payments"
      ? penalties.filter((p) => p.status === "Paid")
      : penalties;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Unpaid":
        return "bg-red-100 text-red-800";
      case "Pending Review":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "Unpaid":
        return <Clock className="h-4 w-4 mr-1" />;
      case "Pending Review":
        return <FileText className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          {filterType === "payments" ? "Recent Payments" : "Recent Penalties"}
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
        >
          <Eye className="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Penalty ID</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Driver</TableHead>
                  <TableHead className="font-semibold">Vehicle</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPenalties.map((penalty) => (
                  <TableRow key={penalty.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium font-mono text-pink-600">
                      {penalty.id}
                    </TableCell>
                    <TableCell>{penalty.type}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{penalty.driver}</div>
                        <div className="text-sm text-gray-500 font-mono">
                          {penalty.licenseNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{penalty.vehicle}</div>
                          <div className="text-sm text-gray-500 font-mono">
                            {penalty.plate}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{penalty.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="font-medium">
                          ${penalty.amount.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(penalty.status)}>
                        {getStatusIcon(penalty.status)}
                        {penalty.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {format(new Date(penalty.issuedAt), "MMM d, yyyy")}
                        </div>
                        <div className="text-gray-500">
                          {format(new Date(penalty.issuedAt), "h:mm a")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-pink-600 hover:bg-pink-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Edit Penalty
                            </DropdownMenuItem>
                            {penalty.status === "Unpaid" && (
                              <DropdownMenuItem>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Record Payment
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredPenalties.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No penalties found
          </h3>
          <p className="text-gray-500">
            {filterType === "payments"
              ? "No payments recorded for the selected time period."
              : "No penalties issued for the selected time period."}
          </p>
        </div>
      )}
    </div>
  );
}
