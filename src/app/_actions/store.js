"use server";

import dbConnect from "@/lib/dbConnect";
import { Store } from "@/models/store";

export async function updateStore(store) {
  await dbConnect();

  try {
    const updatedStore = await Store.findByIdAndUpdate(store._id, store);
    if (!updatedStore) {
      throw new Error("Product not found");
    }
    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to update the store");
  }
}

export async function deleteStore(storeid) {
  await dbConnect();

  try {
    const deletedStore = await Store.findByIdAndDelete(storeid);
    if (!deletedStore) {
      throw new Error("Product not found");
    }
    return true;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to delete the store");
  }
}
