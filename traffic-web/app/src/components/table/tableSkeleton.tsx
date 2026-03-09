import { Skeleton } from "../ui/skeleton";

export const TableSkeleton = () => {
  return (
    <>
      <div className="flex justify-between py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-24" /> <Skeleton className="h-10 w-28" />{" "}
        </div>
        <Skeleton className="h-10 max-w-sm w-full" />
      </div>
      <div className="space-y-2 border-gray-200 border rounded">
        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-2 border-b border-gray-200"
          >
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center justify-end space-x-2">
          <Skeleton className="h-8 w-24" /> <Skeleton className="h-8 w-20" />{" "}
        </div>
      </div>
    </>
  );
};
