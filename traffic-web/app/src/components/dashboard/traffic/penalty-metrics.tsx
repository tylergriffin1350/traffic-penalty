"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";

interface PenaltyMetricsProps {
  timeRange: string;
}

export function PenaltyMetrics({ timeRange }: PenaltyMetricsProps) {
  const metrics = [
    {
      title: "Total Penalties",
      value: "1,247",
      change: "+8.2%",
      trend: "up" as const,
      icon: FileText,
      color: "pink",
      description: "vs last period",
    },
    {
      title: "Total Amount",
      value: "$186,750",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
      color: "green",
      description: "vs last period",
    },
    {
      title: "Paid Penalties",
      value: "1,089",
      change: "+15.1%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "emerald",
      description: "vs last period",
    },
    {
      title: "Pending Payment",
      value: "158",
      change: "-5.3%",
      trend: "down" as const,
      icon: Clock,
      color: "amber",
      description: "vs last period",
    },
    {
      title: "Disputed Cases",
      value: "23",
      change: "-12.1%",
      trend: "down" as const,
      icon: AlertTriangle,
      color: "red",
      description: "vs last period",
    },
    {
      title: "Unique Drivers",
      value: "892",
      change: "+3.8%",
      trend: "up" as const,
      icon: Users,
      color: "purple",
      description: "vs last period",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      pink: "bg-pink-100 text-pink-600",
      green: "bg-green-100 text-green-600",
      emerald: "bg-emerald-100 text-emerald-600",
      amber: "bg-amber-100 text-amber-600",
      red: "bg-red-100 text-red-600",
      purple: "bg-purple-100 text-purple-600",
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
                    ? "Today"
                    : timeRange === "7d"
                    ? "This week"
                    : timeRange === "30d"
                    ? "This month"
                    : "Last 3 months"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
