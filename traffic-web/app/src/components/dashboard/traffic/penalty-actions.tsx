"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  History,
  Download,
  Settings,
} from "lucide-react";

export function PenaltyActions() {
  const quickStats = [
    {
      label: "Today's Penalties",
      value: "23",
      color: "pink",
      icon: FileText,
    },
    {
      label: "Pending Review",
      value: "5",
      color: "amber",
      icon: Clock,
    },
    {
      label: "Payment Due",
      value: "12",
      color: "red",
      icon: AlertTriangle,
    },
  ];

  const actions = [
    {
      title: "Issue New Penalty",
      description: "Create a new traffic penalty",
      icon: Plus,
      color: "pink",
      action: () => (window.location.href = "/penality"),
    },
    {
      title: "Search Driver",
      description: "Look up driver by license",
      icon: Search,
      color: "purple",
      action: () => (window.location.href = "/penality"),
    },
    {
      title: "View History",
      description: "Browse penalty history",
      icon: History,
      color: "green",
      action: () => console.log("View history"),
    },
    {
      title: "Payment Records",
      description: "Check payment status",
      icon: DollarSign,
      color: "emerald",
      action: () => console.log("Payment records"),
    },
    {
      title: "Export Data",
      description: "Download penalty reports",
      icon: Download,
      color: "gray",
      action: () => console.log("Export data"),
    },
    {
      title: "Settings",
      description: "Configure preferences",
      icon: Settings,
      color: "slate",
      action: () => console.log("Settings"),
    },
  ];

  const recentActions = [
    {
      action: "Penalty Issued",
      target: "TRF-2025-001",
      time: "2 min ago",
      icon: FileText,
    },
    {
      action: "Payment Received",
      target: "TRF-2025-002",
      time: "15 min ago",
      icon: DollarSign,
    },
    {
      action: "Driver Search",
      target: "ABC-123",
      time: "1 hour ago",
      icon: Search,
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      pink: "bg-pink-100 text-pink-600 hover:bg-pink-200",
      purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
      green: "bg-green-100 text-green-600 hover:bg-green-200",
      emerald: "bg-emerald-100 text-emerald-600 hover:bg-emerald-200",
      gray: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      slate: "bg-slate-100 text-slate-600 hover:bg-slate-200",
      amber: "bg-amber-100 text-amber-600",
      red: "bg-red-100 text-red-600",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600"
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${getColorClasses(
                      stat.color
                    )}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </span>
                </div>
                <Badge className={getColorClasses(stat.color)}>
                  {stat.value}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                onClick={action.action}
              >
                <div
                  className={`p-2 rounded-full mr-3 ${getColorClasses(
                    action.color
                  )}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {recentActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.action}
                      </span>
                      <div className="text-xs text-gray-500">{item.target}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-green-800">Active</div>
              <div className="text-xs text-green-600">System Online</div>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <FileText className="h-6 w-6 text-pink-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-pink-800">Ready</div>
              <div className="text-xs text-pink-600">Issue Penalties</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
