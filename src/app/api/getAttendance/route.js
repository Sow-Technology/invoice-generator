import { NextResponse } from "next/server";
import { Attendance } from "@/models/Attendance";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  await dbConnect();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAttendance = await Attendance.findOne({
    user: session.user.id,
    date: today,
  });

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const monthlyAttendance = await Attendance.find({
    user: session.user.id, // Replace with actual user ID
    date: { $gte: monthStart, $lte: monthEnd },
  });

  return NextResponse.json({
    today: todayAttendance || { breaks: [], status: "checked-out" },
    monthly: monthlyAttendance.map((record) => ({
      date: record.date.toISOString().split("T")[0],
      status: record.status,
    })),
  });
}
