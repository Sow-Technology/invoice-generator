import { deletePrescription } from "@/app/_actions/prescription";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { toast } from "sonner";

export default function DeletePrescriptionDialog({
  isOpen,
  setIsOpen,
  prescription,
}) {
  const handleDelete = async () => {
    try {
      await deletePrescription(prescription._id);
      toast.success("Prescription deleted successfully!", {
        id: "delete-prescription",
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to delete prescription. Please try again later.", {
        id: "delete-prescription",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {prescription.name}&#39;s prescription.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
