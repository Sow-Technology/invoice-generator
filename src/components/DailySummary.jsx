import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardListIcon } from "lucide-react";

export default function DailySummary({
  checkInTime,
  checkOutTime,
  breaks,
  dailyHours,
}) {
  const formatTime = (time) => {
    return time ? new Date(time).toLocaleTimeString() : "--:--:--";
  };

  const formatDuration = (start, end) => {
    if (!end) return "Ongoing";
    const duration =
      (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60;
    return `${Math.floor(duration)} minutes`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardListIcon className="mr-2" />
          Daily Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">Check-in: {formatTime(checkInTime)}</p>
          <p className="text-sm">Check-out: {formatTime(checkOutTime)}</p>
          <p className="text-sm font-medium">Breaks:</p>
          <ul className="list-disc list-inside space-y-1">
            {breaks.map((breakPeriod, index) => (
              <li key={index} className="text-sm">
                {formatTime(breakPeriod.start)} - {formatTime(breakPeriod.end)}{" "}
                ({formatDuration(breakPeriod.start, breakPeriod.end)})
              </li>
            ))}
          </ul>
          <p className="text-sm font-medium mt-4">
            Total Hours Worked: {dailyHours.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
