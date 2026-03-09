"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  Eye,
  FileText,
  ImageIcon,
  Video,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Mock documents data
const mockDocuments = [
  {
    id: "DOC-001",
    name: "Driver License Scan",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2025-06-15T10:30:00Z",
    status: "Verified",
    category: "Identity",
    required: true,
  },
  {
    id: "DOC-002",
    name: "Vehicle Registration",
    type: "PDF",
    size: "1.8 MB",
    uploadedAt: "2025-06-15T10:32:00Z",
    status: "Pending Review",
    category: "Vehicle",
    required: true,
  },
  {
    id: "DOC-003",
    name: "Violation Photo 1",
    type: "JPG",
    size: "3.2 MB",
    uploadedAt: "2025-06-15T10:35:00Z",
    status: "Verified",
    category: "Evidence",
    required: false,
  },
  {
    id: "DOC-004",
    name: "Traffic Camera Video",
    type: "MP4",
    size: "15.6 MB",
    uploadedAt: "2025-06-15T10:40:00Z",
    status: "Verified",
    category: "Evidence",
    required: false,
  },
];

interface TrafficDocumentsProps {
  driverLicense: {
    type: "licenseNumber" | "phoneNumber";
    value: string;
  } | null;
}

export function TrafficDocuments({ driverLicense }: TrafficDocumentsProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-blue-600" />;
      case "mp4":
      case "avi":
        return <Video className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "Pending Review":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const requiredDocs = mockDocuments.filter((doc) => doc.required);
  const evidenceDocs = mockDocuments.filter((doc) => !doc.required);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          Supporting Documents
        </h3>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Required Documents */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requiredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(doc.type)}
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.size} • Uploaded{" "}
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(doc.status)}
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evidence Documents */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            Evidence & Supporting Files
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {evidenceDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(doc.type)}
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.size} • Uploaded{" "}
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(doc.status)}
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Upload Additional Documents
          </h3>
          <p className="text-gray-500 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button
            variant="outline"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose Files
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
