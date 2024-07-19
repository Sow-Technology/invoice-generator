import { useInvoiceStore } from "@/store/store";
import React from "react";

const ClientDetails = () => {
  const { customerName, phoneNumber, emailId } = useInvoiceStore();
  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{customerName}</h2>
        <p>{phoneNumber}</p>
        <p>{emailId}</p>
      </section>
    </>
  );
};

export default ClientDetails;
