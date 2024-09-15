import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    items: {
      type: [],
      ref: "Product",
    },
    amountPaid: {
      type: Number,
      required: true,
      default: 0,
    },
    taxValue: {
      type: Number,
    },
    tax: {
      type: Number,  // New field for tax percentage
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
    },
    storeName: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["cash", "upi", "card"],
      default: "cash",
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    document: {
      type: Buffer,  // New field to store the document
    },
  },
  { timestamps: true }
);


// delete mongoose.models.Invoice;
// const Invoices = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
export const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
