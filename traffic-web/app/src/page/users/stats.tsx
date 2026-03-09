import { MetricCard } from "@/components/cards/metric-cards";
import { User2, UserRoundCheck, UserRoundX } from "lucide-react";

export const Stats = ({ users, loading }: { users: any; loading: boolean }) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 mb-2">
      <MetricCard
        title="Total Users"
        value={users.total}
        icon={User2}
        isLoading={loading}
      />
      {/* <MetricCard title="Total Active Users" value={users.active} icon={UserRoundCheck} isLoading={loading} />
            <MetricCard title="Total Inactive Users" value={users.inactive} icon={UserRoundX} isLoading={loading} /> */}
    </div>
  );
};
