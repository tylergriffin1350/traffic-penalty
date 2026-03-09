"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (note: string) => void;
}

export function AddNoteDialog({
  open,
  onOpenChange,
  onAdd,
}: AddNoteDialogProps) {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    onAdd(note);
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Add a note to this penalty case. Notes are visible to all approvers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              placeholder="Enter your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!note.trim()}>
            Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UpdateStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (status: string, note?: string) => void;
}

export function UpdateStatusDialog({
  open,
  onOpenChange,
  onUpdate,
}: UpdateStatusDialogProps) {
  const [status, setStatus] = useState("pending-approval");
  const [note, setNote] = useState("");

  const handleUpdate = () => {
    onUpdate(status, note);
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Update the status of this penalty case.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending-approval">
                  Pending Approval
                </SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="statusNote">Note (Optional)</Label>
            <Textarea
              id="statusNote"
              placeholder="Add a note about this status change..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
