// import ReactToPrint from "react-to-print";
import { useInvoiceStore } from "@/store/store";
import Header from "../sections/Header";
import MainDetails from "../sections/MainDetails";
import Notes from "../sections/Notes";
import Table from "../sections/Table";
import TableForm from "../sections/TableForm";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Button } from "../ui/button";
import ReactToPrint from "react-to-print";

function App() {
  let pdfExportComponent;

  const exportPDFWithComponent = () => {
    pdfExportComponent.save();
  };

  const {
    orderNumber,
    setOrderNumber,
    customerName,
    setCustomerName,
    phoneNumber,
    setPhoneNumber,
    emailId,
    setEmailId,
    notes,
    setNotes,
  } = useInvoiceStore();
  const componentRef = useRef();
  const [width] = useState(641);

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);
  return (
    <>
      <main
        className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}
      >
        <section>
          <div className="bg-white p-5 rounded shadow">
            <div className="flex flex-col justify-center gap-2">
              <article className="md:grid grid-cols-3 gap-2">
                <div className="flex flex-row w-auto items-center gap-2">
                  <Label htmlFor="orderNumber" className="md:min-w-[100px]">
                    Order Number
                  </Label>
                  <Input
                    type="text"
                    name="orderNumber"
                    id="orderNumber"
                    placeholder="Order Number"
                    autoComplete="off"
                    value={orderNumber}
                    className="w-fit"
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
              </article>
              <article className="md:grid grid-cols-2 gap-4 md:mt-6 max-lg:space-y-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    type="text"
                    name="customerName"
                    id="customerName"
                    placeholder="Enter customer's name"
                    maxLength={56}
                    autoComplete="off"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="phoneNumber">
                    Enter customer phone number
                  </Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter customer phone number"
                    maxLength={96}
                    autoComplete="off"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="emailId">Enter customer Email ID</Label>
                  <Input
                    type="text"
                    name="emailId"
                    id="emailId"
                    placeholder="Enter customer Email ID"
                    maxLength={96}
                    autoComplete="off"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>
              </article>

              {/* This is our table form */}
              <article>
                <TableForm />
              </article>

              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                name="notes"
                id="notes"
                cols="30"
                rows="5"
                placeholder="Additional notes to the client"
                maxLength={500}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></Textarea>
            </div>
          </div>
        </section>

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => <Button>Print / Download</Button>}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5" paperSize="A4">
            <Header />

            <MainDetails />

            <Table />

            <Notes />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
