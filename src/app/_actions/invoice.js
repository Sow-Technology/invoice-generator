"use server";

import dbConnect from "@/lib/dbConnect";
import { Invoice } from "@/models/Invoice";

export async function getNewInvoiceNumber() {
  await dbConnect();
  const invoiceCount = await Invoice.countDocuments();
  const nextInvoiceNumber = "JO" + (invoiceCount + 1);
  return nextInvoiceNumber;
}

export async function updateInvoice(invoice) {
  await dbConnect();
  const updatedInvoice = await Invoice.findByIdAndUpdate(invoice._id, invoice, {
    new: true,
  });
  console.log(updatedInvoice);
  return true;
}
