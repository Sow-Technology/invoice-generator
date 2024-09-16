import dbConnect from "@/lib/dbConnect";
// import Invoicee from "@/models/datab";
import { Store } from "@/models/store";

// Handle POST request
export async function POST(req) {
  await dbConnect();

  // Ensure the request body is properly parsed
  const body = await req.json();

  console.log("Received body:", body);

  const {
    code,
    storeName,
    phoneNumber,
    address,
  } = body;

  // Validate required fields
  if (!code || !storeName || !phoneNumber || !address) {
    return new Response(
      JSON.stringify({ success: false, message: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    const newStore = new Store({
      code,
      storeName,
      phoneNumber,
      address,
    });

    // Save the invoice to the database
    const savedInvoice = await newStore.save();
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
