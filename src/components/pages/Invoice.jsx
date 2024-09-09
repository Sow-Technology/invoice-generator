import { useInvoiceStore } from "@/store/store";
import Header from "../sections/Header";
import MainDetails from "../sections/MainDetails";
import Notes from "../sections/Notes";
import TableForm from "../sections/TableForm";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ReactToPrint from "react-to-print";
import TableContainer from "../sections/Table";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function App() {
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
    paymentMode,
    setPaymentMode,
  } = useInvoiceStore();
  const componentRef = useRef();
  const [width] = useState(641);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  useEffect(() => {
    console.log(paymentMode);
    if (paymentMode == "upi") {
      console.log(true);
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  }, [paymentMode]);

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
            <div>
              <Label>Payment Mode:</Label>
              <RadioGroup
                defaultValue="cash"
                value={paymentMode}
                onValueChange={setPaymentMode}
                className="flex gap-4 my-2"
              >
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">Upi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Card</Label>
                </div>
              </RadioGroup>
              {isPopoverOpen && (
                <>
                  <Image
                    src="/images/upi.jpg"
                    width={400}
                    height={800}
                    alt=""
                  />
                </>
              )}
              <div className="flex items-center my-4 space-x-2">
                <Checkbox
                  id="paymentDone"
                  checked={isPaymentDone}
                  onCheckedChange={setIsPaymentDone}
                />
                <Label
                  htmlFor="paymentDone"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Payment Done?
                </Label>
              </div>
              {isPaymentDone && (
                <ReactToPrint
                  trigger={() => <Button>Print / Download</Button>}
                  content={() => componentRef.current}
                />
              )}
            </div>
          </div>
        </section>

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200 sticky top-0">
          <div ref={componentRef} className="p-5" paperSize="A4">
            <Header />

            <MainDetails />

            <TableContainer />

            <Notes />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
