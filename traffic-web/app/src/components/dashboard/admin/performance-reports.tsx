"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// Interface for Performance Data
interface PerformanceData {
  name: string;
  citations: number;
  warnings: number;
  reversals: number;
}

// Mock data for performance reports
const performanceData: PerformanceData[] = [
  { name: "Downtown", citations: 1200, warnings: 450, reversals: 30 },
  { name: "Uptown", citations: 900, warnings: 380, reversals: 25 },
  { name: "Midtown", citations: 1100, warnings: 420, reversals: 35 },
  { name: "Westside", citations: 850, warnings: 300, reversals: 20 },
  { name: "Eastside", citations: 950, warnings: 350, reversals: 28 },
  { name: "Northside", citations: 750, warnings: 280, reversals: 18 },
  { name: "Southside", citations: 800, warnings: 320, reversals: 22 },
];

// Custom Tooltip for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-pink-50 p-4 rounded-lg shadow-md border border-pink-200">
        <p className="text-sm font-semibold text-pink-800">{`${label} District`}</p>
        <p className="text-sm text-pink-700">{`Citations: ${payload[0].value}`}</p>
        <p className="text-sm text-pink-700">{`Warnings: ${payload[1].value}`}</p>
        <p className="text-sm text-pink-700">{`Reversals: ${payload[2].value}`}</p>
      </div>
    );
  }
  return null;
};

export function PerformanceReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          District Performance Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#fbcfe8" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#be185d", fontSize: 12 }}
                axisLine={{ stroke: "#f9a8d4" }}
              />
              <YAxis
                tick={{ fill: "#be185d", fontSize: 12 }}
                axisLine={{ stroke: "#f9a8d4" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm font-medium text-pink-800">
                    {value}
                  </span>
                )}
              />
              <Bar dataKey="citations" fill="#ec4899" name="Citations" />
              <Bar dataKey="warnings" fill="#be185d" name="Warnings" />
              <Bar dataKey="reversals" fill="#9d174d" name="Reversals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
