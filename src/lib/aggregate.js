import mongoose from "mongoose";
import { Invoice } from "@/models/Invoice";
import {
  DailySales,
  MonthlySales,
  YearlySales,
} from "@/models/AggregatedSales";
import dbConnect from "@/lib/dbConnect";

async function aggregateHistoricalData() {
  await dbConnect();

  const cursor = Invoice.find().cursor();

  for (
    let invoice = await cursor.next();
    invoice != null;
    invoice = await cursor.next()
  ) {
    const date = new Date(invoice.createdAt);
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const salesData = {
      totalSales: invoice.subTotal,
      invoiceCount: 1,
      productSales: invoice.items.map((item) => ({
        productCode: item.code,
        quantity: item.quantity,
        revenue: item.unitPrice * item.quantity,
      })),
    };

    // Update DailySales
    await DailySales.findOneAndUpdate(
      { date },
      {
        $inc: {
          totalSales: salesData.totalSales,
          invoiceCount: salesData.invoiceCount,
        },
        $push: { productSales: { $each: salesData.productSales } },
      },
      { upsert: true, new: true }
    );

    // Update MonthlySales
    await MonthlySales.findOneAndUpdate(
      { year, month },
      {
        $inc: {
          totalSales: salesData.totalSales,
          invoiceCount: salesData.invoiceCount,
        },
        $push: { productSales: { $each: salesData.productSales } },
      },
      { upsert: true, new: true }
    );

    // Update YearlySales
    await YearlySales.findOneAndUpdate(
      { year },
      {
        $inc: {
          totalSales: salesData.totalSales,
          invoiceCount: salesData.invoiceCount,
        },
        $push: { productSales: { $each: salesData.productSales } },
      },
      { upsert: true, new: true }
    );

    console.log(`Processed invoice: ${invoice.orderNumber}`);
  }

  console.log("Historical data aggregation complete");
  mongoose.connection.close();
}

aggregateHistoricalData().catch(console.error);
