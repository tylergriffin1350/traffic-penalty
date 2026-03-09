"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DollarSign, Clock, TrendingUp } from "lucide-react";
import { AnimatedContainer } from "@/components/approver/animated-container";

// Import traffic dashboard components
import { TrafficDashboardHeader } from "@/components/dashboard/traffic/traffic-dashboard-header";
import { PenaltyMetrics } from "@/components/dashboard/traffic/penalty-metrics";
import { RecentPenalties } from "@/components/dashboard/traffic/recent-penalties";
import { PenaltyCharts } from "@/components/dashboard/traffic/penalty-charts";
import { PenaltyActions } from "@/components/dashboard/traffic/penalty-actions";

export default function TrafficDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleNewPenalty = () => {
    // Navigate to penalty creation page
    window.location.href = "/penalty";
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <AnimatedContainer delay={0}>
        <TrafficDashboardHeader
          onRefresh={handleRefresh}
          onNewPenalty={handleNewPenalty}
          isRefreshing={isRefreshing}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <PenaltyMetrics timeRange={timeRange} />
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="payments"
                    className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Payments
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PenaltyCharts timeRange={timeRange} />
                  </div>
                  <div>
                    <PenaltyActions />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-0 p-6">
                <RecentPenalties timeRange={timeRange} />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0 p-6">
                <PenaltyCharts timeRange={timeRange} detailed={true} />
              </TabsContent>

              <TabsContent value="payments" className="mt-0 p-6">
                <RecentPenalties timeRange={timeRange} filterType="payments" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}
