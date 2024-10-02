import dbConnect from "@/lib/dbConnect";
import { MonthlySales } from "@/models/AggregatedSales";

export async function GET(req, res) {
  await dbConnect();

  const { year } = req.query;

  try {
    const sales = await MonthlySales.find({ year: parseInt(year) }).sort(
      "month"
    );

    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch monthly sales data" });
  }
}
