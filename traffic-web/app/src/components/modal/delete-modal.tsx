import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({
  onDelete,
  isDeleting,
  toggleModal,
}: {
  onDelete: () => void;
  isDeleting: boolean;
  toggleModal: () => void;
}) => {
  return (
    <Dialog open={true} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="default" onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
