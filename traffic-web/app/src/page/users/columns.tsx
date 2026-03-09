import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "@/types/user";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const roleDisplayConfig: Record<string, { className: string }> = {
  Admin: {
    className:
      "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 dark:hover:bg-red-900/50",
  },
  Approver: {
    className:
      "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/50",
  },
  Traffic: {
    className:
      "bg-green-100 text-green-700 border-green-300 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-900/50",
  },
  Agency: {
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700 dark:hover:bg-yellow-900/50",
  },
  Default: {
    // Fallback for roles not explicitly defined or for a "default" role
    className:
      "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-600",
  },
};

export const columns = (
  handleSelected: (user: UserData) => void,
  setDeleteModalOpen: (boolean: boolean) => void,
  setIsOpen: (boolean: boolean) => void
): ColumnDef<UserData>[] => [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorFn: (row) => row?.phoneNumber,
    header: "Mobile Number",
  },
  {
    header: "Role",
    id: "role",
    cell: ({ row }) => {
      const roleName = row.original.roles?.[0]?.name;
      console.log("role", roleName);
      const config =
        roleDisplayConfig[roleName as keyof typeof roleDisplayConfig] ||
        roleDisplayConfig.Default;
      return roleName ? (
        <Badge variant="outline" className={config.className}>
          {roleName}
        </Badge>
      ) : (
        "N/A"
      );
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      console.log("columns row data", row);
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
                handleSelected(row.original);
                setIsOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSelected(row.original);
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
