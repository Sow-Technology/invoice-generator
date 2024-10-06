import { createHmac } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const wooCommerceSecret = process.env.WOOCOMMERCE_WEBHOOK_SECRET;
  const signature = req.headers.get("x-wc-webhook-signature");

  // Parse the request body
  const body = await req.json();

  // Verify the webhook signature
  const hmac = createHmac("sha256", wooCommerceSecret);
  const digest = hmac.update(JSON.stringify(body)).digest("base64");

  if (signature !== digest) {
    console.log("Invalid signature");
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  // Log the entire body
  console.log("Received WooCommerce data:", JSON.stringify(body, null, 2));

  // Log specific fields (adjust based on the actual structure of your data)
  console.log("Order ID:", body.id);
  console.log(
    "Customer Name:",
    `${body.billing.first_name} ${body.billing.last_name}`
  );
  console.log("Total Amount:", body.total);
  console.log("Items:", body.line_items);

  return NextResponse.json({ message: "OK" });
}
