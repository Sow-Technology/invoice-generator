import dbConnect from "@/lib/dbConnect";
import { DailySales } from "@/models/AggregatedSales";

export async function GET(req, res) {
  await dbConnect();

  const { startDate, endDate } = req.query;

  try {
    const sales = await DailySales.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort("date");

    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch daily sales data" });
  }
}
