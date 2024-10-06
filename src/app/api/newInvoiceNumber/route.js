import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const invoiceCount = await Invoice.countDocuments();
    const nextInvoiceNumber = "JO" + (invoiceCount + 1);
    console.log(nextInvoiceNumber);
    return NextResponse.json(nextInvoiceNumber);
  } catch (error) {
    console.error("Error fetching invoice count:", error);
    return NextResponse.json(
      { error: "Unable to fetch invoice count" },
      { status: 500 }
    );
  }
}

// This configuration ensures the route is always dynamic
export const dynamic = "force-dynamic";
