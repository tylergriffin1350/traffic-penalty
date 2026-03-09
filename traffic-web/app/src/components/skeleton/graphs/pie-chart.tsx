"use client"

import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function VehicleChartSkeleton() {
    return (
        <div className="flex flex-col border rounded-lg">
            <div className="flex flex-col items-center pb-0 space-y-2 p-6">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="flex-1 pb-0 p-6">
                <div className="mx-auto aspect-square max-h-[250px] relative">
                    {/* Pie chart skeleton - circle with shimmer effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <Skeleton className="absolute rounded-full w-full h-full" />
                            <Skeleton className="absolute rounded-full w-[60%] h-[60%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            
                            {/* Center text skeleton */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <Skeleton className="h-8 w-24 mx-auto mb-2" />
                                <Skeleton className="h-4 w-16 mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}