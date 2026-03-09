"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  User,
  FileText,
  AlertTriangle,
  MapPin,
  Clock,
  CheckCircle,
  DollarSign,
} from "lucide-react";

interface AddToRackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rackData: any) => void;
  driver: any;
  selectedPenalties: string[];
  notes: string;
}

export function AddToRackModal({
  open,
  onOpenChange,
  onSubmit,
  driver,
  selectedPenalties,
  notes,
}: AddToRackModalProps) {
  const [rackData, setRackData] = useState({
    rackNumber: "",
    priority: "",
    category: "Traffic Violation",
    location: "",
    assignedTo: "",
    deadline: "",
    additionalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...rackData,
      driver,
      selectedPenalties,
      notes,
      submissionDate: new Date().toISOString(),
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onSubmit(submissionData);
    setIsSubmitting(false);

    // Reset form
    setRackData({
      rackNumber: "",
      priority: "",
      category: "Traffic Violation",
      location: "",
      assignedTo: "",
      deadline: "",
      additionalNotes: "",
    });
  };

  const generateRackNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `R-${year}${month}${day}-${random}`;
  };

  const handleGenerateRackNumber = () => {
    setRackData((prev) => ({ ...prev, rackNumber: generateRackNumber() }));
  };

  const totalAmount = selectedPenalties.length * 150; // Mock calculation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Plus className="mr-2 h-5 w-5 text-pink-600" />
            Add Case to Processing Rack
          </DialogTitle>
          <DialogDescription>
            Create a new rack entry for this driver's penalty case to be
            processed by approvers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Driver Summary */}
            <Card className="border-0 shadow-sm bg-blue-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <User className="mr-2 h-5 w-5 text-pink-600" />
                  Driver Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {driver && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">
                          License Number
                        </Label>
                        <p className="font-mono font-medium text-pink-600">
                          {driver.licenseNumber}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">
                          Full Name
                        </Label>
                        <p className="font-medium">{driver.name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Phone</Label>
                        <p className="font-medium">{driver.phone}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">
                          Total Violations
                        </Label>
                        <p className="font-medium text-red-600">
                          {driver.totalViolations}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Penalty Summary */}
            <Card className="border-0 shadow-sm bg-amber-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-amber-600" />
                  Penalty Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500">
                      Selected Penalties
                    </Label>
                    <p className="font-medium text-amber-600">
                      {selectedPenalties.length} penalties
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">
                      Total Amount
                    </Label>
                    <p className="font-medium text-pink-600">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs text-gray-500">Status</Label>
                    <Badge className="bg-amber-100 text-amber-800">
                      Pending Processing
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Rack Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-pink-600" />
              Rack Configuration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rackNumber">Rack Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="rackNumber"
                    value={rackData.rackNumber}
                    onChange={(e) =>
                      setRackData((prev) => ({
                        ...prev,
                        rackNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter rack number"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateRackNumber}
                    className="whitespace-nowrap"
                  >
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={rackData.priority}
                  onValueChange={(value) =>
                    setRackData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                        Low Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="Medium">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                        Medium Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="High">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        High Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="Urgent">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        Urgent
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Processing Location *</Label>
                <Select
                  value={rackData.location}
                  onValueChange={(value) =>
                    setRackData((prev) => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central Office - Floor 1">
                      Central Office - Floor 1
                    </SelectItem>
                    <SelectItem value="Central Office - Floor 2">
                      Central Office - Floor 2
                    </SelectItem>
                    <SelectItem value="North Branch Office">
                      North Branch Office
                    </SelectItem>
                    <SelectItem value="South Branch Office">
                      South Branch Office
                    </SelectItem>
                    <SelectItem value="East Branch Office">
                      East Branch Office
                    </SelectItem>
                    <SelectItem value="West Branch Office">
                      West Branch Office
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select
                  value={rackData.assignedTo}
                  onValueChange={(value) =>
                    setRackData((prev) => ({ ...prev, assignedTo: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Smith">
                      John Smith - Senior Approver
                    </SelectItem>
                    <SelectItem value="Sarah Johnson">
                      Sarah Johnson - Lead Approver
                    </SelectItem>
                    <SelectItem value="Mike Davis">
                      Mike Davis - Approver
                    </SelectItem>
                    <SelectItem value="Lisa Wilson">
                      Lisa Wilson - Senior Approver
                    </SelectItem>
                    <SelectItem value="Auto-Assign">
                      Auto-Assign (Next Available)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Processing Deadline</Label>
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={rackData.deadline}
                  onChange={(e) =>
                    setRackData((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={rackData.category}
                  onValueChange={(value) =>
                    setRackData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Traffic Violation">
                      Traffic Violation
                    </SelectItem>
                    <SelectItem value="Parking Violation">
                      Parking Violation
                    </SelectItem>
                    <SelectItem value="Speed Violation">
                      Speed Violation
                    </SelectItem>
                    <SelectItem value="License Violation">
                      License Violation
                    </SelectItem>
                    <SelectItem value="Vehicle Registration">
                      Vehicle Registration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">
                Additional Processing Notes
              </Label>
              <Textarea
                id="additionalNotes"
                value={rackData.additionalNotes}
                onChange={(e) =>
                  setRackData((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
                placeholder="Add any special instructions or notes for the approver..."
                rows={3}
              />
            </div>
          </div>

          {/* Summary Card */}
          <Card className="border-0 shadow-sm bg-pink-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-pink-600" />
                Submission Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Driver: {driver?.name}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Penalties: {selectedPenalties.length}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Amount: ${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Location: {rackData.location || "Not selected"}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Priority: {rackData.priority || "Not selected"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Status: Ready for Processing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white"
              disabled={
                isSubmitting ||
                !rackData.rackNumber ||
                !rackData.priority ||
                !rackData.location
              }
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Adding to Rack...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Rack
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
