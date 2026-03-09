"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Users,
  Settings,
  Download,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

export function QuickActions() {
  const quickStats = [
    {
      label: "Pending Approvals",
      value: "23",
      color: "amber",
      icon: Clock,
    },
    {
      label: "Active Alerts",
      value: "5",
      color: "red",
      icon: AlertTriangle,
    },
    {
      label: "Completed Today",
      value: "127",
      color: "green",
      icon: CheckCircle,
    },
  ];

  const actions = [
    {
      title: "Issue New Penalty",
      description: "Create a new traffic penalty",
      icon: Plus,
      color: "blue",
      action: () => console.log("Issue penalty"),
    },
    {
      title: "Search Driver",
      description: "Look up driver information",
      icon: Search,
      color: "purple",
      action: () => console.log("Search driver"),
    },
    {
      title: "Generate Report",
      description: "Create performance report",
      icon: BarChart3,
      color: "green",
      action: () => console.log("Generate report"),
    },
    {
      title: "Manage Officers",
      description: "View and manage officers",
      icon: Users,
      color: "indigo",
      action: () => console.log("Manage officers"),
    },
    {
      title: "Export Data",
      description: "Download system data",
      icon: Download,
      color: "gray",
      action: () => console.log("Export data"),
    },
    {
      title: "System Settings",
      description: "Configure system options",
      icon: Settings,
      color: "slate",
      action: () => console.log("System settings"),
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
      purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
      green: "bg-green-100 text-green-600 hover:bg-green-200",
      indigo: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
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
            Quick Stats
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

      {/* Recent Shortcuts */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  Penalty #TRF-2025-042
                </span>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  Officer John Smith
                </span>
              </div>
              <span className="text-xs text-gray-500">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">Weekly Report</span>
              </div>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
