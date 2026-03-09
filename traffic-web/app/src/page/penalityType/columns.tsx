import { ColumnDef } from "@tanstack/react-table";
import { PenalityType } from "@/types/penalityType";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (
  handleSelectedRole: (penalityTypes: PenalityType) => void,
  setDeleteModalOpen: (boolean: boolean) => void,
  setIsOpen: (boolean: boolean) => void
): ColumnDef<PenalityType>[] => [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) =>
      row?.name ? row.name.charAt(0).toUpperCase() + row.name.slice(1) : "",
    header: "Name",
  },
  {
    accessorFn: (row) => row.code,
    header: "Code",
  },
  {
    accessorFn: (row) => row.point,
    header: "Point",
  },
  {
    accessorFn: (row) => row.fee,
    header: "Fee",
  },
  {
    accessorFn: (row) => formatDate(row.createdAt),
    header: "Created At",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                handleSelectedRole(row.original);
                setIsOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSelectedRole(row.original);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
