"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

const checklistItems = [
  {
    id: "penalty_validity",
    category: "Penalty Validity",
    title: "Penalty is valid and within jurisdiction",
    description:
      "Verify that the violation occurred within our jurisdiction and the penalty type is appropriate",
    required: true,
    priority: "high",
  },
  {
    id: "correct_fee",
    category: "Fee Verification",
    title: "Fine amount matches violation type",
    description:
      "Confirm the fine amount is correct according to current penalty schedule",
    required: true,
    priority: "high",
  },
  {
    id: "evidence_review",
    category: "Evidence Review",
    title: "All required evidence is present and clear",
    description:
      "Photos, videos, or other evidence clearly show the violation occurred",
    required: true,
    priority: "high",
  },
  {
    id: "vehicle_verification",
    category: "Vehicle Information",
    title: "Vehicle information is accurate and complete",
    description: "License plate, make, model, and year are correctly recorded",
    required: true,
    priority: "medium",
  },
  {
    id: "location_accuracy",
    category: "Location Verification",
    title: "Violation location is accurately recorded",
    description: "Address and GPS coordinates match the evidence provided",
    required: true,
    priority: "medium",
  },
  {
    id: "date_time_accuracy",
    category: "Date/Time Verification",
    title: "Date and time of violation are accurate",
    description:
      "Timestamp matches evidence and is within reasonable timeframe",
    required: true,
    priority: "medium",
  },
  {
    id: "officer_credentials",
    category: "Officer Verification",
    title: "Issuing officer credentials verified",
    description: "Officer badge number and authority confirmed",
    required: true,
    priority: "low",
  },
  {
    id: "documentation_complete",
    category: "Documentation",
    title: "All required documentation is complete",
    description: "Forms are properly filled out with all required signatures",
    required: true,
    priority: "low",
  },
  {
    id: "legal_compliance",
    category: "Legal Compliance",
    title: "Penalty complies with local traffic laws",
    description:
      "Violation and penalty are in accordance with current traffic regulations",
    required: true,
    priority: "high",
  },
  {
    id: "due_process",
    category: "Due Process",
    title: "Proper notice and appeal rights provided",
    description:
      "Driver has been properly notified and informed of appeal rights",
    required: false,
    priority: "medium",
  },
];

interface ApprovalChecklistProps {
  checklistItems: Record<string, boolean>;
  onChecklistUpdate: (itemId: string, checked: boolean) => void;
}

export function ApprovalChecklist({
  checklistItems: checkedItems,
  onChecklistUpdate,
}: ApprovalChecklistProps) {
  const requiredItems = checklistItems.filter((item) => item.required);
  const optionalItems = checklistItems.filter((item) => !item.required);

  const completedRequired = requiredItems.filter(
    (item) => checkedItems[item.id]
  ).length;
  const completedOptional = optionalItems.filter(
    (item) => checkedItems[item.id]
  ).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-800">Checklist Progress</h3>
              <p className="text-sm text-blue-600">
                Required: {completedRequired}/{requiredItems.length} • Optional:{" "}
                {completedOptional}/{optionalItems.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-800">
                {Math.round((completedRequired / requiredItems.length) * 100)}%
              </div>
              <div className="text-sm text-blue-600">Complete</div>
            </div>
          </div>
          <div className="mt-3 bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedRequired / requiredItems.length) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Required Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            Required Verification ({completedRequired}/{requiredItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Checkbox
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) =>
                  onChecklistUpdate(item.id, checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityIcon(item.priority)}
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Optional Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Additional Verification ({completedOptional}/{optionalItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {optionalItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <Checkbox
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) =>
                  onChecklistUpdate(item.id, checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getPriorityIcon(item.priority)}
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Optional
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
