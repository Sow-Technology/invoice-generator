import dbConnect from "@/lib/dbConnect";
import { Counter } from "@/models/Counter";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    // Find the invoice counter and increment it atomically
    const counter = await Counter.findOneAndUpdate(
      { name: "invoice" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const nextInvoiceNumber = "JO" + counter.value;
    console.log(nextInvoiceNumber);

    return NextResponse.json(nextInvoiceNumber);
  } catch (error) {
    console.error("Error fetching invoice number:", error);
    return NextResponse.json(
      { error: "Unable to fetch invoice number" },
      { status: 500 }
    );
  }
}

// This configuration ensures the route is always dynamic
export const dynamic = "force-dynamic";
