"use client";

import * as React from "react";
import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// Import both hooks
import { useDriverByLicense, useDriverByPhone } from "@/hooks/api/driver";
import type { Driver } from "@/types/driver";
import { TableSkeleton } from "@/components/table/tableSkeleton";
import { PenalityForm } from "./penality-form";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  AlertCircle,
  Plus,
  History,
  Phone,
  BadgeInfo,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";

// Define Yup schemas for validation
const licenseNumberSchema = yup
  .string()
  .required("License number is required.");
const phoneSchema = yup
  .string()
  .matches(
    /^(09|07)\d{8}$/,
    "Phone number must be 10 digits and start with 09 or 07."
  )
  .required("Phone number is required.");

export default function PenaltiesPage() {
  const [searchType, setSearchType] = useState<"licenseNumber" | "phoneNumber">(
    "licenseNumber"
  );
  const [searchValue, setSearchValue] = useState(""); // Unified state for search input value
  const [errors, setErrors] = useState<{ value: string }>({ value: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Determine if license search should be enabled
  const enableLicenseSearch =
    hasSearched && searchType === "licenseNumber" && !!searchValue;
  // Determine if phone search should be enabled
  const enablePhoneSearch =
    hasSearched && searchType === "phoneNumber" && !!searchValue;

  // Call useDriverByLicense conditionally
  const { data: driverByLicense, isLoading: isLoadingLicense } =
    useDriverByLicense(searchValue, {
      enabled: enableLicenseSearch,
    });

  // Call useDriverByPhone conditionally
  const { data: driverByPhone, isLoading: isLoadingPhone } = useDriverByPhone(
    searchValue,
    { enabled: enablePhoneSearch }
  );

  // Determine the active driver data and overall loading state
  const driver = driverByLicense || driverByPhone;
  const isLoading = isLoadingLicense || isLoadingPhone;

  const router = useRouter();

  const handleHistory = (id: string) => {
    router.push(`/penalty/history?id=${id}`);
  };

  const handleAddPenality = () => {
    setSelectedDriver(driver ?? null);
    setIsFormOpen(true);
  };

  const handleSubmissionSuccess = () => {
    if (isFormOpen) {
      setIsFormOpen(false);
      setSelectedDriver(null);
    }
  };

  const validate = async () => {
    let isValid = true;
    const newErrors = { value: "" };
    let validationSchema;

    if (searchType === "licenseNumber") {
      validationSchema = licenseNumberSchema;
    } else {
      validationSchema = phoneSchema;
    }

    try {
      await validationSchema.validate(searchValue);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        newErrors.value = err.errors[0];
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (errors.value) {
      setErrors((prev) => ({
        ...prev,
        value: "",
      }));
    }
  };

  const handleTypeChange = (type: "licenseNumber" | "phoneNumber") => {
    setSearchType(type);
    setSearchValue(""); // Clear input on type change
    setErrors({ value: "" }); // Clear errors on type change
    setHasSearched(false); // Reset search status on type change
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasSearched(true); // Indicate a search attempt has been made

    const isValid = await validate();
    if (!isValid) {
      return;
    }

    // No need to set searchLicense/searchPhone states explicitly here,
    // as the useEffects in the hooks (triggered by searchValue and searchType)
    // will handle fetching.
  };

  const columns: ColumnDef<Driver>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "licenseNumber",
      header: "License Number",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono">
          {row.original.licenseNumber}
        </Badge>
      ),
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono">
          {row.original.city}
        </Badge>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono">
          {row.original.phoneNumber}
        </Badge>
      ),
    },
    {
      id: "addPenalty",
      header: "Add Penalty",
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={handleAddPenality}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Penalty
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "penaltyHistory",
      header: "History",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleHistory(row.original.id)}
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
        >
          <History className="mr-1 h-4 w-4" />
          View History
        </Button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const tableData = React.useMemo(() => (driver ? [driver] : []), [driver]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const Icon = searchType === "licenseNumber" ? BadgeInfo : Phone;
  const placeholder =
    searchType === "licenseNumber"
      ? "Enter license number..."
      : "Enter phone number (e.g., 09... or 07...)";
  const label =
    searchType === "licenseNumber"
      ? "Driver License Number"
      : "Driver Phone Number";

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg pb-6">
            <CardTitle className="text-2xl text-pink-800 flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Traffic Penalty Management
            </CardTitle>
            <CardDescription className="text-pink-600">
              Search for a driver by license number or phone number to issue or
              view penalties.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Search Type Selector */}
                <div className="space-y-2 md:w-1/3">
                  <label
                    htmlFor="searchType"
                    className="text-sm font-medium text-gray-700"
                  >
                    Search By
                  </label>
                  <Select
                    onValueChange={handleTypeChange}
                    defaultValue={searchType}
                  >
                    <SelectTrigger id="searchType" className="h-11">
                      <SelectValue placeholder="Select search type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="licenseNumber">
                        License Number
                      </SelectItem>
                      <SelectItem value="phoneNumber">Phone Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dynamic Input Field */}
                <div className="flex-grow space-y-2">
                  <label
                    htmlFor="searchValue"
                    className="text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="searchValue"
                      name="searchValue"
                      placeholder={placeholder}
                      value={searchValue}
                      onChange={handleChange}
                      className={`pl-10 h-11 ${
                        errors.value
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50"
                          : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                      }`}
                    />
                  </div>
                  {errors.value && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.value}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 px-6 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <TableSkeleton />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {!isLoading && hasSearched && !driver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-md bg-amber-50 text-amber-800">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Driver Found</h3>
              <p className="text-amber-700">
                No driver found with{" "}
                <span className="font-semibold">
                  {searchType === "licenseNumber"
                    ? "license number"
                    : "phone number"}
                </span>
                : <span className="font-mono font-medium">{searchValue}</span>
              </p>
              <p className="text-sm text-amber-600 mt-2">
                Please check the{" "}
                {searchType === "licenseNumber"
                  ? "license number"
                  : "phone number"}{" "}
                and try again.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {!isLoading && driver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 pb-4">
              <CardTitle className="text-xl text-pink-800">
                Driver Information
              </CardTitle>
            </CardHeader>
            <div className="overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-gray-50">
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="font-semibold text-gray-700 py-4"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="hover:bg-pink-50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
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
          </Card>
        </motion.div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 sticky top-0 z-10">
            <DialogTitle className="text-xl text-gray-800 flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Add New Penalty
            </DialogTitle>
            {selectedDriver && (
              <DialogDescription className="text-pink-600 mt-1">
                Adding penalty for{" "}
                <span className="font-medium">{selectedDriver.name}</span> (
                {searchType === "licenseNumber" ? "License" : "Phone"}:{" "}
                <span className="font-mono">
                  {searchType === "licenseNumber"
                    ? selectedDriver.licenseNumber
                    : selectedDriver.phoneNumber}
                </span>
                )
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="px-6 py-4">
            {selectedDriver ? (
              <PenalityForm
                driver={selectedDriver}
                onSubmissionSuccess={handleSubmissionSuccess}
                onCancel={() => setIsFormOpen(false)}
              />
            ) : (
              <div className="flex items-center justify-center p-4 text-red-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>Error: Driver details not loaded for form.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
