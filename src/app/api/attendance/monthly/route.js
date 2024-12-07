import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { Attendance } from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year"));
  const month = parseInt(searchParams.get("month"));

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json(
      { success: false, error: "Invalid year or month" },
      { status: 400 }
    );
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const attendanceRecords = await Attendance.find({
      user: session.user.id,
      date: { $gte: startDate, $lte: endDate },
    }).lean();

    return NextResponse.json({
      success: true,
      attendanceRecords: attendanceRecords.map((record) => ({
        date: record.date,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        breaks: record.breaks,
        status: record.status,
      })),
    });
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
