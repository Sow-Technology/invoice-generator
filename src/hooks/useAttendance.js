"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchAttendance() {
  const res = await fetch("/api/getAttendance");
  if (!res.ok) {
    throw new Error("Failed to fetch attendance data");
  }
  return res.json();
}

export function useAttendance() {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: fetchAttendance,
    refetchInterval: 60000, // Refetch every minute
  });
}
