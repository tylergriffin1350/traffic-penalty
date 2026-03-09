"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  User,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

// Mock previous comments/communications
const mockComments = [
  {
    id: "COMM-001",
    type: "question",
    author: "Approver Mike Chen",
    timestamp: "2025-06-09T11:30:00Z",
    message:
      "Could you provide additional photos of the vehicle's position relative to the crosswalk? The current angle doesn't clearly show the violation.",
    status: "pending_response",
  },
  {
    id: "COMM-002",
    type: "response",
    author: "Officer Sarah Johnson",
    timestamp: "2025-06-09T14:15:00Z",
    message:
      "I've uploaded two additional photos (DOC-007 and DOC-008) showing the vehicle's position from different angles. The vehicle was clearly 3 feet past the stop line when the light turned red.",
    status: "resolved",
  },
];

interface ApproverCommentsProps {
  comments: string;
  onCommentsChange: (comments: string) => void;
  trafficOfficer: {
    name: string;
    badge: string;
    phone: string;
    email: string;
    department: string;
  };
}

export function ApproverComments({
  comments,
  onCommentsChange,
  trafficOfficer,
}: ApproverCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [commentType, setCommentType] = useState<
    "question" | "clarification" | "note"
  >("question");

  const handleSendComment = () => {
    if (newComment.trim()) {
      // In real app, this would send the comment via API
      console.log("Sending comment:", {
        type: commentType,
        message: newComment,
      });
      setNewComment("");
    }
  };

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case "question":
        return "bg-blue-100 text-blue-800";
      case "clarification":
        return "bg-amber-100 text-amber-800";
      case "note":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_response":
        return "bg-amber-100 text-amber-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Traffic Officer Contact */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            Traffic Officer Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800">
                {trafficOfficer.name}
              </h4>
              <p className="text-sm text-blue-600">
                Badge: {trafficOfficer.badge}
              </p>
              <p className="text-sm text-blue-600">
                {trafficOfficer.department}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-blue-600 mr-2" />
                <a
                  href={`tel:${trafficOfficer.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {trafficOfficer.phone}
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-blue-600 mr-2" />
                <a
                  href={`mailto:${trafficOfficer.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {trafficOfficer.email}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Communications */}
      {mockComments.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-600 mr-2" />
              Previous Communications ({mockComments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockComments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {comment.author}
                    </span>
                    <Badge className={getCommentTypeColor(comment.type)}>
                      {comment.type}
                    </Badge>
                    <Badge className={getStatusColor(comment.status)}>
                      {comment.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(
                      new Date(comment.timestamp),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* New Comment/Question */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
            Add Comment or Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comment Type Selection */}
          <div className="flex gap-2">
            <Button
              variant={commentType === "question" ? "default" : "outline"}
              size="sm"
              onClick={() => setCommentType("question")}
              className={
                commentType === "question"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-blue-200 text-blue-700 hover:bg-blue-50"
              }
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Question
            </Button>
            <Button
              variant={commentType === "clarification" ? "default" : "outline"}
              size="sm"
              onClick={() => setCommentType("clarification")}
              className={
                commentType === "clarification"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-700 hover:bg-amber-50"
              }
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Clarification
            </Button>
            <Button
              variant={commentType === "note" ? "default" : "outline"}
              size="sm"
              onClick={() => setCommentType("note")}
              className={
                commentType === "note"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-200 text-green-700 hover:bg-green-50"
              }
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Note
            </Button>
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <Textarea
              placeholder={
                commentType === "question"
                  ? "Ask a question about the penalty details, evidence, or documentation..."
                  : commentType === "clarification"
                  ? "Request clarification on specific aspects of the case..."
                  : "Add a note or observation about this case..."
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {newComment.length}/500 characters
              </span>
              <Button
                onClick={handleSendComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Send {commentType}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Comments Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
            Final Approval Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Comments for approval decision (optional)
            </label>
            <Textarea
              placeholder="Add any final comments about your approval decision, concerns, or recommendations..."
              value={comments}
              onChange={(e) => onCommentsChange(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              These comments will be included in the approval record and may be
              visible to the traffic officer.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-700 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Traffic Officer
            </Button>
            <Button
              variant="outline"
              className="justify-start border-green-200 text-green-700 hover:bg-green-50"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button
              variant="outline"
              className="justify-start border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <Clock className="mr-2 h-4 w-4" />
              Request Extension
            </Button>
            <Button
              variant="outline"
              className="justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
