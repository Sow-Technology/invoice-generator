"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { Attendance } from "@/models/Attendance";
import { auth } from "@/auth";

export async function updateUser(user) {
  await dbConnect();
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, user);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return true;
  } catch (err) {
    throw new Error("Unable to update the user");
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
    { $set: { checkIn: new Date(), status: "present" } },
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

  await Attendance.updateOne(
    { user: session.user.id, date: today },
    { $set: { checkOut: checkOutTime, totalWorkTime } }
  );

  revalidatePath("/");
}

export async function startBreak() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    user: session.user.id,
    date: today,
  });

  if (attendance?.breaks?.some((b) => !b.end)) {
    throw new Error("You already have an ongoing break.");
  }

  await Attendance.updateOne(
    { user: session.user.id, date: today },
    { $push: { breaks: { start: new Date() } } }
  );

  revalidatePath("/");
}

export async function endBreak() {
  const session = await auth();
  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    user: session.user.id,
    date: today,
    "breaks.end": null,
  });

  if (!attendance) {
    throw new Error("No ongoing break found.");
  }

  await Attendance.updateOne(
    { user: session.user.id, date: today, "breaks.end": null },
    { $set: { "breaks.$.end": new Date() } }
  );

  revalidatePath("/");
}
