import { MetricCard } from "@/components/cards/metric-cards";
import { ShieldCheck } from "lucide-react";

export const Stats = ({
  roles,
  loading,
}: {
  roles: any;
  loading: boolean;
}) => {
  return (
    <div className="mb-2 grid md:grid-cols-3 grid-cols-1">
      <MetricCard title="Total Roles" value={roles.total} icon={ShieldCheck} isLoading={loading} />
    </div>
  );
};