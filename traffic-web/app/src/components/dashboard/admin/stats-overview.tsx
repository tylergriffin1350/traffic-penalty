import {
  BarChart,
  DollarSign,
  Users,
  Car,
  FileText,
  RotateCcw,
} from "lucide-react";
import { StatCard } from "./stat-card";

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <StatCard
        title="Total Revenue"
        value="$2,380,000"
        percentage={30}
        trend="up"
        icon={<DollarSign />}
        bgColor="bg-white"
        iconColor="bg-pink-100"
      />
      <StatCard
        title="Total Penalties"
        value="20,483"
        percentage={20}
        trend="down"
        icon={<BarChart />}
        bgColor="bg-white"
        iconColor="bg-indigo-100"
      />
      <StatCard
        title="Drivers Penalized"
        value="17,430"
        percentage={20}
        trend="down"
        icon={<Users />}
        bgColor="bg-white"
        iconColor="bg-sky-100"
      />
      <StatCard
        title="Vehicles Penalized"
        value="19,245"
        percentage={15}
        trend="up"
        icon={<Car />}
        bgColor="bg-white"
        iconColor="bg-indigo-100"
      />
      <StatCard
        title="Incident Reports"
        value="1,872"
        percentage={8}
        trend="up"
        icon={<FileText />}
        bgColor="bg-white"
        iconColor="bg-sky-100"
      />
      <StatCard
        title="Penalty Reversals"
        value="432"
        percentage={12}
        trend="down"
        icon={<RotateCcw />}
        bgColor="bg-white"
        iconColor="bg-pink-100"
      />
    </div>
  );
}
