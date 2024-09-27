import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const fromDate = new Date(searchParams.get("from"));
  const toDate = new Date(searchParams.get("to"));
  const storeName = searchParams.get("storeName");

  try {
    // Aggregation pipeline for calculating metrics
    const [result] = await Invoice.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate, $lte: toDate },
          ...(storeName && storeName !== "all" ? { storeName } : {}),
        },
      },
      {
        $group: {
          _id: "$phoneNumber", // Group by phone number
          orderCount: { $sum: 1 }, // Count the number of orders per customer
          totalOrderValue: { $sum: "$subTotal" }, // Sum of subTotal for each customer
          totalTaxValue: { $sum: "$taxValue" }, // Sum of taxValue for each customer
        },
      },
      {
        $group: {
          _id: null,
          customerPhones: { $addToSet: "$_id" }, // Collect all unique customer phone numbers
          repeatedCustomers: {
            $sum: {
              $cond: [{ $gt: ["$orderCount", 1] }, 1, 0], // Count customers with more than 1 order
            },
          },
          totalOrderValue: { $sum: "$totalOrderValue" }, // Sum of all orders
          totalTaxValue: { $sum: "$totalTaxValue" }, // Sum of total taxValue
          totalOrders: { $sum: "$orderCount" }, // Total number of orders
        },
      },
    ]);

    // Return metrics
    const metrics = {
      totalCustomers: result?.customerPhones.length || 0, // Total unique customers
      totalRepeatedCustomers: result?.repeatedCustomers || 0, // Total repeated customers
      totalOrderValue: result?.totalOrderValue || 0, // Total order value
      totalTaxValue: result?.totalTaxValue || 0, // Total tax value
      totalOrders: result?.totalOrders || 0, // Total number of orders
    };
    console.log(metrics);
    return new Response(JSON.stringify(metrics), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error calculating metrics" }),
      { status: 500 }
    );
  }
}
