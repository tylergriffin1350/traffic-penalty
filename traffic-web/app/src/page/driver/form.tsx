"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { driverManipulation } from "@/hooks/api/driver"; // Assuming this is where your hooks are
import { Driver } from "@/types/driver";
import { AlertCircle } from "lucide-react"; // Import AlertCircle for error messages

export const Form = ({
  toggleModal,
  driver,
}: {
  toggleModal: () => void;
  driver: Driver | null;
}) => {
  // Destructure isLoading and error states from your hook
  const {
    createDriver,
    updateDriver,
    isCreating,
    isUpdating,
    error: apiError,
  } = driverManipulation(); // Capture API errors here

  const [formData, setFormData] = useState({
    name: driver?.name || "",
    age: driver?.age ?? "",
    sex: driver?.sex || "",
    city: driver?.city || "",
    kebele: driver?.kebele || "",
    licenseNumber: driver?.licenseNumber || "",
    phoneNumber: driver?.phoneNumber || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    sex: "",
    city: "",
    kebele: "",
    licenseNumber: "",
    phoneNumber: "",
    // Add a general error field for API-level errors
    general: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      age: "",
      sex: "",
      city: "",
      kebele: "",
      licenseNumber: "",
      phoneNumber: "",
      general: "", // Clear general errors on new validation
    };

    if (!formData.name.trim()) {
      // Added .trim() for string fields
      newErrors.name = "Name is required.";
      isValid = false;
    }
    const ageValue = Number(formData.age);
    if (
      formData.age === "" ||
      isNaN(ageValue) ||
      ageValue <= 0 ||
      !Number.isInteger(ageValue)
    ) {
      // Added integer check
      newErrors.age = "Age must be a positive whole number.";
      isValid = false;
    }
    if (!formData.sex) {
      newErrors.sex = "Sex is required.";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
      isValid = false;
    }
    if (!formData.kebele.trim()) {
      newErrors.kebele = "Kebele is required.";
      isValid = false;
    }
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License Number is required.";
      isValid = false;
    }
    // Updated phone number validation for clearer Ethiopian context
    // It should start with '09' or '07' and be exactly 10 digits long.
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!/^(09|07)\d{8}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        "Enter a valid 10-digit Ethiopian phone number (e.g., 09XXXXXXXX or 07XXXXXXXX).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;

    if (name === "age") {
      if (value === "") {
        processedValue = "";
      } else {
        const ageNumber = parseInt(value, 10);
        // Only allow digits and handle empty string
        processedValue = value.match(/^\d*$/) ? value : formData.age;
      }
    } else {
      processedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear specific field errors as user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Also clear general API errors when any field changes
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, general: "" })); // Clear previous API error before new submission

    if (validate()) {
      const dataToSend = {
        ...formData,
        age: Number(formData.age), // Ensure age is a number for the API call
      };

      try {
        if (driver) {
          await updateDriver({ ...driver, ...dataToSend });
        } else {
          await createDriver(dataToSend);
        }
        toggleModal(); // Close modal only on successful operation
      } catch (error: any) {
        // Catch the error from the hook
        console.error("Form submission error:", error);
        // Display the error message from the API hook
        setErrors((prev) => ({
          ...prev,
          general: error.message || "An unexpected error occurred.",
        }));
      }
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={toggleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {driver ? "Update Driver" : "Add New Driver"}
            </DialogTitle>
          </DialogHeader>

          {/* General API Error Display */}
          {errors.general && (
            <div className="flex items-center text-red-700 bg-red-100 p-3 rounded-md text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter driver's name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500 bg-red-50" : ""}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="age">Age</Label>
            <Input
              name="age"
              type="number"
              placeholder="Enter driver's age"
              value={formData.age}
              onChange={handleChange}
              className={errors.age ? "border-red-500 bg-red-50" : ""}
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              name="gender"
              value={formData.sex}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  sex: value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  sex: "",
                  general: "", // Clear general errors
                }));
              }}
            >
              <SelectTrigger
                className={
                  errors.sex ? "w-full border-red-500 bg-red-50" : "w-full"
                }
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && (
              <span className="text-red-500 text-sm">{errors.sex}</span>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="city">City</Label>
            <Input
              name="city"
              type="text"
              placeholder="Enter driver's city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "border-red-500 bg-red-50" : ""}
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="kebele">Kebele</Label>
            <Input
              name="kebele"
              type="text"
              placeholder="Enter driver's kebele"
              value={formData.kebele}
              onChange={handleChange}
              className={errors.kebele ? "border-red-500 bg-red-50" : ""}
            />
            {errors.kebele && (
              <span className="text-red-500 text-sm">{errors.kebele}</span>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              name="licenseNumber"
              type="text"
              placeholder="Enter driver's License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={errors.licenseNumber ? "border-red-500 bg-red-50" : ""}
            />
            {errors.licenseNumber && (
              <span className="text-red-500 text-sm">
                {errors.licenseNumber}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Mobile Number</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-lg">
                <img src="/flag/et.svg" width={24} height={24} alt="Ethiopia" />
              </div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="07XXXXXXXX or 09XXXXXXXX"
                value={formData.phoneNumber}
                className={errors.phoneNumber ? "border-red-500 bg-red-50" : ""}
                onChange={handleChange}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
