"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Save, Plus, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

// Mock existing notes
const mockExistingNotes = [
  {
    id: "NOTE-001",
    content:
      "Driver was cooperative during traffic stop. Admitted to speeding due to emergency.",
    author: "Officer Sarah Johnson",
    timestamp: "2025-06-15T10:30:00Z",
    type: "Officer Note",
  },
  {
    id: "NOTE-002",
    content:
      "Vehicle registration expires next month. Driver should be reminded to renew.",
    author: "Officer Mike Davis",
    timestamp: "2025-06-14T14:15:00Z",
    type: "Administrative Note",
  },
];

interface TrafficNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  driverLicense: {
    type: "licenseNumber" | "phoneNumber";
    value: string;
  } | null;
}

export function TrafficNotes({
  notes,
  onNotesChange,
  driverLicense,
}: TrafficNotesProps) {
  const handleSaveNote = () => {
    console.log("Saving note:", notes);
    // In real app, this would save the note
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">
          Case Notes & Comments
        </h3>
        <Button
          variant="outline"
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Template Note
        </Button>
      </div>

      {/* New Note */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-pink-600" />
            Add New Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add notes about this case, driver behavior, special circumstances, or processing instructions..."
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              This note will be included when the case is added to the
              processing rack.
            </p>
            <Button
              onClick={handleSaveNote}
              disabled={!notes.trim()}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
            Previous Notes ({mockExistingNotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockExistingNotes.map((note) => (
            <div key={note.id} className="p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      note.type === "Officer Note"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }
                  >
                    {note.type}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    by {note.author}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{note.content}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(note.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Note Templates */}
      <Card className="border-0 shadow-sm bg-blue-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Plus className="mr-2 h-5 w-5 text-blue-600" />
            Quick Note Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Driver was cooperative during stop",
              "Vehicle registration needs renewal",
              "Evidence photos attached",
              "Requires supervisor review",
              "Payment plan requested",
              "Court appearance scheduled",
            ].map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() =>
                  onNotesChange(notes + (notes ? "\n\n" : "") + template)
                }
              >
                <Plus className="mr-2 h-3 w-3" />
                {template}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
