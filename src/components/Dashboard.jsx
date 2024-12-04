"use client";

import { useState, useEffect } from "react";
import ClockInOut from "./ClockInOut";
import BreakManagement from "./BreakManagement";
import DailySummary from "./DailySummary";
import AttendanceCalendar from "./AttendanceCalendar";
import { useTimeTracking } from "@/hooks/useTimeTracking";

export default function Dashboard() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ClockInOut
        isCheckedIn={isCheckedIn}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        onCheckIn={checkIn}
        onCheckOut={checkOut}
      />
      <BreakManagement
        isCheckedIn={isCheckedIn}
        breaks={breaks}
        onStartBreak={startBreak}
        onEndBreak={endBreak}
      />
      <DailySummary
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        breaks={breaks}
        dailyHours={dailyHours}
      />
      <AttendanceCalendar monthlyAttendance={monthlyAttendance} />
    </div>
  );
}
