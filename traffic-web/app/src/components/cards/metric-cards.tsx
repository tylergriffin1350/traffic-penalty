import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming it's from the UI library

export const MetricCard = ({
  title,
  value,
  icon: Icon = ShieldCheck,
  isLoading = false, // This prop will determine if we're showing a loading state
  gradientBg = 'gradient-bg',
}: {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  isLoading?: boolean;
  gradientBg?: string;
}) => {
  return (
    <Card className={`${gradientBg} w-full md:max-w-xs rounded-xl shadow-lg flex items-center space-x-4`}>
      <div className="flex-grow">
        <CardHeader className="flex flex-col items-start space-y-2">
          <CardTitle className="text-base font-semibold text-white">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-extrabold text-white">
          {isLoading ? <Skeleton className="h-8 w-16 bg-white" /> : value}
        </CardContent>
      </div>
      <div className="flex-shrink-0 p-4">
        <Icon className="h-10 w-10 text-white" />
      </div>
    </Card>
  );
};
