"use client";

import { useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { TableSkeleton } from "@/components/table/tableSkeleton";
import { useDebouncedValue } from "@/hooks/debounce";
import type { Penalty } from "@/types/penality";
import { usePenaltiesByDriver } from "@/hooks/api/driver";
import { columns } from "./columns";
import { AlertCircle, Calendar, Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface HistoryListProps {
  driverId: string;
  filterYear?: string;
  filterStatus?: "all" | "paid" | "unpaid";
}

export default function HistoryList({
  driverId,
  filterYear = "all",
  filterStatus = "all",
}: HistoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const debouncedSearch = useDebouncedValue(search, 500);

  const {
    data: penaltiesData = {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: itemsPerPage,
    },
    isLoading,
    isError,
    error,
  } = usePenaltiesByDriver(driverId, {
    page: currentPage,
    limit: itemsPerPage,
  });

  const handleSelected = (p: Penalty) => {
    setSelectedPenalty(p);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    console.error("Error fetching penalties:", error);
    return (
      <div className="flex items-center p-6 border border-red-200 bg-red-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-red-800">Failed to load history</h3>
          <p className="text-red-700 text-sm">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  // Apply filters to the data
  let filteredData = Array.isArray(penaltiesData)
    ? penaltiesData
    : penaltiesData.data;

  // Apply year filter if specified
  if (filterYear !== "all") {
    const year = Number.parseInt(filterYear);
    filteredData = filteredData.filter((penalty) => {
      const penaltyDate = new Date(penalty.committedAt);
      return penaltyDate.getFullYear() === year;
    });
  }

  // Apply status filter if specified
  // if (filterStatus !== "all") {
  //   filteredData = filteredData.filter((penalty) => {
  //     const isPaid = penalty.status === "paid";
  //     return filterStatus === "paid" ? isPaid : !isPaid;
  //   });
  // }

  // Apply search filter
  if (debouncedSearch) {
    filteredData = filteredData.filter((penalty) => {
      const searchLower = debouncedSearch.toLowerCase();
      return (
        penalty.penaltyType?.name?.toLowerCase().includes(searchLower) ||
        penalty.address?.toLowerCase().includes(searchLower) ||
        penalty.vehicle?.plate?.toLowerCase().includes(searchLower) ||
        penalty.operator?.phoneNumber?.toLowerCase().includes(searchLower)
      );
    });
  }

  const totalFilteredItems = filteredData.length;
  const totalFilteredPages = Math.ceil(totalFilteredItems / itemsPerPage);

  // Manually handle pagination for filtered data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 px-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search penalties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 bg-white"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-10 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px] h-10">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <Calendar className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No penalties found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {debouncedSearch
              ? `No penalties match your search "${debouncedSearch}".`
              : filterYear !== "all" || filterStatus !== "all"
              ? "No penalties match your current filters."
              : "This driver has no recorded penalties."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-md border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">Penalty Records</h3>
                <p className="text-sm text-gray-500">
                  Showing {Math.min(startIndex + 1, totalFilteredItems)} to{" "}
                  {Math.min(endIndex, totalFilteredItems)} of{" "}
                  {totalFilteredItems} entries
                </p>
              </div>

              <Badge
                variant="outline"
                className="bg-pink-100 text-pink-700 border-pink-200"
              >
                <Filter className="mr-1 h-3 w-3" />
                {filterStatus !== "all"
                  ? `${
                      filterStatus.charAt(0).toUpperCase() +
                      filterStatus.slice(1)
                    } penalties`
                  : "All penalties"}
                {filterYear !== "all" ? ` • ${filterYear}` : ""}
              </Badge>
            </div>

            <DataTable
              columns={columns(handleSelected)}
              data={paginatedData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalPages={totalFilteredPages}
              search=""
              onPageChange={(page: number) => setCurrentPage(page)}
              onItemsPerPageChange={() => {}} // Handled by the Select above
              onSearch={() => {}} // Handled by the Input above
            />
          </div>
        </>
      )}
    </div>
  );
}
