import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex items-center gap-2 p-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
      <div className="space-y-1 pl-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-5 w-40" />
        ))}
      </div>
    </div>
  );
}
