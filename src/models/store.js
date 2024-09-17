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
    

export const Store =
  mongoose.models.Store || mongoose.model("Store", StoreSchema);
