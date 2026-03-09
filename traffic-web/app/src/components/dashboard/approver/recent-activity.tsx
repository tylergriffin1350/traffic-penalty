"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  User,
  Clock,
  MoreHorizontal,
  Eye,
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

interface RecentActivityProps {
  timeRange: string;
}

export function RecentActivity({ timeRange }: RecentActivityProps) {
  const activities = [
    {
      id: "ACT-001",
      type: "penalty_issued",
      title: "New penalty issued",
      description: "Speeding violation on Highway 101",
      user: "Officer John Smith",
      userInitials: "JS",
      amount: "$150.00",
      timestamp: "2025-05-18T14:30:00Z",
      status: "pending",
      details: {
        licenseNumber: "ABC-123",
        location: "Highway 101, Mile 24",
      },
    },
    {
      id: "ACT-002",
      type: "payment_received",
      title: "Payment received",
      description: "Parking violation payment processed",
      user: "System",
      userInitials: "SY",
      amount: "$75.00",
      timestamp: "2025-05-18T13:45:00Z",
      status: "completed",
      details: {
        licenseNumber: "XYZ-789",
        paymentMethod: "Credit Card",
      },
    },
    {
      id: "ACT-003",
      type: "penalty_approved",
      title: "Penalty approved",
      description: "Red light violation approved by supervisor",
      user: "Sarah Johnson",
      userInitials: "SJ",
      amount: "$200.00",
      timestamp: "2025-05-18T12:20:00Z",
      status: "approved",
      details: {
        licenseNumber: "DEF-456",
        approver: "Sarah Johnson",
      },
    },
    {
      id: "ACT-004",
      type: "dispute_filed",
      title: "Dispute filed",
      description: "Driver disputed parking violation",
      user: "Maria Garcia",
      userInitials: "MG",
      amount: "$50.00",
      timestamp: "2025-05-18T11:15:00Z",
      status: "review",
      details: {
        licenseNumber: "GHI-789",
        reason: "Vehicle was not parked illegally",
      },
    },
    {
      id: "ACT-005",
      type: "officer_login",
      title: "Officer logged in",
      description: "Started patrol shift in Downtown district",
      user: "Michael Chen",
      userInitials: "MC",
      amount: null,
      timestamp: "2025-05-18T10:00:00Z",
      status: "active",
      details: {
        district: "Downtown",
        shiftStart: "10:00 AM",
      },
    },
    {
      id: "ACT-006",
      type: "system_alert",
      title: "System maintenance",
      description: "Scheduled maintenance completed successfully",
      user: "System Admin",
      userInitials: "SA",
      amount: null,
      timestamp: "2025-05-18T09:30:00Z",
      status: "completed",
      details: {
        duration: "30 minutes",
        affectedSystems: "Payment processing",
      },
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "penalty_issued":
        return <FileText className="h-4 w-4" />;
      case "payment_received":
        return <DollarSign className="h-4 w-4" />;
      case "penalty_approved":
        return <CheckCircle className="h-4 w-4" />;
      case "dispute_filed":
        return <AlertTriangle className="h-4 w-4" />;
      case "officer_login":
        return <User className="h-4 w-4" />;
      case "system_alert":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "review":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "penalty_issued":
        return "bg-red-100 text-red-600";
      case "payment_received":
        return "bg-green-100 text-green-600";
      case "penalty_approved":
        return "bg-blue-100 text-blue-600";
      case "dispute_filed":
        return "bg-amber-100 text-amber-600";
      case "officer_login":
        return "bg-purple-100 text-purple-600";
      case "system_alert":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
        <Button
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Eye className="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </h4>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                      {activity.amount && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                            {activity.userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{activity.user}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {format(new Date(activity.timestamp), "MMM d, h:mm a")}
                      </span>
                      {activity.details.licenseNumber && (
                        <>
                          <span>•</span>
                          <span className="font-mono">
                            {activity.details.licenseNumber}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                      View Record
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          className="border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Load More Activities
        </Button>
      </div>
    </div>
  );
}
