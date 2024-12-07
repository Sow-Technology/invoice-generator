"use client";

import { useTimeTracking } from "@/hooks/useTimeTracking";
import AttendanceProgressBar from "@/components/AttendanceProgressBar";
import AttendanceCalendar from "@/components/AttendanceCalendar";
import CheckInOutControl from "@/components/CheckInOutControl";
import { useEffect } from "react";

export default function AttendanceLogger() {
  const {
    isCheckedIn,
    checkInTime,
    checkOutTime,
    breaks,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
    attendanceStatus,
    error,
    totalTimeSinceCheckIn,
    actualWorkTime,
    currentBreakTime,
    progressPercentage,
    monthlyAttendance,
  } = useTimeTracking();
  console.log(monthlyAttendance);

  // useEffect(() => {
  //   fetchAttendanceData();
  // }, [fetchAttendanceData]);
  console.log(breaks);
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  const handleStatusChange = async (action) => {
    if (action === "checkIn") {
      await checkIn();
    } else if (action === "checkOut") {
      await checkOut();
    } else if (action === "startBreak") {
      await startBreak();
    } else if (action === "endBreak") {
      await endBreak();
    }
    // fetchAttendanceData();
  };

  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="space-y-4 col-span-1">
          <h2 className="text-2xl font-semibold">Today</h2>
          <CheckInOutControl
            initialStatus={attendanceStatus}
            onStatusChange={handleStatusChange}
            isCheckedIn={isCheckedIn}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            onCheckIn={() => handleStatusChange("checkIn")}
            onCheckOut={() => handleStatusChange("checkOut")}
            onStartBreak={() => handleStatusChange("startBreak")}
            onEndBreak={() => handleStatusChange("endBreak")}
            breaks={breaks}
          />
          <AttendanceProgressBar
            isCheckedIn={isCheckedIn}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            breaks={breaks}
            startBreak={startBreak}
            endBreak={endBreak}
            totalTimeSinceCheckIn={totalTimeSinceCheckIn}
            actualWorkTime={actualWorkTime}
            currentBreakTime={currentBreakTime}
            progressPercentage={progressPercentage}
            attendanceStatus={attendanceStatus}
          />
        </section>

        <section className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-semibold">This Month</h2>
          <AttendanceCalendar attendance={monthlyAttendance || []} />
        </section>
      </div>
    </main>
  );
}
