import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
});

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
    },
    breaks: [breakSchema],
    totalWorkTime: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["present", "absent", "partial"],
      default: "absent",
    },
  },
  { timestamps: true }
);

export const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
