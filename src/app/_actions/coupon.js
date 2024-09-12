"use server";

import dbConnect from "@/lib/dbConnect";
import { Coupon } from "@/models/Coupon";

export async function createCoupon({ data }) {
  await dbConnect();
  try {
    const existingCoupon = await Coupon.find({ code: data.code });
    if (existingCoupon.length) {
      throw new Error("Coupon already exists with this code.");
    }

    const newCoupon = new Coupon({
      ...data,
    });
    const savedCoupon = await newCoupon.save();
    console.log(savedCoupon);
  } catch (err) {
    if (err.message.includes("Coupon already exists")) {
      return {
        success: false,
        message: "A coupon with this code already exists",
      };
    }
    return {
      success: false,
      message: "An error occurred while creating the coupon",
    };
  }
}
