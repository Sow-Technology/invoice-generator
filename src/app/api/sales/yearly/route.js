import dbConnect from "@/lib/dbConnect";
import { YearlySales } from "@/models/AggregatedSales";

export async function GET(req, res) {
  await dbConnect();

  const { startYear, endYear } = req.query;

  try {
    const sales = await YearlySales.find({
      year: { $gte: parseInt(startYear), $lte: parseInt(endYear) },
    }).sort("year");

    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch yearly sales data" });
  }
}
