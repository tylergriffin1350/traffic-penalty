import type { Metadata } from "next";
import { StatsOverview } from "@/components/dashboard/admin/stats-overview";
import { MonthlyTrendsChart } from "@/components/dashboard/admin/monthly-trends-chart";
import { TopOfficers } from "@/components/dashboard/admin/top-officers";
import { VehicleTypes } from "@/components/dashboard/admin/vehicle-types";
import { IncidentReports } from "@/components/dashboard/admin/incident-reports";
import { OfficerLocations } from "@/components/dashboard/admin/officer-locations";
import { ReversalFollowups } from "@/components/dashboard/admin/reversal-followups";
import { PerformanceReports } from "@/components/dashboard/admin/performance-reports";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 font-sans">
      {/* <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Traffic Penalty Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Administrative overview of the traffic penalty system
        </p>
      </header> */}

      {/* Stats Overview Section */}
      <section className="mb-10">
        <StatsOverview />
      </section>

      {/* Charts Section */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MonthlyTrendsChart />
          <TopOfficers />
        </div>
      </section>

      {/* Vehicle Types and Performance Reports */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VehicleTypes />
          <PerformanceReports />
        </div>
      </section>

      {/* Incident Reports and Officer Locations */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IncidentReports />
          <OfficerLocations />
        </div>
      </section>

      {/* Reversal Followups */}
      <section className="mb-10">
        <ReversalFollowups />
      </section>
    </div>
  );
}
