import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        code: { type: String, required: true },
        storeName: { type: String, required: true },
        phoneNumber: { type: Number , required: true},
        address: { type: String, required: true, default: 1 },

      },
      { timestamps: true } // Corrected line
    );
    

// delete mongoose.models.Invoice;
// const Invoices = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
export const Store =
  mongoose.models.Store || mongoose.model("Store", StoreSchema);
