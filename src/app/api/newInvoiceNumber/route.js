import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET(req, res) {
  await dbConnect();

  try {
    const invoiceCount = await Invoice.countDocuments();
    const nextInvoiceNumber = invoiceCount + 1;
    return Response.json(nextInvoiceNumber);
  } catch (error) {
    return Response.json("Unable to fetch invoice count");
  }
}
