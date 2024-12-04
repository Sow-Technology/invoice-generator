"use client";
import { useState, useEffect } from "react";
import { Tooltip } from "@/components/ui/tooltip"; // Assuming Tooltip is already set up correctly
import { Button } from "@/components/ui/button"; // Assuming Button component from shadcn UI is used
import { useTimeTracking } from "@/hooks/useTimeTracking";

export default function AttendanceProgressBar({ attendanceData }) {
  const {
    isCheckedIn,
    checkInTime,
    checkOutTime,
    breaks,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
    dailyHours,
    monthlyAttendance,
  } = useTimeTracking();

  const [isOnBreak, setIsOnBreak] = useState(false);

  useEffect(() => {
    if (breaks.length > 0 && breaks[breaks.length - 1].end === null) {
      setIsOnBreak(true); // Set to true if there's an active break
    } else {
      setIsOnBreak(false);
    }
  }, [breaks]);

  const handleBreakClick = () => {
    if (isOnBreak) {
      endBreak(); // End the break if currently on break
    } else {
      startBreak(); // Start a new break if not on break
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 p-4 bg-white shadow-md rounded-md">
      {/* Check-in/Check-out and Breaks Section */}
      <div className="mb-4 text-sm">
        {!isCheckedIn ? (
          <Button
            onClick={checkIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Check-in
          </Button>
        ) : (
          <>
            <div>
              <p>
                <strong>Check-in:</strong>{" "}
                {checkInTime
                  ? new Date(checkInTime).toLocaleTimeString()
                  : "Not checked in"}
              </p>
              <p>
                <strong>Check-out:</strong>{" "}
                {checkOutTime
                  ? new Date(checkOutTime).toLocaleTimeString()
                  : "Not checked out"}
              </p>
            </div>

            <Button
              onClick={checkOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
            >
              Check-out
            </Button>

            {!isOnBreak ? (
              <Button
                onClick={startBreak}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Start Break
              </Button>
            ) : (
              <Button
                onClick={endBreak}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              >
                End Break
              </Button>
            )}
          </>
        )}
      </div>

      <div className="relative pt-2">
        {/* Progress Bar */}
        <div className="w-full h-4 bg-gray-200 rounded-md">
          {/* Add your progress bar logic here */}
        </div>

        {/* Break Indicator */}
        {breaks.map((breakPeriod, index) => {
          const breakStart = new Date(breakPeriod.start);
          const breakEnd = breakPeriod.end ? new Date(breakPeriod.end) : null;
          const breakStartPercentage =
            ((breakStart.getTime() - new Date(checkInTime).getTime()) /
              (8 * 60 * 60 * 1000)) *
            100;
          const breakEndPercentage = breakEnd
            ? ((breakEnd.getTime() - new Date(checkInTime).getTime()) /
                (8 * 60 * 60 * 1000)) *
              100
            : breakStartPercentage;

          return (
            <Tooltip
              key={index}
              text={`Break ${index + 1}: ${breakStart.toLocaleTimeString()} - ${
                breakEnd ? breakEnd.toLocaleTimeString() : "Ongoing"
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

      {/* Progress Information */}
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-700">
          Worked: <strong>{dailyHours} hrs / 8 hrs</strong>
        </p>
        <p className="text-gray-500">
          Progress: <strong>{((dailyHours / 8) * 100).toFixed(2)}%</strong>
        </p>
      </div>
    </div>
  );
}
