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
import { penalityTypeManipulation } from "@/hooks/api/penalityType";
import { PenalityType } from "@/types/penalityType";

export const Form = ({
  toggleModal,
  penalityTypes,
}: {
  toggleModal: () => void;
  penalityTypes: PenalityType | null;
}) => {
  const { createPenalityType, updatePenalityType, isCreating, isUpdating } =
    penalityTypeManipulation();
  const [formData, setFormData] = useState({
    name: penalityTypes?.name || "",
    code: penalityTypes?.code || "",
    point: penalityTypes?.point ?? "",
    fee: penalityTypes?.fee ?? "",
  });
  const [errors, setErrors] = useState({
    name: "",
    code: "",
    point: "",
    fee: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", code: "", point: "", fee: "" };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.code) {
      newErrors.code = "Code is required.";
      isValid = false;
    }
    // Validation for number fields: check if it's an empty string or results in NaN after conversion
    const pointValue = Number(formData.point);
    if (formData.point === "" || isNaN(pointValue) || pointValue < 0) {
      newErrors.point = "Point is required and must be a non-negative number.";
      isValid = false;
    }

    const feeValue = Number(formData.fee);
    if (formData.fee === "" || isNaN(feeValue) || feeValue < 0) {
      newErrors.fee = "Fee is required and must be a non-negative number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value; // Use a union type initially // Check if the input name is 'point' or 'fee' and convert the value to a number

    // For number inputs, if the value is an empty string, store it as an empty string.
    // Otherwise, attempt to convert to a number.
    if (name === "point" || name === "fee") {
      if (value === "") {
        processedValue = "";
      } else {
        const numberValue =
          name === "fee" ? parseFloat(value) : parseInt(value, 10);
        // If conversion results in NaN, store the original string value.
        // Otherwise, store the number.
        processedValue = isNaN(numberValue) ? value : numberValue;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue, // Use the potentially converted value
    })); // Clear errors as user types

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("penality type data", formData);
    if (validate()) {
      if (penalityTypes) {
        // Ensure point and fee are numbers when spreading existing penalityTypes
        await updatePenalityType({
          ...penalityTypes,
          ...formData,
          point: Number(formData.point), // Explicitly cast to Number just in case
          fee: Number(formData.fee), // Explicitly cast to Number just in case
        });
      } else {
        // Ensure point and fee are numbers for creation
        await createPenalityType({
          ...formData,
          point: Number(formData.point), // Explicitly cast to Number just in case
          fee: Number(formData.fee), // Explicitly cast to Number just in case
        });
      }
      toggleModal();
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={toggleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {penalityTypes ? "Update Penalty Type" : "Add New Penalty Type"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter penalty type's name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name && "border-red-500 bg-red-50"}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="code">Code</Label>
            <Input
              name="code"
              type="text"
              placeholder="Enter penalty type's code"
              value={formData.code}
              onChange={handleChange}
              className={errors.code && "border-red-500 bg-red-50"}
            />
            {errors.code && (
              <span className="text-red-500 text-sm">{errors.code}</span>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="point">Point</Label>
            <Input
              name="point"
              type="number"
              placeholder="Enter penalty type's point"
              value={formData.point}
              onChange={handleChange}
              className={errors.point && "border-red-500 bg-red-50"}
            />
            {errors.point && (
              <span className="text-red-500 text-sm">{errors.point}</span>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="fee">Fee</Label>
            <Input
              name="fee"
              type="number"
              placeholder="Enter penalty type's fee"
              value={formData.fee}
              onChange={handleChange}
              className={errors.fee && "border-red-500 bg-red-50"}
            />
            {errors.fee && (
              <span className="text-red-500 text-sm">{errors.fee}</span>
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
