"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  FileText,
  AlertTriangle,
  Settings,
  Filter,
} from "lucide-react";
import { AnimatedContainer } from "@/components/approver/animated-container";

// Import dashboard components
import { DashboardHeader } from "@/components/dashboard/approver/dashboard-header";
import { MetricsOverview } from "@/components/dashboard/approver/metrics-overview";
import { RecentActivity } from "@/components/dashboard/approver/recent-activity";
import { PerformanceCharts } from "@/components/dashboard/approver/performance-charts";
import { QuickActions } from "@/components/dashboard/approver/quick-actions";
import { SystemAlerts } from "@/components/dashboard/approver/system-alerts";

export default function ApproverDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Exporting dashboard data...");
    // In a real app, this would trigger a data export
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <AnimatedContainer delay={0}>
        <DashboardHeader
          onRefresh={handleRefresh}
          onExport={handleExport}
          isRefreshing={isRefreshing}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <MetricsOverview timeRange={timeRange} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.2}>
        <Card className="border-0 shadow-md mt-6">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="performance"
                      className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Performance
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="alerts"
                      className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Alerts
                    </TabsTrigger> */}
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              <TabsContent value="overview" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PerformanceCharts timeRange={timeRange} />
                  </div>
                  <div>
                    <QuickActions />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0 p-6">
                <RecentActivity timeRange={timeRange} />
              </TabsContent>

              <TabsContent value="performance" className="mt-0 p-6">
                <PerformanceCharts timeRange={timeRange} detailed={true} />
              </TabsContent>

              {/* <TabsContent value="alerts" className="mt-0 p-6">
                <SystemAlerts />
              </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}
