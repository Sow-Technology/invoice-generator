import dbConnect from "@/lib/dbConnect";
import { Store } from "@/models/store";

export async function GET() {
  try {
    await dbConnect();
    const products = await Store.find({});
    return Response.json(products);
  } catch (error) {
    console.error("Error in GET request:", error);
    return Response.json("Error retrieving products", { status: 500 });
  }
}
