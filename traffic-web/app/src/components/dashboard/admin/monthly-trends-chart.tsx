"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interface for Chart Data
interface ChartDataPoint {
  name: string;
  penalties: number;
  amount: number;
}

// Mock data for the chart
const chartData: ChartDataPoint[] = [
  { name: "Jan", penalties: 12, amount: 24000 },
  { name: "Feb", penalties: 19, amount: 22100 },
  { name: "Mar", penalties: 25, amount: 22900 },
  { name: "Apr", penalties: 22, amount: 20000 },
  { name: "May", penalties: 58, amount: 74920 },
  { name: "Jun", penalties: 43, amount: 25000 },
  { name: "Jul", penalties: 38, amount: 21000 },
  { name: "Aug", penalties: 35, amount: 26000 },
  { name: "Sep", penalties: 42, amount: 23000 },
  { name: "Oct", penalties: 55, amount: 27000 },
  { name: "Nov", penalties: 70, amount: 29000 },
  { name: "Dec", penalties: 82, amount: 31000 },
];

// Custom Tooltip for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    if (label === "May") {
      return (
        <div className="bg-pink-700 text-white p-4 rounded-lg shadow-md">
          <p className="text-sm font-semibold">15 May 2025</p>
          <p className="text-2xl font-bold">
            ${payload[1].value?.toLocaleString()}
          </p>
          <p className="text-sm mt-2">Highest traffic penalties recorded</p>
        </div>
      );
    }
    return (
      <div className="bg-pink-50 p-4 rounded-lg shadow-md border border-pink-200">
        <p className="text-sm text-pink-600">{`${label}`}</p>
        <p className="text-lg font-semibold text-pink-700">{`Penalties: ${payload[0].value}`}</p>
        <p className="text-lg font-semibold text-pink-700">{`Revenue: $${payload[1].value?.toLocaleString()}`}</p>
        <p className="text-xs text-pink-500 mt-1">Traffic Penalty History</p>
      </div>
    );
  }
  return null;
};

export function MonthlyTrendsChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          Monthly Penalty Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#fbcfe8"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: "#be185d", fontSize: 14 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                dx={-10}
                tick={{ fill: "#be185d", fontSize: 14 }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "rgba(233, 70, 150, 0.1)",
                  strokeWidth: 60,
                  cy: 185,
                  y: 0,
                  height: 370,
                }}
              />
              <Line
                type="monotone"
                dataKey="penalties"
                stroke="#ec4899"
                strokeWidth={4}
                dot={false}
                activeDot={{
                  r: 10,
                  fill: "#ec4899",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#9d174d"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: "#9d174d",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
