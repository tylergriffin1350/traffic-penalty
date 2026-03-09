"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type TooltipProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface PerformanceChartsProps {
  timeRange: string;
  detailed?: boolean;
}

export function PerformanceCharts({
  timeRange,
  detailed = false,
}: PerformanceChartsProps) {
  // Mock data for charts
  const penaltyTrends = [
    { name: "Mon", penalties: 45, revenue: 6750, payments: 38 },
    { name: "Tue", penalties: 52, revenue: 7800, payments: 45 },
    { name: "Wed", penalties: 38, revenue: 5700, payments: 32 },
    { name: "Thu", penalties: 61, revenue: 9150, payments: 55 },
    { name: "Fri", penalties: 73, revenue: 10950, payments: 68 },
    { name: "Sat", penalties: 29, revenue: 4350, payments: 25 },
    { name: "Sun", penalties: 34, revenue: 5100, payments: 30 },
  ];

  const violationTypes = [
    { name: "Speeding", value: 45, color: "#ec4899" },
    { name: "Parking", value: 30, color: "#be185d" },
    { name: "Red Light", value: 15, color: "#9d174d" },
    { name: "Stop Sign", value: 7, color: "#db2777" },
    { name: "Other", value: 3, color: "#f472b6" },
  ];

  const officerPerformance = [
    { name: "John Smith", penalties: 28, efficiency: 94 },
    { name: "Sarah Johnson", penalties: 25, efficiency: 91 },
    { name: "Michael Chen", penalties: 22, efficiency: 88 },
    { name: "Maria Garcia", penalties: 20, efficiency: 85 },
    { name: "David Wilson", penalties: 18, efficiency: 82 },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-700">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (detailed) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Penalty Trends */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Penalty Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={penaltyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#4b5563", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="penalties"
                      stroke="#be185d"
                      strokeWidth={3}
                      dot={{ fill: "#be185d", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="payments"
                      stroke="#ec4899"
                      strokeWidth={2}
                      dot={{ fill: "#ec4899", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Violation Types */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Violation Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {violationTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Officer Performance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Officer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={officerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#4b5563", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="penalties" fill="#be185d" />
                  <Bar dataKey="efficiency" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Performance Overview
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-pink-50 text-pink-700 border-pink-200"
          >
            {timeRange === "24h"
              ? "Last 24h"
              : timeRange === "7d"
              ? "Last 7 days"
              : timeRange === "30d"
              ? "Last 30 days"
              : "Custom range"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={penaltyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 12 }} />
              <YAxis tick={{ fill: "#4b5563", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="penalties"
                stroke="#be185d"
                strokeWidth={3}
                dot={{ fill: "#be185d", strokeWidth: 2, r: 4 }}
                name="Penalties"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: "#ec4899", strokeWidth: 2, r: 3 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
