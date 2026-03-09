"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  AlertTriangle,
  Car,
  CheckCircle,
} from "lucide-react";

interface MetricsOverviewProps {
  timeRange: string;
}

export function MetricsOverview({ timeRange }: MetricsOverviewProps) {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$2,380,000",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "green",
      description: "vs last period",
    },
    {
      title: "Total Penalties",
      value: "20,483",
      change: "-8.2%",
      trend: "down" as const,
      icon: FileText,
      color: "pink",
      description: "vs last period",
    },
    {
      title: "Active Drivers",
      value: "17,430",
      change: "+5.1%",
      trend: "up" as const,
      icon: Users,
      color: "purple",
      description: "vs last period",
    },
    {
      title: "Vehicles Tracked",
      value: "19,245",
      change: "+3.8%",
      trend: "up" as const,
      icon: Car,
      color: "indigo",
      description: "vs last period",
    },
    {
      title: "Payment Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "emerald",
      description: "vs last period",
    },
    {
      title: "Pending Reviews",
      value: "432",
      change: "-15.3%",
      trend: "down" as const,
      icon: AlertTriangle,
      color: "amber",
      description: "vs last period",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-100 text-green-600",
      pink: "bg-pink-100 text-pink-600",
      purple: "bg-purple-100 text-purple-600",
      indigo: "bg-indigo-100 text-indigo-600",
      emerald: "bg-emerald-100 text-emerald-600",
      amber: "bg-amber-100 text-amber-600",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600"
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          metric.trend === "up" ? "text-green-600" : "text-red-600";

        return (
          <Card
            key={index}
            className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {metric.title}
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${getColorClasses(
                    metric.color
                  )}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {metric.value}
                  </div>
                  <div className={`flex items-center text-sm ${trendColor}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span className="font-medium">{metric.change}</span>
                    <span className="text-gray-500 ml-1">
                      {metric.description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    metric.trend === "up"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {timeRange === "24h"
                    ? "Last 24h"
                    : timeRange === "7d"
                    ? "Last 7 days"
                    : timeRange === "30d"
                    ? "Last 30 days"
                    : timeRange === "90d"
                    ? "Last 90 days"
                    : "Last year"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
