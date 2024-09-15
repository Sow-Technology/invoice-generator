import dbConnect from "@/lib/dbConnect";
import Invoicee from "@/models/datab";
import { Invoice } from "@/models/Invoice";

// Handle POST request
export async function POST(req) {
  await dbConnect();

  // Ensure the request body is properly parsed
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
    document,
  } = body;

  // Validate required fields
  if (!orderNumber || !customerName || !phoneNumber || !emailId) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400 }
    );
  }

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
      document,
    });

    // Save the invoice to the database
    const savedInvoice = await newInvoice.save();
    console.log("Data saved");
    return new Response(JSON.stringify({ success: true, data: savedInvoice }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error saving invoice:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to save invoice" }),
      { status: 400 }
    );
  }
}
