"use client";
import { useState, useEffect } from "react";

export function useAttendance() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/attendance/current");
      const data = await response.json();
      if (data.success) {
        setAttendanceData({
          today: {
            date: new Date(data.attendance.date),
            checkIn: data.attendance.checkIn
              ? new Date(data.attendance.checkIn)
              : null,
            checkOut: data.attendance.checkOut
              ? new Date(data.attendance.checkOut)
              : null,
            breaks: data.attendance.breaks.map((b) => ({
              ...b,
              start: new Date(b.start),
              end: b.end ? new Date(b.end) : null,
            })),
            status: data.attendance.status,
            totalWorkTime: data.attendance.totalWorkTime,
          },
        });
      } else {
        setError(new Error(data.message || "Failed to fetch attendance data"));
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    const intervalId = setInterval(fetchAttendance, 60000); // Refresh every minute
    return () => clearInterval(intervalId);
  }, []);

  return { data: attendanceData, isLoading, error, refetch: fetchAttendance };
}
