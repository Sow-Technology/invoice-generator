import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const fromDate = new Date(searchParams.get("from"));
  const toDate = new Date(searchParams.get("to"));

  try {
    const invoices = await Invoice.find({
      createdAt: { $gte: fromDate, $lte: toDate },
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return Response.json(invoices);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching invoices" }, { status: 500 });
  }
}
