"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { checkIn, checkOut, endBreak, startBreak } from "@/app/_actions/user";
import { toast } from "sonner"; // Recommended for better error handling

export default function CheckInOutControl({ initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (action) => {
      switch (action) {
        case "checkIn":
          return checkIn();
        case "checkOut":
          return checkOut();
        case "startBreak":
          return startBreak();
        case "endBreak":
          return endBreak();
        default:
          return Promise.reject(new Error("Invalid action"));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Action completed successfully");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleAction = (action) => {
    mutation.mutate(action);

    switch (action) {
      case "checkIn":
        setStatus("checked-in");
        break;
      case "checkOut":
        setStatus("checked-out");
        break;
      case "startBreak":
        setStatus("on-break");
        break;
      case "endBreak":
        setStatus("checked-in");
        break;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button
        onClick={() => handleAction("checkIn")}
        disabled={status !== "checked-out" || mutation.isPending}
      >
        Check In
      </Button>
      <Button
        onClick={() => handleAction("checkOut")}
        disabled={status === "checked-out" || mutation.isPending}
      >
        Check Out
      </Button>
      <Button
        onClick={() => handleAction("startBreak")}
        disabled={status !== "checked-in" || mutation.isPending}
      >
        Start Break
      </Button>
      <Button
        onClick={() => handleAction("endBreak")}
        disabled={status !== "on-break" || mutation.isPending}
      >
        End Break
      </Button>
    </div>
  );
}
