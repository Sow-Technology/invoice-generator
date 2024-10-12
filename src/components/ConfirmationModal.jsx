import React from "react";
import { Button } from "@/components/ui/button";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90vw] max-w-md">
        <h3 className="text-lg font-semibold text-center mb-4">{message}</h3>
        <div className="flex justify-center gap-4">
          <Button className="bg-red-500 text-white" onClick={onConfirm}>
            Yes, Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            No, Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
