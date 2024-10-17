
import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  console.log("Hiii");
  
  // Extract the order number (id) from params
  const { id: orderNumber } = params;
  console.log("Order Number: ", orderNumber); 

  try {
    // Parse the request body (only once)
    const {
      newphoneNumber: phoneNumber,
      newstoreName: storeName,
      newCustomerName: customerName,
      newAmountPaid: amountPaid,
      newSubTotal: subTotal,
      newTax: tax,
      newTaxValue: taxValue,
    } = await request.json();

    console.log("Parsed request body: ", {
      phoneNumber,
      storeName,
      customerName,
      amountPaid,
      subTotal,
      tax,
      taxValue,
    });

    // Connect to the database
    await dbConnect();

    // Find the invoice by orderNumber and update it
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { orderNumber }, 
      { phoneNumber, storeName, customerName, amountPaid, subTotal, tax, taxValue },
      { new: true } // Return the updated document
    );

    if (!updatedInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    console.log("Invoice updated: ", updatedInvoice);

    // Return a success message
    return NextResponse.json({ message: "Invoice updated", invoice: updatedInvoice }, { status: 200 });

  } catch (error) {
    console.log("Error updating invoice:", error);

    // Return an error response
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

  
export async function GET(request, { params }) {
    console.log("Hiii");
  
    // Extract the ID from params
    const { id } = params;
    
    console.log("Params: ", params); // Log the params to verify the ID
    console.log("Fetching invoice for ID:", id);
  
    // Connect to the database
    await dbConnect();
  
    try {
      // Find the invoice by orderNumber
      const invoice = await Invoice.findOne({ orderNumber: id });
      
      if (!invoice) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
      }
  
      console.log("Invoice found: ", invoice);
  
      // Return the invoice in the response
      return NextResponse.json({ invoice }, { status: 200 });
    } catch (error) {
      console.log("Error fetching invoice:", error);
  
      return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
    }
  }
  
