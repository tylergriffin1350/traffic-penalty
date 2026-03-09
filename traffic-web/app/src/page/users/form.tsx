"use client";

import { useState, useEffect } from "react";
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
import { userManipulation } from "@/hooks/api/users";
import { UserData } from "@/types/user";
import { useRoles } from "@/hooks/api/roles";
import { Roles } from "@/types/roles";

import { AlertCircle } from "lucide-react";

export const Form = ({
  toggleModal,
  users,
}: {
  toggleModal: () => void;
  users: UserData | null;
}) => {
  // Destructure isLoading and error states from your userManipulation hook
  const {
    createUser,
    updateUser,
    isCreating,
    isUpdating,
    error: apiError,
  } = userManipulation();

  const [formData, setFormData] = useState({
    phoneNumber: users?.phoneNumber || "",
    password: "", // Password is only required for creation
    roleId: users?.roles?.[0]?.id || "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
    roleId: "",
    general: "", // Added a general error field for API-level errors
  });

  // Fetch roles
  const { data: roles = { data: [] }, isLoading: isLoadingRoles } = useRoles(
    1,
    0
  );

  // Effect to clear general error when modal opens/closes or user data changes
  useEffect(() => {
    setErrors((prev) => ({ ...prev, general: "" }));
  }, [toggleModal, users]);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      phoneNumber: "",
      password: "",
      roleId: "",
      general: "", // Clear general errors on new validation attempt
    };

    // Phone Number Validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!/^(09|07)\d{8}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        "Enter a valid 10-digit Ethiopian phone number (e.g., 09XXXXXXXX or 07XXXXXXXX).";
      isValid = false;
    }

    // Password Validation (only if creating a new user)
    if (!users && !formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    // Role Validation
    if (!formData.roleId) {
      newErrors.roleId = "Account role is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  // Handler for role selection
  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      roleId: value,
    }));
    setErrors((prev) => ({
      ...prev,
      roleId: "", // Clear role error
      general: "", // Clear general API errors
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, general: "" })); // Clear previous API error before new submission

    if (validate()) {
      try {
        if (users) {
          // const dataToUpdate = {
          //   id: users.id,
          //   phoneNumber: formData.phoneNumber,
          //   roleId: formData.roleId,
          //   ...(formData.password && { password: formData.password }), // Only send password if it's not empty
          // };
          // await updateUser(dataToUpdate);
        } else {
          // For creation, password is required by validation
          await createUser(formData);
        }
        toggleModal(); // Close modal only on successful operation
      } catch (error: any) {
        console.error("User form submission error:", error);
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
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{users ? "Update User" : "Add New User"}</DialogTitle>
          </DialogHeader>

          {/* General API Error Display */}
          {errors.general && (
            <div className="flex items-center text-red-700 bg-red-100 p-3 rounded-md text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>{errors.general}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Mobile</Label>
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

          {!users && ( // Password field only for new user creation
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500 bg-red-50" : ""}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="roles">Account Role</Label>
            <Select
              name="roles"
              value={formData.roleId}
              onValueChange={handleRoleChange} // Use the new handler
            >
              <SelectTrigger
                className={
                  errors.roleId ? "w-full border-red-500 bg-red-50" : "w-full"
                }
              >
                <SelectValue
                  placeholder={
                    isLoadingRoles ? "Loading roles..." : "Select account role"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {roles.data.length > 0 ? (
                  roles.data.map((role: Roles) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No roles available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.roleId && (
              <span className="text-red-500 text-sm">{errors.roleId}</span>
            )}
          </div>

          <DialogFooter className="mt-5">
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
