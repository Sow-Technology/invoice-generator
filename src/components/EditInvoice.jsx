"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "./sections/Header";
import MainDetails from "./sections/MainDetails";
import Notes from "./sections/Notes";
import TableContainer from "./sections/Table";
import TermsConditions from "./sections/TermsConditions";

export default function EditTopicForm({
  id,
  phoneNumber,
  storeName,
  customerName,
  amountPaid,
  subTotal,
  tax,
  taxValue,
}) {
  const [newphoneNumber, setNewphoneNumber] = useState(phoneNumber);
  const [newstoreName, setNewstoreName] = useState(storeName);
  const [newCustomerName, setNewCustomerName] = useState(customerName);
  const [newAmountPaid, setNewAmountPaid] = useState(amountPaid);
  const [newSubTotal, setNewSubTotal] = useState(subTotal);
  const [newTax, setNewTax] = useState(tax);
  const [newTaxValue, setNewTaxValue] = useState(taxValue);
  const [clientRendered, setClientRendered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Ensure that this part is rendered only after the client is hydrated
    setClientRendered(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/invoice/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newphoneNumber,
          newstoreName,
          newCustomerName,
          newAmountPaid,
          newSubTotal,
          newTax,
          newTaxValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-start items-start">
      {/* Left Side (Form) */}
      <div className="w-1/2 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store and Customer Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Select Store</label>
              <input
                onChange={(e) => setNewstoreName(e.target.value)}
                value={newstoreName}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Store Name"
              />
            </div>
            <div>
              <label className="block mb-2">Customer Phone Number</label>
              <input
                onChange={(e) => setNewphoneNumber(e.target.value)}
                value={newphoneNumber}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block mb-2">Customer Name</label>
              <input
                onChange={(e) => setNewCustomerName(e.target.value)}
                value={newCustomerName}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Customer Name"
              />
            </div>
          </div>

          {/* Product and Billing Details */}
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block mb-2">Code</label>
              <input
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Product Code"
              />
            </div>
            <div>
              <label className="block mb-2">Quantity</label>
              <input
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="number"
                placeholder="Quantity"
              />
            </div>
            <div>
              <label className="block mb-2">Discount</label>
              <input
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Discount %"
              />
            </div>
            <div>
              <label className="block mb-2">Tax Applicable</label>
              <input
                onChange={(e) => setNewTax(e.target.value)}
                value={newTax}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Tax Applicable"
              />
            </div>
            <div>
              <label className="block mb-2">Amount Paid</label>
              <input
                onChange={(e) => setNewAmountPaid(e.target.value)}
                value={newAmountPaid}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="number"
                placeholder="Amount Paid"
              />
            </div>
          </div>

          {/* Coupon and Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <label className="block mb-2">Coupon Code</label>
              <input
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Enter Coupon Code"
              />
            </div>
            <div className="flex items-center">
              <button className="bg-blue-600 text-white rounded px-4 py-2">
                Apply
              </button>
            </div>
          </div>

          {/* Subtotal, Tax, Total Paid */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Subtotal</label>
              <input
                onChange={(e) => setNewSubTotal(e.target.value)}
                value={newSubTotal}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="number"
                placeholder="Subtotal"
              />
            </div>
            <div>
              <label className="block mb-2">Tax</label>
              <input
                onChange={(e) => setNewTaxValue(e.target.value)}
                value={newTaxValue}
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="number"
                placeholder="Tax Value"
              />
            </div>
            <div>
              <label className="block mb-2">Total Paid</label>
              <input
                className="border border-slate-300 rounded w-full px-4 py-2"
                type="text"
                placeholder="Paid Amount"
                value={newAmountPaid} // This is just for representation, adjust it according to logic
              />
            </div>
          </div>

          {/* Payment Mode */}
          <div className="mt-6">
            <label className="block mb-2">Payment Mode</label>
            <div className="flex items-center gap-4">
              <label>
                <input type="radio" name="paymentMode" value="Cash" />
                <span className="ml-2">Cash</span>
              </label>
              <label>
                <input type="radio" name="paymentMode" value="UPI" />
                <span className="ml-2">UPI</span>
              </label>
              <label>
                <input type="radio" name="paymentMode" value="Card" />
                <span className="ml-2">Card</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button className="bg-green-600 font-bold text-white py-3 px-6 rounded">
              Update Invoice
            </button>
          </div>
        </form>
      </div>

      {/* Right Side (Invoice Preview) */}
      {clientRendered && (
        <div className="w-1/2 invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200 sticky top-0">
          <div className="p-5" paperSize="A4">
            <Header />
            <MainDetails />
            <TableContainer />
            <Notes />
            <TermsConditions />
          </div>
        </div>
      )}
    </div>
  );
}
