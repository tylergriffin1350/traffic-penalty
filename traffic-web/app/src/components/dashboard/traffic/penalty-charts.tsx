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

interface PenaltyChartsProps {
  timeRange: string;
  detailed?: boolean;
}

export function PenaltyCharts({
  timeRange,
  detailed = false,
}: PenaltyChartsProps) {
  // Mock data for charts
  const dailyPenalties = [
    { name: "Mon", penalties: 18, amount: 2700, paid: 15 },
    { name: "Tue", penalties: 22, amount: 3300, paid: 19 },
    { name: "Wed", penalties: 15, amount: 2250, paid: 12 },
    { name: "Thu", penalties: 28, amount: 4200, paid: 25 },
    { name: "Fri", penalties: 31, amount: 4650, paid: 28 },
    { name: "Sat", penalties: 12, amount: 1800, paid: 10 },
    { name: "Sun", penalties: 14, amount: 2100, paid: 12 },
  ];

  const violationTypes = [
    { name: "Speeding", value: 45, color: "#ef4444" },
    { name: "Parking", value: 30, color: "#f97316" },
    { name: "Red Light", value: 15, color: "#eab308" },
    { name: "Stop Sign", value: 7, color: "#22c55e" },
    { name: "Other", value: 3, color: "#3b82f6" },
  ];

  const paymentStatus = [
    { name: "Paid", value: 78, color: "#22c55e" },
    { name: "Unpaid", value: 15, color: "#ef4444" },
    { name: "Pending", value: 7, color: "#eab308" },
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
          {/* Daily Penalties Trend */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Daily Penalty Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyPenalties}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#be185d", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#be185d", fontSize: 12 }} />
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
                      dataKey="paid"
                      stroke="#ec4899"
                      strokeWidth={2}
                      dot={{ fill: "#ec4899", strokeWidth: 2, r: 3 }}
                      name="Paid"
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

        {/* Payment Status */}
        {/* <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Payment Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentStatus} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    tick={{ fill: "#4b5563", fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "#4b5563", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Penalty Overview
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-pink-50 text-pink-700 border-pink-200"
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
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyPenalties}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fbcfe8" />
              <XAxis dataKey="name" tick={{ fill: "#be185d", fontSize: 12 }} />
              <YAxis tick={{ fill: "#be185d", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="penalties"
                stroke="rgba(233, 70, 150, 0.1)"
                strokeWidth={3}
                dot={{ fill: "rgba(233, 70, 150, 0.1)", strokeWidth: 2, r: 4 }}
                name="Penalties Issued"
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: "#ec4899", strokeWidth: 2, r: 3 }}
                name="Amount ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
