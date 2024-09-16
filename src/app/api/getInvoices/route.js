import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";
export async function GET(req) {
  await dbConnect();
  // const { searchParams } = new URL(req.url);
  console.log("=============");
  const invoices = await Invoice.find({
    // createdAt: { $gte: from, $lte: to },
  }).lean();
  console.log(invoices);
  return Response.json(invoices);
}
