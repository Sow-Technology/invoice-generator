"use client";

import { useAttendance } from "@/hooks/useAttendance";
import AttendanceCalendar from "@/components/AttendanceCalendar";
import AttendanceProgressBar from "@/components/AttendanceProgressBar";
import CheckInOutControl from "@/components/CheckInOutControl";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceLogger() {
  const { data: attendanceData, isLoading, error } = useAttendance();

  if (isLoading) {
    return <Skeleton className="w-full h-screen" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="space-y-4 col-span-1">
          <h2 className="text-2xl font-semibold">Today</h2>
          <AttendanceProgressBar attendanceData={attendanceData?.today} />
          {/* <CheckInOutControl initialStatus={attendanceData.today?.status} /> */}
        </section>

        <section className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-semibold">This Month</h2>
          <AttendanceCalendar attendance={attendanceData?.monthly} />
        </section>
      </div>
    </main>
  );
}
