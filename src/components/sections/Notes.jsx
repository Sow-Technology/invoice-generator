import { useInvoiceStore } from "@/store/store";
import React from "react";

const Notes = () => {
  const { notes } = useInvoiceStore();
  return (
    <>
      <section className="mt-10 mb-5">
        <h3>Additional notes</h3>
        <p className="lg:w-1/2 text-justify">{notes}</p>
      </section>
    </>
  );
};

export default Notes;
