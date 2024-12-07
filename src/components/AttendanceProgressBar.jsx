import { Tooltip } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

export default function AttendanceProgressBar({
  checkInTime,
  checkOutTime,
  breaks,
  totalTimeSinceCheckIn,
  progressPercentage,
  attendanceStatus,
}) {
  const [currentBreakDuration, setCurrentBreakDuration] = useState(0);

  const formatTime = (hours) => {
    if (isNaN(hours) || hours < 0) return "00:00:00";
    const totalSeconds = Math.floor(hours * 3600);
    const hours_ = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours_.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isOnBreak = breaks.length > 0 && !breaks[breaks.length - 1].end;
  const currentBreakStartTime = isOnBreak
    ? breaks[breaks.length - 1].start
    : null;

  useEffect(() => {
    let interval;
    if (isOnBreak) {
      interval = setInterval(() => {
        const now = new Date();
        const breakStart = new Date(currentBreakStartTime);
        const duration = (now - breakStart) / 1000 / 3600; // in hours
        setCurrentBreakDuration(duration);
      }, 1000);
    } else {
      setCurrentBreakDuration(0);
    }
    return () => clearInterval(interval);
  }, [isOnBreak, currentBreakStartTime]);

  return (
    <div className="w-full max-w-lg mx-auto mb-8 p-4 bg-white shadow-md rounded-md">
      <div className="mb-4 text-sm">
        <p>
          <strong>Check-in:</strong>{" "}
          {checkInTime
            ? new Date(checkInTime).toLocaleTimeString()
            : "Not checked in"}
        </p>
        {checkOutTime && (
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(checkOutTime).toLocaleTimeString()}
          </p>
        )}
        {isOnBreak && (
          <>
            <p>
              <strong>Current Break Start:</strong>{" "}
              {new Date(currentBreakStartTime).toLocaleTimeString()}
            </p>
            <p>
              <strong>Break Duration:</strong>{" "}
              {formatTime(currentBreakDuration)}
            </p>
          </>
        )}
        <p>
          <strong>Total Time:</strong>{" "}
          {formatTime(totalTimeSinceCheckIn / 3600)}
        </p>
        <p>
          <strong>Attendance Status:</strong> {attendanceStatus}
        </p>
      </div>

      <div className="relative pt-2">
        <div className="w-full h-4 bg-gray-200 rounded-md">
          <div
            className="h-full bg-blue-500 rounded-md"
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>

        {breaks.map((breakPeriod, index) => {
          if (!checkInTime) return null;
          const breakStart = new Date(breakPeriod.start);
          const breakEnd = breakPeriod.end
            ? new Date(breakPeriod.end)
            : new Date();
          const breakStartPercentage =
            ((breakStart - new Date(checkInTime)) / (7 * 3600 * 1000)) * 100;
          const breakEndPercentage =
            ((breakEnd - new Date(checkInTime)) / (7 * 3600 * 1000)) * 100;

          return (
            <Tooltip
              key={index}
              text={`Break ${index + 1}: ${breakStart.toLocaleTimeString()} - ${
                breakPeriod.end ? breakEnd.toLocaleTimeString() : "Ongoing"
              }`}
            >
              <div
                className="absolute top-0 h-4 bg-red-500 rounded-md opacity-50"
                style={{
                  left: `${breakStartPercentage}%`,
                  width: `${breakEndPercentage - breakStartPercentage}%`,
                }}
              />
            </Tooltip>
          );
        })}
      </div>

      <div className="mt-4 text-center text-sm">
        <p className="text-gray-700">
          Total Time:{" "}
          <strong>{formatTime(totalTimeSinceCheckIn / 3600)} / 07:00:00</strong>
        </p>
        <p className="text-gray-500">
          Progress: <strong>{progressPercentage.toFixed(2)}%</strong>
        </p>
      </div>
    </div>
  );
}
