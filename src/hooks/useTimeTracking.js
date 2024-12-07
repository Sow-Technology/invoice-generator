"use client";
import { useState, useEffect, useCallback } from "react";
import { checkIn, checkOut, startBreak, endBreak } from "@/app/_actions/user";

export function useTimeTracking() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [breaks, setBreaks] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState("not checked in");
  const [error, setError] = useState(null);
  const [totalTimeSinceCheckIn, setTotalTimeSinceCheckIn] = useState(0);
  const [actualWorkTime, setActualWorkTime] = useState(0);
  const [currentBreakTime, setCurrentBreakTime] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);

  const fetchAttendanceData = useCallback(async () => {
    try {
      const response = await fetch("/api/attendance/current");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.attendance && data.attendance.checkIn) {
        setIsCheckedIn(true);
        setCheckInTime(data.attendance.checkIn);
        setBreaks(data.attendance.breaks || []);
        if (data.attendance.checkOut) {
          setCheckOutTime(data.attendance.checkOut);
        }
        setAttendanceStatus(data.attendance.status || "checked in");
      } else {
        setIsCheckedIn(false);
        setCheckInTime(null);
        setCheckOutTime(null);
        setBreaks([]);
        setAttendanceStatus("not checked in");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      setError("Failed to fetch attendance data: " + err.message);
    }
  }, []);
  const fetchMonthlyAttendance = useCallback(async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JavaScript months are 0-indexed
      const response = await fetch(
        `/api/attendance/monthly?year=${year}&month=${month}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setMonthlyAttendance(data.attendanceRecords);
      } else {
        throw new Error(data.error || "Failed to fetch monthly attendance");
      }
    } catch (err) {
      console.error("Error fetching monthly attendance:", err);
      setError("Failed to fetch monthly attendance: " + err.message);
    }
  }, []);

  useEffect(() => {
    fetchAttendanceData();
    fetchMonthlyAttendance();
  }, [fetchAttendanceData, fetchMonthlyAttendance]);

  useEffect(() => {
    let interval;
    if (isCheckedIn && checkInTime && !checkOutTime) {
      interval = setInterval(() => {
        const now = new Date();
        const checkInDate = new Date(checkInTime);
        if (isNaN(checkInDate.getTime())) {
          console.error("Invalid checkInTime:", checkInTime);
          return;
        }
        const totalMs = now - checkInDate;
        setTotalTimeSinceCheckIn(totalMs / 1000);

        let breakMs = 0;
        breaks.forEach((breakPeriod) => {
          if (breakPeriod.start && breakPeriod.end) {
            breakMs += new Date(breakPeriod.end) - new Date(breakPeriod.start);
          } else if (breakPeriod.start) {
            breakMs += now - new Date(breakPeriod.start);
          }
        });
        const workTimeHours = (totalMs - breakMs) / (1000 * 60 * 60);
        setActualWorkTime(workTimeHours);

        const progress = Math.min((workTimeHours / 7) * 100, 100);
        setProgressPercentage(progress);

        if (workTimeHours >= 7) {
          setAttendanceStatus("present");
        } else if (workTimeHours >= 3.5) {
          setAttendanceStatus("half day");
        } else {
          setAttendanceStatus("checked in");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime, checkOutTime, breaks]);

  const handleCheckIn = async () => {
    try {
      await checkIn();
      await fetchAttendanceData();
    } catch (err) {
      console.error("Check-in error:", err);
      setError("Failed to check in: " + err.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut();
      await fetchAttendanceData();
    } catch (err) {
      console.error("Check-out error:", err);
      setError("Failed to check out: " + err.message);
    }
  };

  const handleStartBreak = async () => {
    try {
      const response = await startBreak();
      if (response && response.success) {
        await fetchAttendanceData();
      } else {
        setError("Start break failed: " + (response?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Start break error:", err);
      setError("Failed to start break: " + err.message);
    }
  };

  const handleEndBreak = async () => {
    try {
      const response = await endBreak();
      if (response && response.success) {
        await fetchAttendanceData();
      } else {
        setError("End break failed: " + (response?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("End break error:", err);
      setError("Failed to end break: " + err.message);
    }
  };

  return {
    isCheckedIn,
    checkInTime,
    checkOutTime,
    breaks,
    checkIn: handleCheckIn,
    checkOut: handleCheckOut,
    startBreak: handleStartBreak,
    endBreak: handleEndBreak,
    attendanceStatus,
    error,
    totalTimeSinceCheckIn,
    actualWorkTime,
    currentBreakTime,
    progressPercentage,
    monthlyAttendance,
  };
}
