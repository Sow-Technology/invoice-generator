import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);

  const fromDate = new Date(searchParams.get("from"));
  const toDate = new Date(searchParams.get("to"));
  const storeName = searchParams.get("storeName");
  toDate.setHours(23, 59, 59, 999);

  try {
    const matchConditions = {
      createdAt: { $gte: fromDate, $lte: toDate },
      ...(storeName && storeName !== "all" ? { storeName } : {}),
    };

    const [result] = await Invoice.aggregate([
      {
        $match: matchConditions,
      },
      {
        $group: {
          _id: "$phoneNumber",
          orderCount: { $sum: 1 },
          totalOrderValue: { $sum: "$subTotal" },
          totalTaxValue: { $sum: "$taxValue" },
        },
      },
      {
        $group: {
          _id: null,
          customerPhones: { $addToSet: "$_id" },
          repeatedCustomers: {
            $sum: { $cond: [{ $gt: ["$orderCount", 1] }, 1, 0] },
          },
          totalOrderValue: { $sum: "$totalOrderValue" },
          totalTaxValue: { $sum: "$totalTaxValue" },
          totalOrders: { $sum: "$orderCount" },
        },
      },
    ]);

    const additionalMetrics = await Invoice.aggregate([
      {
        $match: matchConditions,
      },
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$profit" },
          totalAspire15: { $sum: "$aspire15" },
          totalExpenses: { $sum: "$orderExpenses" },
          paymentStatusCounts: {
            $push: { paymentStatus: "$paymentStatus" },
          },
          clientSourceCounts: {
            $push: { clientSource: "$clientSource" },
          },
        },
      },
    ]);

    const paymentStatusSummary =
      additionalMetrics[0]?.paymentStatusCounts.reduce(
        (acc, { paymentStatus }) => {
          acc[paymentStatus] = (acc[paymentStatus] || 0) + 1;
          return acc;
        },
        { Paid: 0, "Partially Paid": 0, Unpaid: 0 }
      );

    const clientSourceSummary = additionalMetrics[0]?.clientSourceCounts.reduce(
      (acc, { clientSource }) => {
        acc[clientSource] = (acc[clientSource] || 0) + 1;
        return acc;
      },
      {}
    );

    const metrics = {
      totalCustomers: result?.customerPhones.length || 0,
      totalRepeatedCustomers: result?.repeatedCustomers || 0,
      totalOrderValue: result?.totalOrderValue || 0,
      totalTaxValue: result?.totalTaxValue || 0,
      totalOrders: result?.totalOrders || 0,
      totalProfit: additionalMetrics[0]?.totalProfit || 0,
      aspire15: additionalMetrics[0]?.totalAspire15 || 0,
      totalExpenses: additionalMetrics[0]?.totalExpenses || 0,
      paymentStatusSummary,
      clientSourceSummary,
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
