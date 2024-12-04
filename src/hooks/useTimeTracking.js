import { useState, useEffect } from "react";

export function useTimeTracking() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [breaks, setBreaks] = useState([]);
  const [dailyHours, setDailyHours] = useState(0);
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("timeTrackingData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsCheckedIn(parsedData.isCheckedIn);
      setCheckInTime(parsedData.checkInTime);
      setCheckOutTime(parsedData.checkOutTime);
      setBreaks(parsedData.breaks);
    }

    const storedMonthlyData = localStorage.getItem("monthlyAttendance");
    if (storedMonthlyData) {
      setMonthlyAttendance(JSON.parse(storedMonthlyData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "timeTrackingData",
      JSON.stringify({ isCheckedIn, checkInTime, checkOutTime, breaks })
    );
  }, [isCheckedIn, checkInTime, checkOutTime, breaks]);

  useEffect(() => {
    localStorage.setItem(
      "monthlyAttendance",
      JSON.stringify(monthlyAttendance)
    );
  }, [monthlyAttendance]);

  const checkIn = () => {
    const now = new Date().toISOString();
    setIsCheckedIn(true);
    setCheckInTime(now);
    setCheckOutTime(null);
    setBreaks([]);
  };

  const checkOut = () => {
    const now = new Date().toISOString();
    setIsCheckedIn(false);
    setCheckOutTime(now);
    updateDailyRecord();
  };

  const startBreak = () => {
    if (breaks.length < 3 && isCheckedIn) {
      setBreaks([...breaks, { start: new Date().toISOString(), end: null }]);
    }
  };

  const endBreak = () => {
    if (breaks.length > 0 && breaks[breaks.length - 1].end === null) {
      const updatedBreaks = [...breaks];
      updatedBreaks[updatedBreaks.length - 1].end = new Date().toISOString();
      setBreaks(updatedBreaks);
    }
  };

  const updateDailyRecord = () => {
    const totalHours = calculateTotalHours();
    setDailyHours(totalHours);

    const today = new Date().toISOString().split("T")[0];
    const dailyRecord = {
      date: today,
      checkIn: checkInTime,
      checkOut: checkOutTime,
      breaks,
      totalHours,
    };

    setMonthlyAttendance((prev) => {
      const updatedAttendance = [...prev];
      const existingRecordIndex = updatedAttendance.findIndex(
        (record) => record.date === today
      );
      if (existingRecordIndex !== -1) {
        updatedAttendance[existingRecordIndex] = dailyRecord;
      } else {
        updatedAttendance.push(dailyRecord);
      }
      return updatedAttendance;
    });
  };

  const calculateTotalHours = () => {
    if (!checkInTime || !checkOutTime) return 0;

    const start = new Date(checkInTime).getTime();
    const end = new Date(checkOutTime).getTime();
    let totalMs = end - start;

    breaks.forEach((breakPeriod) => {
      if (breakPeriod.start && breakPeriod.end) {
        const breakStart = new Date(breakPeriod.start).getTime();
        const breakEnd = new Date(breakPeriod.end).getTime();
        totalMs -= breakEnd - breakStart;
      }
    });

    return Math.round((totalMs / (1000 * 60 * 60)) * 100) / 100; // Round to 2 decimal places
  };

  return {
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
  };
}
