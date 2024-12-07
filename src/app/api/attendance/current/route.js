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
  const dateParam = searchParams.get("date");
  const date = new Date(dateParam || Date.now());
  date.setHours(0, 0, 0, 0);

  try {
    const attendance = await Attendance.findOne({
      user: session.user.id,
      date,
    }).lean();

    return NextResponse.json({
      success: true,
      attendance: attendance
        ? {
            checkIn: attendance.checkIn,
            checkOut: attendance.checkOut,
            breaks: attendance.breaks,
            status: attendance.status,
          }
        : null,
      message: attendance
        ? null
        : "No attendance record for the specified date",
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
