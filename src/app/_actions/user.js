"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { Attendance } from "@/models/Attendance";
import { auth } from "@/auth";

export async function updateUser(user) {
  await dbConnect();
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    }).lean();
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return { success: true, user: updatedUser };
  } catch (err) {
    return { success: false, error: "Unable to update the user" };
  }
}

export async function checkIn() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    user: session.user.id,
    date: today,
  });

  if (existingAttendance?.checkIn) {
    throw new Error("You are already checked in.");
  }

  await Attendance.updateOne(
    { user: session.user.id, date: today },
    {
      $set: {
        checkIn: new Date(),
        status: "checked in", // Set initial status to "checked in"
      },
    },
    { upsert: true }
  );

  revalidatePath("/");
}
export async function checkOut() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    user: session.user.id,
    date: today,
  });

  if (!attendance?.checkIn) {
    throw new Error("You need to check in before checking out.");
  }

  if (attendance.checkOut) {
    throw new Error("You are already checked out.");
  }

  const checkOutTime = new Date();
  const totalWorkTime = (checkOutTime - attendance.checkIn) / (1000 * 60 * 60);

  // Determine status based on total work time
  let status;
  if (totalWorkTime >= 7) {
    status = "present";
  } else if (totalWorkTime > 0) {
    status = "half day";
  } else {
    status = "absent";
  }

  await Attendance.updateOne(
    { user: session.user.id, date: today },
    {
      $set: {
        checkOut: checkOutTime,
        totalWorkTime: totalWorkTime,
        status: status,
      },
    }
  );

  revalidatePath("/");
}

export async function startBreak() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const attendance = await Attendance.findOne({
      user: session.user.id,
      date: today,
    }).lean();

    if (!attendance) {
      return {
        success: false,
        error: "You need to check in before starting a break.",
      };
    }

    if (attendance?.breaks?.some((b) => !b.end)) {
      return { success: false, error: "You already have an ongoing break." };
    }

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { user: session.user.id, date: today },
      { $push: { breaks: { start: new Date() } } },
      { new: true }
    ).lean();

    revalidatePath("/");
    return { success: true, attendance: updatedAttendance };
  } catch (error) {
    console.error("Start break error:", error);
    return { success: false, error: "Failed to start break" };
  }
}

export async function endBreak() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const attendance = await Attendance.findOne({
      user: session.user.id,
      date: today,
      "breaks.end": null,
    }).lean();

    if (!attendance) {
      return { success: false, error: "No ongoing break found." };
    }

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { user: session.user.id, date: today, "breaks.end": null },
      { $set: { "breaks.$.end": new Date() } },
      { new: true }
    ).lean();

    revalidatePath("/");
    return { success: true, attendance: updatedAttendance };
  } catch (error) {
    console.error("End break error:", error);
    return { success: false, error: "Failed to end break" };
  }
}
