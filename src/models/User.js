import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["superAdmin", "coSuperAdmin", "admin", "manager", "user"],
      default: "user",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    storeAccess: {
      type: [String],
      default: [],
    },
    // New fields
    name: String,
    contactNumber: String,
    employeeId: String,
    bloodGroup: String,
    aadharNumber: String,
    panNumber: String,
    homeAddress: String,
    emergencyContact1: String,
    emergencyContact2: String,
    bankName: String,
    bankAccountNumber: String,
    ifscCode: String,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
