import dbConnect from "@/lib/dbConnect";
import { Store } from "@/models/store";

export async function PUT(req) {
  await dbConnect();
  const { id } = req.url.split('/').pop();
  const body = await req.json();

  try {
    const updatedStore = await Store.findByIdAndUpdate(id, body, { new: true });
    if (!updatedStore) {
      return new Response(
        JSON.stringify({ success: false, message: "Store not found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ success: true, data: updatedStore }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating store:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to update store" }),
      { status: 400 }
    );
  }
}
import dbConnect from "@/lib/dbConnect";
import { Store } from "@/models/store";

export async function DELETE(req) {
  await dbConnect();
  const { id } = req.url.split('/').pop();

  try {
    const deletedStore = await Store.findByIdAndDelete(id);
    if (!deletedStore) {
      return new Response(
        JSON.stringify({ success: false, message: "Store not found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ success: true, data: deletedStore }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting store:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to delete store" }),
      { status: 400 }
    );
  }
}
