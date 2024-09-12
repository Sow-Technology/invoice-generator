import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET() {
  await dbConnect();
  const response = await Invoice.find({}).lean();
  console.log(response);
  console.log("response");
  return Response.json(response);
}
