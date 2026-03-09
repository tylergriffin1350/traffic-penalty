"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Clock,
  Server,
  Database,
  Wifi,
  Shield,
  X,
} from "lucide-react";
import { format } from "date-fns";

export function SystemAlerts() {
  const alerts = [
    {
      id: "ALT-001",
      type: "warning",
      title: "High System Load",
      description:
        "Payment processing system experiencing high load. Response times may be slower than usual.",
      timestamp: "2025-05-18T14:30:00Z",
      severity: "medium",
      category: "performance",
      icon: Server,
      actions: ["View Details", "Acknowledge"],
    },
    {
      id: "ALT-002",
      type: "error",
      title: "Database Connection Issue",
      description:
        "Intermittent connection issues with the penalty database. Some queries may fail.",
      timestamp: "2025-05-18T13:15:00Z",
      severity: "high",
      category: "database",
      icon: Database,
      actions: ["Investigate", "Escalate"],
    },
    {
      id: "ALT-003",
      type: "info",
      title: "Scheduled Maintenance",
      description:
        "System maintenance scheduled for tonight at 2:00 AM. Expected downtime: 30 minutes.",
      timestamp: "2025-05-18T12:00:00Z",
      severity: "low",
      category: "maintenance",
      icon: Info,
      actions: ["View Schedule", "Notify Users"],
    },
    {
      id: "ALT-004",
      type: "success",
      title: "Security Scan Completed",
      description:
        "Weekly security scan completed successfully. No vulnerabilities detected.",
      timestamp: "2025-05-18T10:30:00Z",
      severity: "low",
      category: "security",
      icon: Shield,
      actions: ["View Report"],
    },
    {
      id: "ALT-005",
      type: "warning",
      title: "Network Latency",
      description:
        "Increased network latency detected in the eastern region. Monitoring situation.",
      timestamp: "2025-05-18T09:45:00Z",
      severity: "medium",
      category: "network",
      icon: Wifi,
      actions: ["Monitor", "Check Status"],
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-600 border-red-200";
      case "warning":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "success":
        return "bg-green-100 text-green-600 border-green-200";
      case "info":
        return "bg-pink-100 text-pink-600 border-pink-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance":
        return <Server className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "network":
        return <Wifi className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      case "maintenance":
        return <Clock className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">System Alerts</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-100 text-red-800">
            {alerts.filter((a) => a.severity === "high").length} High
          </Badge>
          <Badge className="bg-amber-100 text-amber-800">
            {alerts.filter((a) => a.severity === "medium").length} Medium
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const CategoryIcon = alert.icon;
          return (
            <Card
              key={alert.id}
              className={`border-l-4 ${getAlertColor(alert.type)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`p-2 rounded-full ${getAlertColor(
                        alert.type
                      )}`}
                    >
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {alert.title}
                        </h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <div className="flex items-center space-x-1 text-gray-500">
                          {getCategoryIcon(alert.category)}
                          <span className="text-xs capitalize">
                            {alert.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {format(new Date(alert.timestamp), "MMM d, h:mm a")}
                        </span>
                        <div className="flex items-center space-x-2">
                          {alert.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-green-800">
              System Health
            </h4>
            <p className="text-2xl font-bold text-green-800">98.5%</p>
            <p className="text-xs text-green-700">All systems operational</p>
          </CardContent>
        </Card>
        <Card className="border border-pink-200 bg-pink-50">
          <CardContent className="p-4 text-center">
            <Server className="h-8 w-8 text-pink-600 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-pink-800">Server Load</h4>
            <p className="text-2xl font-bold text-pink-800">67%</p>
            <p className="text-xs text-pink-700">Normal operation</p>
          </CardContent>
        </Card>
        <Card className="border border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-purple-800">Database</h4>
            <p className="text-2xl font-bold text-purple-800">Active</p>
            <p className="text-xs text-purple-700">Response time: 45ms</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
