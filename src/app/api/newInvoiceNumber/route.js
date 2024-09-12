import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET(req, res) {
  await dbConnect();

  try {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    console.log(lastInvoice.orderNumber);
    return Response.json(lastInvoice.orderNumber);
  } catch (error) {
    return Response.json("Unable to fetch invoice");
  }
}
