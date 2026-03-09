"use client";

import type React from "react";

// components/PenalityForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Driver } from "@/types/driver";
import { useState } from "react";
import { usePenalityTypes } from "@/hooks/api/penalityType";
import type { PenalityType } from "@/types/penalityType";
import { penalityManipulation } from "@/hooks/api/driver";
import type { PenalityPostData } from "@/types/penality";
import { useAuthContext } from "@/context/AuthClientProvider";
import {
  AlertCircle,
  Car,
  MapPin,
  FileText,
  Truck,
  Tag,
  Weight,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PenalityFormProps {
  driver: Driver;
  onSubmissionSuccess: () => void;
  onCancel?: () => void;
}

export function PenalityForm({
  driver,
  onSubmissionSuccess,
  onCancel,
}: PenalityFormProps) {
  const { addPenalty, isAddingPenalty } = penalityManipulation();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    penaltyTypeId: "",
    address: "",
    vehicleType: "",
    vehiclePlate: "",
    vehicleLoadCapacity: "", // Keep as string for input type="number" binding
  });

  const [errors, setErrors] = useState({
    penaltyTypeId: "",
    address: "",
    vehicleType: "",
    vehiclePlate: "",
    vehicleLoadCapacity: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      penaltyTypeId: "",
      address: "",
      vehicleType: "",
      vehiclePlate: "",
      vehicleLoadCapacity: "",
    };

    if (!formData.penaltyTypeId) {
      newErrors.penaltyTypeId = "Penalty type is required.";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required.";
      isValid = false;
    }
    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vehicle type is required.";
      isValid = false;
    }
    if (!formData.vehiclePlate) {
      newErrors.vehiclePlate = "Vehicle plate is required.";
      isValid = false;
    }
    if (!formData.vehicleLoadCapacity) {
      newErrors.vehicleLoadCapacity = "Vehicle load capacity is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const driverId = driver.id;
    const operatorId = user?.id || "unknown-operator";

    const partialPenaltyData = {
      penaltyTypeId: formData.penaltyTypeId,
      address: formData.address,
      vehicle: {
        type: formData.vehicleType,
        plate: formData.vehiclePlate,
        loadCapacity: Number.parseFloat(formData.vehicleLoadCapacity) || 0,
      },
      operatorId: operatorId as string,
    };

    const finalPenaltyData: PenalityPostData = {
      ...partialPenaltyData,
      committedAt: new Date().toISOString(), // Set current time in ISO format
    };

    if (validate()) {
      await addPenalty({
        driverId: driverId,
        penalityData: finalPenaltyData,
      });
      onSubmissionSuccess();
    } else {
      setFormSubmitted(false);
    }
  };

  const {
    data: penalityTypes = { data: [] },
    isLoading: isPenalityTypesLoading,
  } = usePenalityTypes(1, 0, "");

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content area */}
      <div
        className="flex-1 overflow-y-auto pr-1 pb-4"
        style={{ maxHeight: "60vh" }}
      >
        <form id="penaltyForm" onSubmit={handleSubmit} className="space-y-5">
          {/* Driver Information Card */}
          <Card className="bg-pink-50 border-pink-100">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Driver Information
                  </h3>
                  <div className="text-sm text-pink-600 mt-1">
                    <span className="font-medium">{driver.name}</span> •{" "}
                    <Badge variant="outline" className="font-mono bg-white">
                      {driver.licenseNumber}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-pink-600" />
              Penalty Details
            </h3>

            {/* Penalty Type */}
            <div className="space-y-2 p-2">
              <Label
                htmlFor="penaltyTypeId"
                className="text-gray-700 flex items-center"
              >
                <Tag className="mr-2 h-4 w-4 text-pink-600" />
                Penalty Type <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                name="penaltyTypeId"
                value={formData.penaltyTypeId}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    penaltyTypeId: value,
                  }));
                  setErrors((prev) => ({
                    ...prev,
                    penaltyTypeId: "",
                  }));
                }}
              >
                <SelectTrigger
                  className={`w-full h-11 ${
                    errors.penaltyTypeId && formSubmitted
                      ? "border-red-300 ring-red-100 bg-red-50"
                      : "border-gray-100 focus:border-pink-500"
                  }`}
                >
                  <SelectValue
                    placeholder={
                      isPenalityTypesLoading
                        ? "Loading penalty types..."
                        : "Select penalty type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {penalityTypes.data.map((penalityType: PenalityType) => (
                    <SelectItem key={penalityType.id} value={penalityType.id}>
                      {penalityType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.penaltyTypeId && formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.penaltyTypeId}
                </motion.p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 p-2">
              <Label
                htmlFor="address"
                className="text-gray-700 flex items-center"
              >
                <MapPin className="mr-2 h-4 w-4 text-pink-600" />
                Location Address <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`h-11 ${
                  errors.address && formSubmitted
                    ? "border-red-300 ring-red-100 bg-red-50"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="Enter the location where the violation occurred"
                required
              />
              {errors.address && formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.address}
                </motion.p>
              )}
            </div>

            <Separator className="my-4" />

            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <Car className="mr-2 h-5 w-5 text-pink-600" />
              Vehicle Information
            </h3>

            {/* Vehicle Type */}
            <div className="space-y-2 p-2">
              <Label
                htmlFor="vehicleType"
                className="text-gray-700 flex items-center"
              >
                <Truck className="mr-2 h-4 w-4 text-pink-600" />
                Vehicle Type <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={`h-11 ${
                  errors.vehicleType && formSubmitted
                    ? "border-red-300 ring-red-100 bg-red-50"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="e.g. Sedan, SUV, Truck"
                required
              />
              {errors.vehicleType && formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.vehicleType}
                </motion.p>
              )}
            </div>

            {/* Vehicle Plate */}
            <div className="space-y-2 p-2">
              <Label
                htmlFor="vehiclePlate"
                className="text-gray-700 flex items-center"
              >
                <Tag className="mr-2 h-4 w-4 text-pink-600" />
                License Plate <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="vehiclePlate"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                className={`h-11 ${
                  errors.vehiclePlate && formSubmitted
                    ? "border-red-300 ring-red-100 bg-red-50"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="Enter vehicle license plate number"
                required
              />
              {errors.vehiclePlate && formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.vehiclePlate}
                </motion.p>
              )}
            </div>

            {/* Load Capacity */}
            <div className="space-y-2 p-2">
              <Label
                htmlFor="loadCapacity"
                className="text-gray-700 flex items-center"
              >
                <Weight className="mr-2 h-4 w-4 text-pink-600" />
                Load Capacity (kg) <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="loadCapacity"
                name="vehicleLoadCapacity"
                type="number"
                value={formData.vehicleLoadCapacity}
                onChange={handleChange}
                className={`h-11 ${
                  errors.vehicleLoadCapacity && formSubmitted
                    ? "border-red-300 ring-red-100 bg-red-50"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="Enter vehicle load capacity in kg"
                required
                min="0"
              />
              {errors.vehicleLoadCapacity && formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.vehicleLoadCapacity}
                </motion.p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Fixed footer with buttons */}
      <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-200 bg-white sticky bottom-0">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isAddingPenalty}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          form="penaltyForm"
          disabled={isAddingPenalty}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          {isAddingPenalty ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Add Penalty
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
