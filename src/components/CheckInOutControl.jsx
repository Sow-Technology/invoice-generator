import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClockIcon,
  LogInIcon,
  LogOutIcon,
  CoffeeIcon,
  StopCircleIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CheckInOutControl({
  isCheckedIn,
  checkInTime,
  checkOutTime,
  breaks,
  onCheckIn,
  onCheckOut,
  onStartBreak,
  onEndBreak,
}) {
  const formatTime = (time) => {
    return time ? new Date(time).toLocaleTimeString() : "--:--:--";
  };

  const isOnBreak = breaks.length > 0 && !breaks[breaks.length - 1].end;
  const currentBreakStartTime = isOnBreak
    ? breaks[breaks.length - 1].start
    : null;

  const hasCheckedOutToday = !!checkOutTime;

  console.log(breaks);
  console.log(isOnBreak);
  console.log(checkOutTime);
  const CheckInButton = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            {" "}
            {/* Wrap button in span for tooltip to work on disabled button */}
            <Button
              onClick={onCheckIn}
              className="w-full"
              variant="default"
              disabled={hasCheckedOutToday}
            >
              <LogInIcon className="mr-2 h-4 w-4" /> Check In
            </Button>
          </span>
        </TooltipTrigger>
        {hasCheckedOutToday && (
          <TooltipContent>
            <p>You&#39;ve already checked out today. Check in tomorrow.</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );

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
            {isOnBreak && (
              <p className="text-sm font-medium">
                Current Break Start: {formatTime(currentBreakStartTime)}
              </p>
            )}
          </div>
          {isCheckedIn && !checkOutTime ? (
            <Button
              onClick={onCheckOut}
              className="w-full"
              variant="destructive"
              disabled={isOnBreak}
            >
              <LogOutIcon className="mr-2 h-4 w-4" /> Check Out
            </Button>
          ) : (
            <CheckInButton />
          )}
          {isCheckedIn && !checkOutTime && (
            <Button
              onClick={isOnBreak ? onEndBreak : onStartBreak}
              className="w-full"
              variant={isOnBreak ? "outline" : "secondary"}
            >
              {isOnBreak ? (
                <>
                  <StopCircleIcon className="mr-2 h-4 w-4" /> End Break
                </>
              ) : (
                <>
                  <CoffeeIcon className="mr-2 h-4 w-4" /> Start Break
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
