"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Calendar,
  MapPin,
  Car,
  User,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Penalty } from "@/types/penality";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = (
  onSelect: (penalty: Penalty) => void
): ColumnDef<Penalty>[] => [
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = row.original.status;
  //     const isPaid = status === "paid";

  //     return (
  //       <Badge
  //         className={
  //           isPaid
  //             ? "bg-green-100 text-green-800 hover:bg-green-200"
  //             : "bg-amber-100 text-amber-800 hover:bg-amber-200"
  //         }
  //       >
  //         {isPaid ? (
  //           <>
  //             <CheckCircle className="mr-1 h-3 w-3" /> Paid
  //           </>
  //         ) : (
  //           <>
  //             <Clock className="mr-1 h-3 w-3" /> Unpaid
  //           </>
  //         )}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "committedAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.committedAt);
      return (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
          {format(date, "MMM d, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "penaltyType.name",
    header: "Penalty Type",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        {row.original.penaltyType?.name || "Unknown"}
      </div>
    ),
  },
  {
    accessorKey: "penaltyType.amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium text-pink-600">
        ${row.original.penaltyType?.fee?.toLocaleString() || "0"}
      </div>
    ),
  },
  {
    accessorKey: "penaltyType.point",
    header: "Points",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200"
      >
        {row.original.penaltyType?.point || "0"} pts
      </Badge>
    ),
  },
  {
    accessorKey: "address",
    header: "Location",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center max-w-[200px] truncate">
              <MapPin className="mr-2 h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {row.original.address || "Unknown location"}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.address}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "vehicle.plate",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.original.vehicle;
      return (
        <div className="flex items-center">
          <Car className="mr-2 h-4 w-4 text-gray-400" />
          {vehicle?.type ? (
            <span>
              {vehicle.type} •{" "}
              <span className="font-mono">{vehicle.plate}</span>
            </span>
          ) : (
            <span className="font-mono">{vehicle?.plate || "Unknown"}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "operator.phoneNumber",
    header: "Issued By",
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="mr-2 h-4 w-4 text-gray-400" />
        {row.original.operator?.phoneNumber || "Unknown"}
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const penalty = row.original;

  //     return (
  //       <div className="flex justify-end">
  //         <Button
  //           variant="ghost"
  //           size="sm"
  //           onClick={() => onSelect(penalty)}
  //           className="h-8 px-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
  //         >
  //           <Eye className="h-4 w-4" />
  //           <span className="sr-only">View details</span>
  //         </Button>

  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem onClick={() => onSelect(penalty)}>
  //               <Eye className="mr-2 h-4 w-4" />
  //               View Details
  //             </DropdownMenuItem>
  //             {penalty.status !== "paid" && (
  //               <DropdownMenuItem>
  //                 <DollarSign className="mr-2 h-4 w-4" />
  //                 Pay Penalty
  //               </DropdownMenuItem>
  //             )}
  //             <DropdownMenuItem>
  //               <AlertCircle className="mr-2 h-4 w-4" />
  //               Dispute
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     );
  //   },
  // },
];
