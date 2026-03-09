"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Interface for Vehicle Type Data
interface VehicleTypeData {
  name: string;
  value: number;
  color: string;
}

// Mock data for vehicle types
const vehicleTypeData: VehicleTypeData[] = [
  { name: "Sedan", value: 8245, color: "#ec4899" },
  { name: "SUV", value: 5632, color: "#be185d" },
  { name: "Truck", value: 2187, color: "#9d174d" },
  { name: "Motorcycle", value: 1843, color: "#db2777" },
  { name: "Bus", value: 1338, color: "#f472b6" },
];

export function VehicleTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-600">
          Types of Vehicles Penalized
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString()} vehicles`,
                  "Count",
                ]}
                contentStyle={{
                  backgroundColor: "#fdf2f8",
                  borderColor: "#fbcfe8",
                  borderRadius: "0.5rem",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => (
                  <span className="text-sm font-medium text-pink-800">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
