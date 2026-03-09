import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roleManipulation } from "@/hooks/api/roles";
import { Roles } from "@/types/roles";

export const Form = ({
  toggleModal,
  role,
}: {
  toggleModal: () => void;
  role: Roles | null;
}) => {
  const { createRole, updateRole, isCreating, isUpdating } = roleManipulation();
  const [formData, setFormData] = useState({ name: role?.name || "" });
  const [errors, setErrors] = useState({ name: "" });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "" };

    if (!formData.name) {
      newErrors.name = "Name is required.";
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

    // Clear errors as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      if (role) {
        await updateRole({ ...role, ...formData });
      } else {
        await createRole(formData);
      }
      toggleModal();
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={toggleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{role ? "Update Role" : "Add New Role"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter role name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name && "border-red-500 bg-red-50"}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
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
