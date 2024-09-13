"use server";

import dbConnect from "@/lib/dbConnect";
import { Coupon } from "@/models/Coupon";

export async function createCoupon({ data }) {
  await dbConnect();
  try {
    const existingCoupon = await Coupon.findOne({ code: data.code });
    if (existingCoupon.length) {
      console.log("Already exxitss======s");
      console.log(existingCoupon);
      throw new Error("Coupon already exists with this code.");
    }

    const newCoupon = new Coupon({
      ...data,
    });
    const savedCoupon = await newCoupon.save();
    console.log(savedCoupon);
  } catch (err) {
    if (err.message.includes("Coupon already exists")) {
      console.log("Already exxitss======s");
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

export async function getCouponDetails(couponCode) {
  try {
    await dbConnect();

    const coupon = await Coupon.findOne({ couponCode }).lean();
    coupon._id = undefined;
    if (!coupon) {
      throw new Error(`Coupon with code ${couponCode} not found.`);
    }

    console.log("Coupon details retrieved successfully:", coupon);
    return { success: true, data: coupon };
  } catch (error) {
    console.error("Error fetching coupon details:", error.message);
    return { success: false, error: error.message };
  }
}
