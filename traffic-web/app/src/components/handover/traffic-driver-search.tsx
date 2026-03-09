"use client";

import type React from "react";
import { useState } from "react";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  FileCheck,
  AlertCircle,
  Users,
  Phone,
  BadgeInfo,
} from "lucide-react";

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

interface TrafficDriverSearchProps {
  onSearch: (criteria: {
    type: "licenseNumber" | "phoneNumber";
    value: string;
  }) => void;
  isLoading: boolean;
}

export function TrafficDriverSearch({
  onSearch,
  isLoading,
}: TrafficDriverSearchProps) {
  const [searchType, setSearchType] = useState<"licenseNumber" | "phoneNumber">(
    "licenseNumber"
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleTypeChange = (type: "licenseNumber" | "phoneNumber") => {
    setSearchType(type);
    setValue(""); // Reset value and error on type change
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) {
      setError(null); // Clear error on new input
    }
  };

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationSchema;

    if (searchType === "licenseNumber") {
      validationSchema = licenseNumberSchema;
    } else {
      validationSchema = phoneSchema;
    }

    try {
      // Validate the value against the selected schema
      await validationSchema.validate(value, { abortEarly: false });
      setError(null);
      onSearch({ type: searchType, value });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        // Yup stores all errors in the `errors` array
        setError(err.errors[0]);
      } else {
        // Handle other potential errors
        setError("An unexpected error occurred during validation.");
      }
    }
  };

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
    <Card className="mb-8 shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-lg pb-6">
        <CardTitle className="text-2xl text-pink-800 flex items-center">
          <FileCheck className="mr-3 h-7 w-7" />
          Penalty Handover Management
        </CardTitle>
        <CardDescription className="text-pink-600">
          Search for a driver by license number or phone number to add to rack.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={validateAndSubmit} className="space-y-4">
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
                  <SelectItem value="licenseNumber">License Number</SelectItem>
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
                  value={value}
                  onChange={handleChange}
                  className={`pl-10 h-11 ${
                    error
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
                  }`}
                />
              </div>
              {error && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </div>

            {/* Submit Button */}
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
  );
}
