"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Download,
  RefreshCw,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing: boolean;
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export function DashboardHeader({
  onRefresh,
  onExport,
  isRefreshing,
  timeRange,
  onTimeRangeChange,
}: DashboardHeaderProps) {
  return (
    <Card className="mb-8 shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
              <BarChart3 className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-pink-800">
                Traffic Penalty Dashboard
              </CardTitle>
              <CardDescription className="text-pink-600 mt-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Real-time system overview and analytics
                <Badge variant="outline" className="ml-2 bg-green-300 ">
                  Live
                </Badge>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-[140px] h-9 bg-white">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">System Status</p>
              <p className="font-medium text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Officers</p>
              <p className="font-medium text-gray-800">24</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Penalties</p>
              <p className="font-medium text-gray-800">127</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-800">2 min ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
