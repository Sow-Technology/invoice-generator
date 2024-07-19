import { useInvoiceStore } from "@/store/store";
import React from "react";

const Dates = () => {
  const { orderNumber } = useInvoiceStore();
  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1 ">
            <span className="font-bold">Order number:</span> {orderNumber}
          </li>
          <li className="p-1 bg-gray-100">
            <span className="font-bold">Invoice date:</span>{" "}
            {new Date().getDate()}
          </li>
        </ul>
      </article>
    </>
  );
};

export default Dates;
