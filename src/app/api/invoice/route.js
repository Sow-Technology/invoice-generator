import { updateAggregatedData } from "@/app/_actions/analytics";
import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";
import mongoose from "mongoose";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  console.log("Received body:", body);

  const {
    orderNumber,
    customerName,
    phoneNumber,
    emailId,
    items,
    amountPaid,
    taxValue,
    tax,
    couponCode,
    subTotal,
    notes,
    storeName,
    paymentMode,
    isPaymentDone,
    orderExpenses,
  } = body;

  if (!orderNumber || !customerName || !phoneNumber || !emailId) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400 }
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newInvoice = new Invoice({
      orderNumber,
      customerName,
      phoneNumber,
      emailId,
      items,
      amountPaid,
      taxValue,
      tax,
      couponCode,
      subTotal,
      notes,
      storeName,
      paymentMode,
      orderExpenses,
    });

    // Save the invoice to the database
    const savedInvoice = await newInvoice.save({ session });

    // Update aggregated data
    await updateAggregatedData(savedInvoice, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    console.log("Data saved and aggregated");
    return new Response(JSON.stringify({ success: true, data: savedInvoice }), {
      status: 201,
    });
  } catch (error) {
    // If an error occurred, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error saving invoice:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to save invoice" }),
      { status: 400 }
    );
  }
}
