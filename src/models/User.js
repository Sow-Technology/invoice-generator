import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, // e.g., 'superuser' or 'user'
      default: 'user',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    storeAccess: {
      type: [String], // Array to store names of stores
      default: [],
    },
  },
  { timestamps: true }
);



export const User = mongoose.models.User || mongoose.model("User", userSchema);
