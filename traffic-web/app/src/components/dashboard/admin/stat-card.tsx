import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string;
  percentage: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  percentage,
  trend,
  icon,
  bgColor = "bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50",
  iconColor = "bg-pink-200",
  className,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <div
      className={cn(
        "p-6 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]",
        bgColor,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-semibold">{title}</p>
          <p className="text-4xl font-bold text-pink-800 mt-1">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${iconColor} bg-opacity-80`}>
          {React.isValidElement(icon) &&
            React.cloneElement(icon as React.ReactElement<any>, {
              size: 28,
              className: "text-pink-700",
            })}
        </div>
      </div>
      <div className={`mt-4 flex items-center text-sm ${trendColor}`}>
        <TrendIcon size={20} className="mr-2" />
        <span>{percentage}%</span>
      </div>
    </div>
  );
}
