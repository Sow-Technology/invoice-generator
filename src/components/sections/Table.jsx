import { useInvoiceStore } from "@/store/store";
import React from "react";
const Table = () => {
  const {
    products,
    setProducts,
    total,
    subTotal,
    setSubTotal,
    balance,
    setBalance,
    paid,
    setPaid,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
  } = useInvoiceStore();
  return (
    <>
      <table width="100%" className="mb-10 overflow-auto">
        <thead>
          <tr className="bg-gray-100 p-1 text-primary">
            <td className="font-bold">Code</td>
            <td className="font-bold">Product Name</td>
            <td className="font-bold">Qty</td>
            <td className="font-bold">Unit Price</td>
            <td className="font-bold">Discount</td>
            <td className="font-bold">Total</td>
          </tr>
        </thead>
        {products?.map(
          ({ code, productName, quantity, unitPrice, total, discount, id }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr className="h-10">
                  <td>{code}</td>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                  <td>{unitPrice}</td>
                  <td>{discount}%</td>
                  <td className="amount">{total}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>

      <div className="flex items-center justify-end gap-20">
        <div>
          <div className="">SubTotal</div>
          {/* <div className="">Adjustments</div> */}
          <div className="text-primary font-medium">Paid</div>
          <div className="text-primary font-medium text-2xl">Balance</div>
        </div>
        <div className="text-right">
          {" "}
          <div>₹{subTotal}</div>
          {/* <div>{subTotal}</div> */}
          <div className="text-primary font-medium">{paid}</div>
          <div className="text-primary text-2xl font-medium">{balance}</div>
        </div>
      </div>
    </>
  );
};

export default Table;
