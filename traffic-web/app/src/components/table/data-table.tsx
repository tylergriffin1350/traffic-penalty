"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemPerPage } from "./itemPerPage";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  search: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
  onSearch: (value: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  itemsPerPage,
  totalPages,
  search,
  onPageChange,
  onItemsPerPageChange,
  onSearch,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="table-container">
      <div className="flex md:flex-row flex-col justify-between py-4 md:space-y-0 space-y-4 mx-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm ml">Items per page:</span>
          <ItemPerPage
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={(value) =>
              onItemsPerPageChange(Number(value))
            }
          />
        </div>
        <Input
          placeholder="Search ..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    // If this is the first column and it's a row number column
                    if (cellIndex === 0 && cell.column.id === "rowNumber") {
                      return (
                        <TableCell key={cell.id}>
                          {(Number(currentPage) - 1) * itemsPerPage + index + 1}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(Number(currentPage) - 1)}
          disabled={Number(currentPage) === 1}
        >
          Previous
        </Button>
        {(() => {
          const maxPages = 5; // Number of page buttons to show
          const halfMaxPages = Math.floor(maxPages / 2);
          let startPage = Math.max(1, Number(currentPage) - halfMaxPages);
          let endPage = Math.min(Number(totalPages), startPage + maxPages - 1);

          // Adjust start page if we're near the end
          if (endPage - startPage + 1 < maxPages) {
            startPage = Math.max(1, endPage - maxPages + 1);
          }

          return Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
          ).map((page) => (
            <Button
              key={page}
              variant={Number(currentPage) === page ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ));
        })()}
        <Button
          variant="outline"
          onClick={() => onPageChange(Number(currentPage) + 1)}
          disabled={Number(currentPage) === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
