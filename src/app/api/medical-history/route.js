import dbConnect from "@/lib/dbConnect";
import MedicalHistory from "@/models/MedicalHistory";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || null;

    const query = search
      ? { contactNo: { $regex: search, $options: "i" } }
      : {};

    const medicalHistories = await MedicalHistory.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    console.log(medicalHistories);
    const totalRecords = await MedicalHistory.countDocuments(query);

    return NextResponse.json({
      data: medicalHistories,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Error retrieving medical histories" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
