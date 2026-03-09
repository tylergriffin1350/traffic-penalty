"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Clock,
  Plus,
  CheckCircle,
  Download,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const mockRackData = {
  rackNumber: "R-2025-042",
  status: "Pending Approval",
  priority: "Medium",
  assignedTo: "John Smith",
  createdAt: "2025-05-15T10:30:00Z",
  updatedAt: "2025-05-18T14:45:00Z",
  category: "Traffic Violation",
  location: "Central Office - Floor 2, Section B",
  documents: [
    {
      id: "DOC-001",
      name: "Penalty Notice",
      status: "Verified",
      uploadedAt: "2025-05-15T10:35:00Z",
    },
    {
      id: "DOC-002",
      name: "Driver License Scan",
      status: "Verified",
      uploadedAt: "2025-05-15T10:36:00Z",
    },
    {
      id: "DOC-003",
      name: "Vehicle Registration",
      status: "Pending Verification",
      uploadedAt: "2025-05-15T10:37:00Z",
    },
    {
      id: "DOC-004",
      name: "Payment Receipt",
      status: "Missing",
      uploadedAt: null,
    },
  ],
};

interface RackInformationProps {
  onUpdateStatus: () => void;
  onAddNote: () => void;
}

export function RackInformation({
  onUpdateStatus,
  onAddNote,
}: RackInformationProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Rack Information</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
            onClick={onUpdateStatus}
          >
            <Clock className="mr-2 h-4 w-4" />
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Rack Details
              </h4>
              <Badge
                className={
                  mockRackData.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : mockRackData.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-amber-100 text-amber-800"
                }
              >
                {mockRackData.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Rack Number</p>
                <p className="text-sm font-medium">{mockRackData.rackNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Priority</p>
                <p className="text-sm font-medium">{mockRackData.priority}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium">{mockRackData.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Assigned To</p>
                <p className="text-sm font-medium">{mockRackData.assignedTo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm font-medium">
                  {format(new Date(mockRackData.createdAt), "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium">
                  {format(new Date(mockRackData.updatedAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Location</h4>
            <p className="text-sm">{mockRackData.location}</p>
          </div>

          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">Notes</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                onClick={onAddNote}
              >
                <Plus className="h-4 w-4" />
                <span className="ml-1">Add Note</span>
              </Button>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex justify-between items-start">
                  <p className="text-sm">
                    Driver has requested an extension for payment due to
                    financial hardship.
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Note
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Note
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>Added by Sarah Johnson</span>
                  <span className="mx-1">•</span>
                  <span>May 16, 2025</span>
                </div>
              </div>
            </div>
          </div>
          */}
        </div>

        <div className="space-y-4">
          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Required Documents
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              >
                <Plus className="h-4 w-4" />
                <span className="ml-1">Add Document</span>
              </Button>
            </div>
            <div className="space-y-3">
              {mockRackData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-3 rounded border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{doc.name}</span>
                    <Badge
                      className={
                        doc.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Missing"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                  {doc.uploadedAt && (
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span>
                        Uploaded on{" "}
                        {format(new Date(doc.uploadedAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  )}
                  <div className="mt-2 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      <span className="text-xs">Download</span>
                    </Button>
                    {doc.status !== "Verified" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Verify</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Approval Actions
            </h4>
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Penalty
              </Button>
              {/* <Button
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Clock className="mr-2 h-4 w-4" />
                Request More Information
              </Button> */}
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Reject Penalty
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
