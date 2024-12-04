import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, LogInIcon, LogOutIcon } from "lucide-react";

export default function ClockInOut({
  isCheckedIn,
  checkInTime,
  checkOutTime,
  onCheckIn,
  onCheckOut,
}) {
  const formatTime = (time) => {
    return time ? new Date(time).toLocaleTimeString() : "--:--:--";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClockIcon className="mr-2" />
          Clock In/Out
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">
              Check-in Time: {formatTime(checkInTime)}
            </p>
            <p className="text-sm font-medium">
              Check-out Time: {formatTime(checkOutTime)}
            </p>
          </div>
          <Button
            onClick={isCheckedIn ? onCheckOut : onCheckIn}
            className="w-full"
            variant={isCheckedIn ? "destructive" : "default"}
          >
            {isCheckedIn ? (
              <>
                <LogOutIcon className="mr-2 h-4 w-4" /> Check Out
              </>
            ) : (
              <>
                <LogInIcon className="mr-2 h-4 w-4" /> Check In
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
