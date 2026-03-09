"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  Upload,
  ImageIcon,
  Video,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

// Mock documents data
const mockDocuments = [
  {
    id: "DOC-001",
    name: "Traffic Violation Report",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2025-06-08T14:35:00Z",
    uploadedBy: "Officer Sarah Johnson",
    category: "Official Report",
    status: "Verified",
    description: "Complete traffic violation report with officer observations",
  },
  {
    id: "DOC-002",
    name: "Violation Photo 1",
    type: "jpg",
    size: "1.8 MB",
    uploadedAt: "2025-06-08T14:36:00Z",
    uploadedBy: "Officer Sarah Johnson",
    category: "Evidence",
    status: "Verified",
    description: "Photo showing vehicle in violation",
  },
  {
    id: "DOC-003",
    name: "Violation Photo 2",
    type: "jpg",
    size: "2.1 MB",
    uploadedAt: "2025-06-08T14:36:00Z",
    uploadedBy: "Officer Sarah Johnson",
    category: "Evidence",
    status: "Verified",
    description: "Wide angle shot of violation scene",
  },
  {
    id: "DOC-004",
    name: "Radar Reading Data",
    type: "pdf",
    size: "856 KB",
    uploadedAt: "2025-06-08T14:37:00Z",
    uploadedBy: "Officer Sarah Johnson",
    category: "Technical Evidence",
    status: "Verified",
    description: "Calibrated radar device reading and certification",
  },
  {
    id: "DOC-005",
    name: "Red Light Camera Video",
    type: "mp4",
    size: "15.2 MB",
    uploadedAt: "2025-06-09T09:20:00Z",
    uploadedBy: "System Auto-Upload",
    category: "Video Evidence",
    status: "Pending Review",
    description: "Traffic camera footage of red light violation",
  },
  {
    id: "DOC-006",
    name: "Driver License Verification",
    type: "pdf",
    size: "1.2 MB",
    uploadedAt: "2025-06-09T10:15:00Z",
    uploadedBy: "Officer Sarah Johnson",
    category: "Driver Information",
    status: "Verified",
    description: "Driver license scan and verification results",
  },
];

interface SupportingDocumentsProps {
  caseReference: string;
}

export function SupportingDocuments({
  caseReference,
}: SupportingDocumentsProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-blue-600" />;
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="h-5 w-5 text-purple-600" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending Review":
        return "bg-amber-100 text-amber-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Official Report":
        return "bg-blue-100 text-blue-800";
      case "Evidence":
        return "bg-purple-100 text-purple-800";
      case "Technical Evidence":
        return "bg-indigo-100 text-indigo-800";
      case "Video Evidence":
        return "bg-pink-100 text-pink-800";
      case "Driver Information":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const verifiedCount = mockDocuments.filter(
    (doc) => doc.status === "Verified"
  ).length;
  const pendingCount = mockDocuments.filter(
    (doc) => doc.status === "Pending Review"
  ).length;

  return (
    <div className="space-y-6">
      {/* Document Summary */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-800">Document Summary</h3>
              <p className="text-sm text-blue-600">
                {verifiedCount} verified • {pendingCount} pending review •{" "}
                {mockDocuments.length} total
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Upload className="mr-2 h-4 w-4" />
                Add Document
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {mockDocuments.map((document) => (
          <Card
            key={document.id}
            className="border border-gray-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getFileIcon(document.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-800 truncate">
                        {document.name}
                      </h4>
                      <Badge className={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {document.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Size: {document.size}</span>
                      <span>•</span>
                      <span>
                        Uploaded:{" "}
                        {format(
                          new Date(document.uploadedAt),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                      <span>•</span>
                      <span>By: {document.uploadedBy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Requirements */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <FileCheck className="h-5 w-5 text-green-600 mr-2" />
            Document Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Required Documents</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 text-green-600 mr-2" />
                  <span>Traffic violation report</span>
                </div>
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 text-green-600 mr-2" />
                  <span>Photo evidence of violation</span>
                </div>
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 text-green-600 mr-2" />
                  <span>Driver license verification</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Additional Evidence</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 text-green-600 mr-2" />
                  <span>Radar/speed measurement data</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
                  <span>Video evidence (if available)</span>
                </div>
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 text-green-600 mr-2" />
                  <span>Location/scene photos</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
