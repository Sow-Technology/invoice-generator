"use server";

import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function getNewInvoiceNumber() {
  await dbConnect();
  const invoiceCount = await Invoice.countDocuments();
  const nextInvoiceNumber = "JO" + (invoiceCount + 1);
  return nextInvoiceNumber;
}
